import type { ReactNode } from "react";

// A template re-mounts on every navigation, so each page fades in instead of swapping abruptly
// (the .page-fade animation lives in globals.css).
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
