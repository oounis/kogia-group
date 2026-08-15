import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";
import styles from "../auth-page.module.css";

export const metadata: Metadata = {
  title: "Rejoindre",
  robots: { index: false },
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string; raison?: string }>;
}) {
  const { returnTo, raison } = await searchParams;
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.marque}>Kogia</Link>
      <AuthForm
        intention={raison || "Créez votre compte Kogia"}
        returnTo={returnTo}
      />
      <p className={styles.bascule}>
        Déjà un compte ?{" "}
        <Link href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}>
          Se connecter
        </Link>
      </p>
    </main>
  );
}
