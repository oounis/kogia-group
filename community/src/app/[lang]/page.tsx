import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/site/Chrome";
import { IndustryCard, ProductRow } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { INDUSTRIES, PRODUCTS, productsIn } from "@/lib/catalog";
import { C, CAPABILITIES, HOME, META, PLATFORM, PRESENCE } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: { absolute: tr(META.title, lang) }, alternates: alternates(lang, "/") };
}

const LEVELS = [
  { b: { en: "Level 1", fr: "Niveau 1", ar: "المستوى 1" }, s: { en: "KogiaGroup", fr: "KogiaGroup", ar: "KogiaGroup" }, m: { en: "The company and its shared platform", fr: "La société et sa plateforme commune", ar: "الشركة ومنصتها المشتركة" } },
  { b: { en: "Level 2", fr: "Niveau 2", ar: "المستوى 2" }, s: { en: "Five industries", fr: "Cinq secteurs", ar: "خمسة قطاعات" }, m: { en: "Healthcare, education, security, government, enterprise", fr: "Santé, éducation, sécurité, secteur public, entreprises", ar: "الصحة، التعليم، الأمن، الحكومة، الشركات" } },
  { b: { en: "Level 3", fr: "Niveau 3", ar: "المستوى 3" }, s: { en: `${PRODUCTS.length} products`, fr: `${PRODUCTS.length} produits`, ar: `${PRODUCTS.length} منتجات` }, m: { en: "Each made of modules a client switches on", fr: "Chacun fait de modules activés par le client", ar: "كل منها وحدات يفعّلها العميل" } },
];

export default async function Home({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/">
      <section className="k-hero">
        <p className="k-eyebrow">{tr(HOME.eyebrow, lang)}</p>
        <h1>{tr(HOME.h1, lang)}</h1>
        <p className="k-lede">{tr(HOME.sub, lang)}</p>
        <div className="k-cta">
          <Link href={`/${lang}/products`} className="k-btn k-btn-primary">{tr(HOME.ctaProducts, lang)} <Ico n="arrow" size={18} /></Link>
          <Link href={`/${lang}/contact`} className="k-btn k-btn-ghost">{tr(C.contact, lang)}</Link>
        </div>
        <div className="k-levels">
          {LEVELS.map((l) => (
            <div key={l.b.en}><b>{tr(l.b, lang)}</b><span>{tr(l.s, lang)}</span><small>{tr(l.m, lang)}</small></div>
          ))}
        </div>
      </section>

      <section>
        <div className="k-sec-head">
          <div><h2 className="k-h2">{tr(HOME.industriesH, lang)}</h2><p className="k-sub">{tr(HOME.industriesP, lang)}</p></div>
          <Link href={`/${lang}/industries`} className="k-btn k-btn-ghost">{tr(C.allIndustries, lang)}</Link>
        </div>
        <div className="k-grid k-grid5">
          {INDUSTRIES.map((i) => <IndustryCard key={i.slug} i={i} lang={lang} count={productsIn(i.slug).length} />)}
        </div>
      </section>

      <section>
        <div className="k-sec-head">
          <div><h2 className="k-h2">{tr(HOME.productsH, lang)}</h2><p className="k-sub">{tr(HOME.productsP, lang)}</p></div>
          <Link href={`/${lang}/products`} className="k-btn k-btn-ghost">{tr(C.allProducts, lang)}</Link>
        </div>
        <ul className="k-plist">{PRODUCTS.map((p) => <ProductRow key={p.slug} p={p} lang={lang} />)}</ul>
      </section>

      <section>
        <div className="k-sec-head"><h2 className="k-h2">{tr(HOME.deliverH, lang)}</h2>
          <Link href={`/${lang}/capabilities`} className="k-btn k-btn-ghost">{tr(C.learnMore, lang)}</Link></div>
        <div className="k-grid">
          {CAPABILITIES.map((c) => (
            <div key={c.icon} className="k-feature"><h3><Ico n={c.icon} />{tr(c.title, lang)}</h3><p>{tr(c.text, lang)}</p></div>
          ))}
        </div>
      </section>

      <div className="k-band">
        <div className="k-band-in k-split">
          <div><h2 className="k-h2">{tr(HOME.platformH, lang)}</h2><p className="k-sub">{tr(HOME.platformP, lang)}</p></div>
          <div className="k-grid">
            {PLATFORM.map((x) => (
              <div key={x.icon} className="k-feature"><h3><Ico n={x.icon} />{tr(x.title, lang)}</h3><p>{tr(x.text, lang)}</p></div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="k-sec-head">
          <div><h2 className="k-h2">{tr(HOME.presenceH, lang)}</h2><p className="k-sub">{tr(HOME.presenceP, lang)}</p></div>
          <Link href={`/${lang}/presence`} className="k-btn k-btn-ghost">{tr(C.learnMore, lang)}</Link>
        </div>
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
    </Page>
  );
}
