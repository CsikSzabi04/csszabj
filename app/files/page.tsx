import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { VaultError, getAppearance, getListing, isConfigured, optUuid } from "../lib/private-storage";
import { DEFAULT_APPEARANCE, type Appearance, type Listing } from "./shared";
import Vault from "./Vault";

export const metadata: Metadata = {
  title: "Fájlok",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function FilesPage({ searchParams }: Props) {
  if (!(await getSession())) redirect("/login");
  const sp = await searchParams;
  const param = (k: string) => {
    try {
      return optUuid(typeof sp[k] === "string" ? sp[k] : null);
    } catch {
      return null;
    }
  };

  let listing: Listing | null = null;
  let appearance: Appearance = DEFAULT_APPEARANCE;
  let bgUrl: string | null = null;
  let error: string | null = null;
  if (!isConfigured()) {
    error = "not_configured";
  } else {
    try {
      const [l, a] = await Promise.all([getListing(param("p"), param("f")), getAppearance()]);
      listing = l;
      appearance = a.appearance;
      bgUrl = a.bgUrl;
    } catch (err) {
      if (!(err instanceof VaultError)) console.error("[files]", err);
      error = err instanceof VaultError ? err.code : "upstream";
    }
  }

  return <Vault initial={listing} initialError={error} initialAppearance={appearance} initialBgUrl={bgUrl} />;
}
