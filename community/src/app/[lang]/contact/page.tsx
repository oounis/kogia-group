import type { Metadata } from "next";
import { Page } from "@/components/site/Chrome";
import { PageHead } from "@/components/site/Blocks";
import { Ico } from "@/components/site/Ico";
import { CONTACT, EMAIL } from "@/lib/copy";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: tr(CONTACT.h1, lang), description: tr(CONTACT.lede, lang), alternates: alternates(lang, "/contact") };
}

export default async function Contact({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/contact">
      <PageHead title={tr(CONTACT.h1, lang)} lede={tr(CONTACT.lede, lang)} />
      <section className="k-split">
        <div>
          <a className="k-mailbig" href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a>
        </div>
        <div className="k-feature">
          <h2 className="k-h2">{tr(CONTACT.helpH, lang)}</h2>
          <ul className="k-checks">{CONTACT.help.map((h) => <li key={h.en}><Ico n="check" size={18} />{tr(h, lang)}</li>)}</ul>
          <p className="k-note" style={{ marginTop: 12 }}>{tr(CONTACT.privacy, lang)}</p>
        </div>
      </section>
    </Page>
  );
}
