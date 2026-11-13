import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { InsightCard } from "@/components/site/Insights";
import { INSIGHTS, INSIGHTS_PAGE } from "@/lib/insights";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(INSIGHTS_PAGE.h1, lang), description: tr(INSIGHTS_PAGE.lede, lang), alternates: alternates(lang, "/insights") };
}

export default async function InsightsIndex({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/insights" active="/insights">
      <PageHead title={tr(INSIGHTS_PAGE.h1, lang)} lede={tr(INSIGHTS_PAGE.lede, lang)} />
      <section>
        <div className="n-grid">{INSIGHTS.map((a) => <InsightCard key={a.slug} a={a} lang={lang} />)}</div>
      </section>
    </Page>
  );
}
