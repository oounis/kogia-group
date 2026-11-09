import Link from "next/link";
import Marque from "@/components/Marque";
import { INDUSTRIES, PRODUCTS } from "@/lib/catalog";
import { C, EMAIL, FOOTER, NAV } from "@/lib/copy";
import { LANGS, LANG_NAME, tr, type Lang } from "@/lib/i18n";
import { Ico } from "./Ico";

/** Header. Server component: the mobile drawer and the language menu are
 *  <details> elements, so they work before hydration and with no script.
 *  `path` is the current path without the language prefix, used by the
 *  language switcher to stay on the same page. */
export function Header({ lang, path, active }: { lang: Lang; path: string; active?: string }) {
  return (
    <header className="k-top">
      <a href="#main" className="k-skip">{tr(C.skip, lang)}</a>
      <div className="k-top-in">
        <Marque href={`/${lang}`} />
        <nav className="k-nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={`/${lang}${n.href}`} aria-current={active === n.href ? "page" : undefined}>
              {tr(n.label, lang)}
            </Link>
          ))}
        </nav>
        <div className="k-top-actions">
          <details className="k-lang">
            <summary aria-label={tr(C.language, lang)}>
              <Ico n="globe" size={18} />
              <span>{lang.toUpperCase()}</span>
            </summary>
            <ul>
              {LANGS.map((l) => (
                <li key={l}>
                  <a href={`/${l}${path === "/" ? "" : path}`} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined}>
                    {LANG_NAME[l]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <Link href={`/${lang}/contact`} className="k-btn k-btn-primary k-hide-sm">{tr(C.contact, lang)}</Link>
          <details className="k-drawer">
            <summary aria-label={tr(C.menu, lang)}><Ico n="menu" size={22} /></summary>
            <div className="k-drawer-panel">
              {NAV.map((n) => (
                <Link key={n.href} href={`/${lang}${n.href}`}>{tr(n.label, lang)}</Link>
              ))}
              <Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)}</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="k-foot">
      <div className="k-foot-in">
        <div className="k-foot-brand">
          <Marque href={`/${lang}`} hauteur={34} />
          <p>{tr(FOOTER.about, lang)}</p>
          <p className="k-foot-mail"><Ico n="mail" size={16} /> <a href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a></p>
        </div>
        <div className="k-foot-col">
          <h2>{tr(C.industries, lang)}</h2>
          <ul>{INDUSTRIES.map((i) => <li key={i.slug}><Link href={`/${lang}/industries/${i.slug}`}>{tr(i.name, lang)}</Link></li>)}</ul>
        </div>
        <div className="k-foot-col">
          <h2>{tr(C.products, lang)}</h2>
          <ul>{PRODUCTS.map((p) => <li key={p.slug}><Link href={`/${lang}/products/${p.slug}`}>{p.name}</Link></li>)}</ul>
        </div>
        <div className="k-foot-col">
          <h2>{tr(FOOTER.company, lang)}</h2>
          <ul>
            {NAV.slice(2).map((n) => <li key={n.href}><Link href={`/${lang}${n.href}`}>{tr(n.label, lang)}</Link></li>)}
            <li><Link href={`/${lang}/contact`}>{tr(C.contact, lang)}</Link></li>
            <li><Link href={`/${lang}/privacy`}>{tr(FOOTER.privacy, lang)}</Link></li>
            <li><Link href={`/${lang}/terms`}>{tr(FOOTER.terms, lang)}</Link></li>
          </ul>
        </div>
      </div>
      <div className="k-foot-bottom">
        <p>© 2026 KogiaGroup</p>
        <p className="k-foot-langs">
          {LANGS.map((l) => <a key={l} href={`/${l}`} hrefLang={l} lang={l}>{LANG_NAME[l]}</a>)}
        </p>
      </div>
    </footer>
  );
}

/** Page frame: header, main landmark, footer. */
export function Page({ lang, path, active, children }: { lang: Lang; path: string; active?: string; children: React.ReactNode }) {
  return (
    <>
      <Header lang={lang} path={path} active={active} />
      <main id="main" className="k-main">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
