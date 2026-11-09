import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { C, CAPABILITIES, CAP_PAGE } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(CAP_PAGE.h1, lang), description: tr(CAP_PAGE.lede, lang), alternates: alternates(lang, "/capabilities") };
}

export default async function Capabilities({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/capabilities" active="/capabilities">
      <PageHead title={tr(CAP_PAGE.h1, lang)} lede={tr(CAP_PAGE.lede, lang)} />
      <section>
        <div className="k-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))" }}>
          {CAPABILITIES.map((c) => (
            <div key={c.icon} className="k-card k-feature">
              <h3><Ico n={c.icon} />{tr(c.title, lang)}</h3>
              <p>{tr(c.text, lang)}</p>
              <ul className="k-checks">{c.points.map((x) => <li key={x.en}><Ico n="check" size={18} />{tr(x, lang)}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <section className="k-split">
        <h2 className="k-h2">{tr(CAP_PAGE.govH, lang)}</h2>
        <div className="k-prose">
          <p>{tr(CAP_PAGE.govP, lang)}</p>
          <div className="k-cta"><Link href={`/${lang}/how-we-work`} className="k-btn k-btn-ghost">{tr(C.learnMore, lang)}</Link>
            <Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)}</Link></div>
        </div>
      </section>
    </Page>
  );
}
