import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { HOW } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(HOW.h1, lang), description: tr(HOW.lede, lang), alternates: alternates(lang, "/how-we-work") };
}

export default async function TextPage({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/how-we-work" active="/how-we-work">
      <PageHead title={tr(HOW.h1, lang)} lede={tr(HOW.lede, lang)} />
      {HOW.sections.map((s) => (
        <section key={s.h.en} className="k-split">
          <h2 className="k-h2">{tr(s.h, lang)}</h2>
          <div className="k-prose"><p>{tr(s.p, lang)}</p></div>
        </section>
      ))}
    </Page>
  );
}
