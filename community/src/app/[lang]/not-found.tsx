"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Page } from "@/components/site/Chrome";
import { C } from "@/lib/copy";
import { isLang, tr, type Lang } from "@/lib/i18n";

/* Client component on purpose: not-found receives no params, and reading
   request headers here would make every page of the site dynamic. */
export default function NotFound() {
  const seg = usePathname()?.split("/")[1];
  const lang: Lang = isLang(seg) ? seg : "en";
  return (
    <Page lang={lang} path="/">
      <section className="k-hero">
        <p className="k-eyebrow">404</p>
        <h1>{tr(C.notFoundTitle, lang)}</h1>
        <p className="k-lede">{tr(C.notFoundBody, lang)}</p>
        <div className="k-cta"><Link href={`/${lang}`} className="k-btn k-btn-primary">{tr(C.home, lang)}</Link>
          <Link href={`/${lang}/products`} className="k-btn k-btn-ghost">{tr(C.products, lang)}</Link></div>
      </section>
    </Page>
  );
}
