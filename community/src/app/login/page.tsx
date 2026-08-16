import type { Metadata } from "next";
import Link from "next/link";
import Marque from "@/components/Marque";
import AuthForm from "@/components/auth/AuthForm";
import styles from "../auth-page.module.css";

export const metadata: Metadata = {
  title: "Se connecter",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { returnTo } = await searchParams;
  return (
    <main className={styles.page}>
      <Marque />
      <AuthForm intention="Content de vous revoir" returnTo={returnTo} />
      <p className={styles.bascule}>
        Pas encore de compte ?{" "}
        <Link href={`/join${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}>
          Rejoindre Kogia
        </Link>
      </p>
    </main>
  );
}
