import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { IndustryCard, PageHead } from "@/components/site/Blocks";
import { INDUSTRIES, productsIn } from "@/lib/catalog";
import { C, HOME } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(C.industries, lang), description: tr(HOME.industriesP, lang), alternates: alternates(lang, "/industries") };
}

export default async function Industries({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/industries" active="/industries">
      <PageHead title={tr(HOME.industriesH, lang)} lede={tr(HOME.industriesP, lang)} />
      <section>
        <div className="k-grid k-grid5">
          {INDUSTRIES.map((i) => <IndustryCard key={i.slug} i={i} lang={lang} count={productsIn(i.slug).length} />)}
        </div>
      </section>
    </Page>
  );
}
