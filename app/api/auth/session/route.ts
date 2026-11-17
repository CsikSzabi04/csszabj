import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Used by the header to decide whether to show the "Files" link. Never cached. */
export async function GET() {
  const session = await getSession();
  return NextResponse.json({ authenticated: session !== null }, { headers: { "Cache-Control": "no-store" } });
}
