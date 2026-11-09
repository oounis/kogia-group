import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { PageHead, ProductRow } from "@/components/site/Blocks";
import { INDUSTRIES, PRODUCTS } from "@/lib/catalog";
import { C, HOME } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(C.products, lang), description: tr(HOME.productsP, lang), alternates: alternates(lang, "/products") };
}

export default async function Products({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/products" active="/products">
      <PageHead title={tr(HOME.productsH, lang)} lede={tr(HOME.productsP, lang)} />
      {INDUSTRIES.map((i) => {
        const list = PRODUCTS.filter((p) => p.industry === i.slug);
        if (!list.length) return null;
        return (
          <section key={i.slug}>
            <div className="k-sec-head"><h2 className="k-h2">{tr(i.name, lang)}</h2></div>
            <ul className="k-plist">{list.map((p) => <ProductRow key={p.slug} p={p} lang={lang} />)}</ul>
          </section>
        );
      })}
    </Page>
  );
}
