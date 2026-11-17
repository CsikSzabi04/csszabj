import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, isAuthConfigured } from "../lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Bejelentkezés",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await getSession()) redirect("/files");
  return <LoginForm configured={isAuthConfigured()} />;
}
