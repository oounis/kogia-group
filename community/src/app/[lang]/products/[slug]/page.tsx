import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/site/Chrome";
import { Crumbs, StatusPill } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { PRODUCTS, industry, product } from "@/lib/catalog";
import { C } from "@/lib/copy";
import { LANGS, alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => PRODUCTS.map((p) => ({ lang, slug: p.slug })));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = product(slug);
  if (!p) return {};
  return { title: p.name, description: tr(p.tagline, lang), alternates: alternates(lang, `/products/${slug}`) };
}

export default async function ProductPage({ params }: P) {
  const { lang, slug } = await params;
  const p = product(slug);
  if (!p) notFound();
  const ind = industry(p.industry)!;
  return (
    <Page lang={lang} path={`/products/${slug}`} active="/products">
      <Crumbs lang={lang} items={[{ href: `/${lang}/products`, label: tr(C.products, lang) }, { label: p.name }]} />
      <header className="k-head">
        <p className="k-eyebrow">{tr(ind.name, lang)}</p>
        <h1 dir="ltr" style={{ textAlign: "start" }}>{p.name}</h1>
        <p className="k-lede">{tr(p.tagline, lang)}</p>
        <div className="k-cta">
          {p.url ? (
            <a href={p.url} className="k-btn k-btn-primary" target="_blank" rel="noopener">{tr(p.linkLabel!, lang)} <Ico n="external" size={16} /></a>
          ) : null}
          <Link href={`/${lang}/contact`} className={p.url ? "k-btn k-btn-ghost" : "k-btn k-btn-primary"}>{tr(C.contact, lang)}</Link>
        </div>
        {!p.url && <p className="k-sub" style={{ marginTop: 14 }}>{tr(p.status === "development" ? C.comingSoon : C.privateAccess, lang)}</p>}
      </header>
      <section className="k-split">
        <div className="k-prose"><p>{tr(p.summary, lang)}</p></div>
        <dl className="k-facts">
          <div><dt>{tr(C.status, lang)}</dt><dd><StatusPill p={p} lang={lang} /></dd></div>
          <div><dt>{tr(C.industry, lang)}</dt><dd><Link href={`/${lang}/industries/${ind.slug}`}>{tr(ind.name, lang)}</Link></dd></div>
          {p.also?.length ? (
            <div><dt>{tr(C.alsoIn, lang)}</dt><dd>{p.also.map((s) => tr(industry(s)!.name, lang)).join(" · ")}</dd></div>
          ) : null}
          <div><dt>{tr(C.languages, lang)}</dt><dd dir="ltr" style={{ textAlign: "start" }}>{p.languages}</dd></div>
          {p.facts?.map((f) => <div key={f.en}><dt>·</dt><dd>{tr(f, lang)}</dd></div>)}
        </dl>
      </section>
      <section>
        <h2 className="k-h2">{tr(C.modules, lang)}</h2>
        <ul className="k-checks" style={{ marginTop: 18 }}>{p.modules.map((m) => <li key={m.en}><Ico n="check" size={18} />{tr(m, lang)}</li>)}</ul>
      </section>
    </Page>
  );
}
