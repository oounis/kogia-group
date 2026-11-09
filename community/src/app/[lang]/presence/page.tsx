import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { C, PRESENCE } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(PRESENCE.h1, lang), description: tr(PRESENCE.lede, lang), alternates: alternates(lang, "/presence") };
}

export default async function Presence({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/presence" active="/presence">
      <PageHead title={tr(PRESENCE.h1, lang)} lede={tr(PRESENCE.lede, lang)} />
      <section>
        <div className="k-places">
          {PRESENCE.places.map((pl) => (
            <div key={pl.name.en} className="k-card k-place">
              <h2><Ico n="pin" />{tr(pl.name, lang)}</h2>
              <p className="role">{tr(pl.role, lang)}</p>
              <p>{tr(pl.text, lang)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="k-split">
        <h2 className="k-h2">{tr(PRESENCE.collabH, lang)}</h2>
        <div className="k-prose">
          <p>{tr(PRESENCE.collab, lang)}</p>
          <div className="k-cta"><Link href={`/${lang}/products/eduplus-connect`} className="k-btn k-btn-ghost">EduPlus Connect</Link>
            <Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)}</Link></div>
        </div>
      </section>
    </Page>
  );
}
