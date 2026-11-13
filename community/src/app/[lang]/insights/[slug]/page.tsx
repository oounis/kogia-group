import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/site/Chrome";
import { Crumbs } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { InsightCard } from "@/components/site/Insights";
import { C } from "@/lib/copy";
import { INSIGHTS, INSIGHTS_PAGE, insight, insightDate } from "@/lib/insights";
import { LANGS, alternates, tr, type Lang } from "@/lib/i18n";
import { IMAGE_PARTAGE, SITE_URL } from "@/lib/site";

type P = { params: Promise<{ lang: Lang; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => INSIGHTS.map((a) => ({ lang, slug: a.slug })));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = insight(slug);
  if (!a) return {};
  return {
    title: tr(a.title, lang),
    description: tr(a.lede, lang),
    alternates: alternates(lang, `/insights/${slug}`),
    openGraph: { type: "article", title: tr(a.title, lang), description: tr(a.lede, lang), publishedTime: a.date, url: `/${lang}/insights/${slug}`, images: [IMAGE_PARTAGE] },
  };
}

export default async function InsightPage({ params }: P) {
  const { lang, slug } = await params;
  const a = insight(slug);
  if (!a) notFound();
  const others = INSIGHTS.filter((x) => x.slug !== a.slug);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tr(a.title, lang),
    description: tr(a.lede, lang),
    datePublished: a.date,
    inLanguage: lang,
    mainEntityOfPage: `${SITE_URL}/${lang}/insights/${a.slug}`,
    author: { "@type": "Organization", name: "KogiaGroup", url: SITE_URL },
    publisher: { "@type": "Organization", name: "KogiaGroup", url: SITE_URL },
    citation: a.sources.map((s) => s.url),
  };
  return (
    <Page lang={lang} path={`/insights/${slug}`} active="/insights">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Crumbs lang={lang} items={[{ href: `/${lang}/insights`, label: tr(INSIGHTS_PAGE.h1, lang) }, { label: tr(a.field, lang) }]} />
      <header className="k-head n-head">
        <p className="k-eyebrow">{tr(a.field, lang)} <span aria-hidden="true">·</span> <time dateTime={a.date}>{insightDate(a.date, lang)}</time></p>
        <h1>{tr(a.title, lang)}</h1>
        <p className="k-lede">{tr(a.lede, lang)}</p>
      </header>

      <section aria-label={tr(INSIGHTS_PAGE.figuresH, lang)}>
        <div className="n-figs">
          {a.figures.map((f) => (
            <div key={f.v}>
              <b dir="ltr">{f.v}</b>
              <p>{tr(f.l, lang)}</p>
              <small dir="ltr">{f.src}</small>
            </div>
          ))}
        </div>
      </section>

      {a.sections.map((s) => (
        <section key={s.h.en} className="k-split n-sec">
          <h2 className="k-h2">{tr(s.h, lang)}</h2>
          <div className="k-prose n-prose">{s.p.map((p) => <p key={p.en}>{tr(p, lang)}</p>)}</div>
        </section>
      ))}

      <section>
        <div className="n-build">
          <div>
            <span className="k-pill k-pill-development">{tr(INSIGHTS_PAGE.announced, lang)}</span>
            <h2 className="k-h2">{tr(INSIGHTS_PAGE.buildH, lang)}</h2>
            <p>{tr(a.build.text, lang)}</p>
            <div className="k-cta">
              <Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)} <Ico n="arrow" size={18} /></Link>
              <Link href={`/${lang}${a.build.href}`} className="k-btn k-btn-ghost">{tr(a.build.label, lang)}</Link>
            </div>
          </div>
          <ul className="k-checks">{a.build.points.map((x) => <li key={x.en}><Ico n="check" size={18} />{tr(x, lang)}</li>)}</ul>
        </div>
      </section>

      <section className="k-split">
        <div>
          <h2 className="k-h2">{tr(INSIGHTS_PAGE.sourcesH, lang)}</h2>
          <p className="k-sub">{tr(INSIGHTS_PAGE.sourcesNote, lang)}</p>
        </div>
        <ol className="n-sources">
          {a.sources.map((s) => (
            <li key={s.url} dir="ltr" lang="en">
              <b>{s.org}</b>
              <a href={s.url} target="_blank" rel="noopener nofollow">{s.title} <Ico n="external" size={14} /></a>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="k-sec-head"><h2 className="k-h2">{tr(INSIGHTS_PAGE.more, lang)}</h2></div>
        <div className="n-grid">{others.map((x) => <InsightCard key={x.slug} a={x} lang={lang} level={3} />)}</div>
      </section>

      <section className="m-close">
        <h2>{tr(INSIGHTS_PAGE.talkH, lang)}</h2>
        <p>{tr(INSIGHTS_PAGE.talkP, lang)}</p>
        <div className="k-cta"><Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)} <Ico n="arrow" size={18} /></Link></div>
      </section>
    </Page>
  );
}
