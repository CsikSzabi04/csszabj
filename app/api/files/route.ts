import { NextResponse, type NextRequest } from "next/server";
import { getSession, isSameOrigin } from "../../lib/auth";
import * as V from "../../lib/private-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

/** ?p=<partition>&f=<folder> → folder listing; ?q=<text> → search across every partition. */
export async function GET(req: NextRequest) {
  if (!(await getSession())) return json({ error: "unauthorized" }, 401);
  const sp = req.nextUrl.searchParams;
  try {
    const q = sp.get("q");
    if (q !== null) return json(await V.search(q));
    return json(await V.getListing(V.optUuid(sp.get("p")), V.optUuid(sp.get("f"))));
  } catch (err) {
    return V.errorResponse(err);
  }
}

/** Every mutation is one POST with an `action` (same-origin + owner session required). */
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!(await getSession())) return json({ error: "unauthorized" }, 401);
  const text = await req.text();
  if (text.length > 64_000) return json({ error: "bad_request" }, 413);
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(text);
    if (!b || typeof b !== "object") throw 0;
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  try {
    switch (b.action) {
      case "folder":
        return json(await V.createFolder(V.uuid(b.partitionId), V.optUuid(b.parentId), b.name, b.reuse === true));
      case "upload":
        return json(await V.prepareUpload(V.uuid(b.partitionId), V.optUuid(b.parentId), b.name, b.size, b.type));
      case "complete":
        return json(await V.completeUpload(V.uuid(b.id)));
      case "abort":
        return json(await V.abortUpload(V.uuid(b.id)));
      case "rename":
        return json(await V.renameItem(V.uuid(b.id), b.name));
      case "move":
        return json(await V.moveItems(V.uuidList(b.ids), V.uuid(b.partitionId), V.optUuid(b.parentId)));
      case "delete":
        return json(await V.deleteItems(V.uuidList(b.ids)));
      case "link":
        return json(await V.links(V.uuid(b.id)));
      case "partition.create":
        return json(await V.createPartition(b.name, b.quota, b.color));
      case "partition.update":
        return json(await V.updatePartition(V.uuid(b.id), { name: b.name, quota: b.quota, color: b.color }));
      case "partition.delete":
        return json(await V.deletePartition(V.uuid(b.id)));
      case "appearance.save":
        return json(await V.saveAppearance(b.appearance));
      case "appearance.bg":
        return json(await V.prepareBackground(b.type, b.size));
      default:
        return json({ error: "bad_request" }, 400);
    }
  } catch (err) {
    return V.errorResponse(err);
  }
}
