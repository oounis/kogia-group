import Link from "next/link";
import { INDUSTRIES, STATUS_LABEL, industry as findIndustry, type Industry, type Product } from "@/lib/catalog";
import { C } from "@/lib/copy";
import { tr, type Lang } from "@/lib/i18n";
import { Ico } from "./Ico";

export function StatusPill({ p, lang }: { p: Product; lang: Lang }) {
  return <span className={`k-pill k-pill-${p.status}`}>{tr(STATUS_LABEL[p.status], lang)}</span>;
}

/** "1 product", "2 products", with Arabic dual and plural forms. */
export function countLabel(n: number, lang: Lang) {
  if (lang === "fr") return n === 1 ? "1 produit" : `${n} produits`;
  if (lang === "ar") return n === 1 ? "منتج واحد" : n === 2 ? "منتجان" : n <= 10 ? `${n} منتجات` : `${n} منتجاً`;
  return n === 1 ? "1 product" : `${n} products`;
}

export function IndustryCard({ i, lang, count }: { i: Industry; lang: Lang; count: number }) {
  return (
    <Link href={`/${lang}/industries/${i.slug}`} className="k-card k-ind">
      <span className={`k-ind-ico k-ind-${i.slug}`}><Ico n={i.icon} size={22} /></span>
      <span className="k-ind-name">{tr(i.name, lang)}</span>
      <span className="k-ind-short">{tr(i.short, lang)}</span>
      <span className="k-ind-foot">
        <span>{countLabel(count, lang)}</span>
        <Ico n="arrow" size={18} />
      </span>
    </Link>
  );
}

export function ProductRow({ p, lang }: { p: Product; lang: Lang }) {
  const ind = findIndustry(p.industry)!;
  return (
    <li className="k-prow">
      <Link href={`/${lang}/products/${p.slug}`} className="k-prow-link">
        <span className="k-prow-head">
          <span className="k-prow-name">{p.name}</span>
          <StatusPill p={p} lang={lang} />
        </span>
        <span className="k-prow-tag">{tr(p.tagline, lang)}</span>
        <span className="k-prow-meta">
          <span>{tr(ind.name, lang)}</span>
          <span dir="ltr">{p.languages}</span>
        </span>
      </Link>
    </li>
  );
}

export function PageHead({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="k-head">
      {eyebrow && <p className="k-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {lede && <p className="k-lede">{lede}</p>}
    </header>
  );
}

export function Crumbs({ lang, items }: { lang: Lang; items: { href?: string; label: string }[] }) {
  return (
    <nav className="k-crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link href={`/${lang}`}>{tr(C.home, lang)}</Link></li>
        {items.map((it) => (
          <li key={it.label}>{it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export const industryOrder = INDUSTRIES.map((i) => i.slug);
