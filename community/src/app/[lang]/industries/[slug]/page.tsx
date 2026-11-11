import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/site/Chrome";
import { Crumbs, PageHead, ProductRow } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { INDUSTRIES, industry, productsIn } from "@/lib/catalog";
import { C } from "@/lib/copy";
import { LANGS, alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => INDUSTRIES.map((i) => ({ lang, slug: i.slug })));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const i = industry(slug);
  if (!i) return {};
  return { title: tr(i.name, lang), description: tr(i.short, lang), alternates: alternates(lang, `/industries/${slug}`) };
}

export default async function IndustryPage({ params }: P) {
  const { lang, slug } = await params;
  const i = industry(slug);
  if (!i) notFound();
  const products = productsIn(i.slug);
  return (
    <Page lang={lang} path={`/industries/${slug}`} active="/industries">
      <Crumbs lang={lang} items={[{ href: `/${lang}/industries`, label: tr(C.industries, lang) }, { label: tr(i.name, lang) }]} />
      <PageHead eyebrow={tr(C.industry, lang)} title={tr(i.name, lang)} lede={tr(i.intro, lang)} />
      <section className="k-split">
        <div className="k-feature">
          <h2 className="k-h2">{tr(C.whatTheyNeed, lang)}</h2>
          <ul className="k-checks">{i.needs.map((n) => <li key={n.en}><Ico n="check" size={18} />{tr(n, lang)}</li>)}</ul>
        </div>
        <div className="k-feature">
          <h2 className="k-h2">{tr(C.whatWeBring, lang)}</h2>
          <ul className="k-checks">{i.capabilities.map((n) => <li key={n.en}><Ico n="check" size={18} />{tr(n, lang)}</li>)}</ul>
        </div>
      </section>
      {i.lines && (
        <section>
          <div className="k-sec-head"><div><h2 className="k-h2">{tr(C.linesH, lang)}</h2><p className="k-sub">{tr(C.linesNote, lang)}</p></div></div>
          <div className="k-grid">
            {i.lines.map((l) => (
              <div key={l.slug} id={l.slug} className="k-card k-feature" style={{ alignContent: "start" }}>
                <span className="k-pill k-pill-development" style={{ justifySelf: "start", alignSelf: "start" }}>{tr(C.planned, lang)}</span>
                <h3><Ico n={l.icon} size={20} />{tr(l.name, lang)}</h3>
                <p>{tr(l.text, lang)}</p>
                <ul className="k-checks">{l.points.map((n) => <li key={n.en}><Ico n="check" size={18} />{tr(n, lang)}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      )}
      <section>
        <div className="k-sec-head"><h2 className="k-h2">{tr(C.ourProducts, lang)}</h2></div>
        <ul className="k-plist">{products.map((p) => <ProductRow key={p.slug} p={p} lang={lang} />)}</ul>
        <div className="k-cta"><Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)}</Link></div>
      </section>
    </Page>
  );
}
