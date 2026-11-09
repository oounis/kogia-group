import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { ABOUT } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(ABOUT.h1, lang), description: tr(ABOUT.lede, lang), alternates: alternates(lang, "/about") };
}

export default async function TextPage({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/about" active="/about">
      <PageHead title={tr(ABOUT.h1, lang)} lede={tr(ABOUT.lede, lang)} />
      {ABOUT.sections.map((s) => (
        <section key={s.h.en} className="k-split">
          <h2 className="k-h2">{tr(s.h, lang)}</h2>
          <div className="k-prose"><p>{tr(s.p, lang)}</p></div>
        </section>
      ))}
    </Page>
  );
}
