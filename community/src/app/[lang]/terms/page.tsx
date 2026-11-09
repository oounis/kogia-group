import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { EMAIL, LEGAL } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
const D = LEGAL.terms;
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(D.h1, lang), description: tr(D.lede, lang), alternates: alternates(lang, "/terms") };
}

export default async function Legal({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/terms">
      <PageHead title={tr(D.h1, lang)} lede={tr(D.lede, lang)} />
      <section className="k-prose">
        <p className="k-sub">{tr(LEGAL.updated, lang)}</p>
        {D.sections.map((s) => (
          <div key={s.h.en} style={{ marginTop: 28 }}>
            <h2 className="k-h2" style={{ fontSize: 21 }}>{tr(s.h, lang)}</h2>
            <p style={{ marginTop: 8 }}>{tr(s.p, lang)}</p>
          </div>
        ))}
        <p style={{ marginTop: 28 }}><a href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a></p>
      </section>
    </Page>
  );
}
