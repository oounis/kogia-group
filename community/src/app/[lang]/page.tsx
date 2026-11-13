import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Page } from "@/components/site/Chrome";
import { Ico } from "@/components/site/Ico";
import { SceneCover, SceneEducation, SceneEnterprise, SceneGovernment, SceneHealth, SceneSecurity } from "@/components/site/Scenes";
import { InsightCard } from "@/components/site/Insights";
import { C, MAG, META } from "@/lib/copy";
import { INSIGHTS, INSIGHTS_PAGE } from "@/lib/insights";
import { alternates, tr, type Lang } from "@/lib/i18n";

type P = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: { absolute: tr(META.title, lang) }, alternates: alternates(lang, "/") };
}

const SCENES: Record<string, (label: string) => ReactNode> = {
  government: (l) => <SceneGovernment label={l} />,
  healthcare: (l) => <SceneHealth label={l} />,
  education: (l) => <SceneEducation label={l} />,
  security: (l) => <SceneSecurity label={l} />,
  enterprise: (l) => <SceneEnterprise label={l} />,
};
const num = (i: number) => String(i + 1).padStart(2, "0");

/* The home page reads as a magazine: a cover, one illustrated story per field,
   the commitments an institution can hold us to, the path of a project, and an
   invitation. Product statuses live on the product and industry pages. */
export default async function Home({ params }: P) {
  const { lang } = await params;
  return (
    <Page lang={lang} path="/">
      <section className="m-cover">
        <div>
          <p className="m-kicker">{tr(MAG.kicker, lang)}</p>
          <h1>{tr(MAG.h1, lang)}</h1>
          <p className="m-sub">{tr(MAG.sub, lang)}</p>
          <div className="k-cta">
            <a href="#stories" className="k-btn k-btn-primary">{tr(MAG.ctaStories, lang)}</a>
            <Link href={`/${lang}/contact`} className="k-btn k-btn-ghost">{tr(C.contact, lang)}</Link>
          </div>
          <nav className="m-contents" aria-label={tr(MAG.inThisIssue, lang)}>
            <b>{tr(MAG.inThisIssue, lang)}</b>
            {MAG.stories.map((s, i) => <a key={s.slug} href={`#${s.slug}`}><span dir="ltr">{num(i)}</span>{tr(s.title, lang)}</a>)}
          </nav>
        </div>
        <div className="m-cover-art"><SceneCover label={tr(MAG.coverAlt, lang)} /></div>
      </section>

      <div id="stories" />
      {MAG.stories.map((s, i) => (
        <section key={s.slug} id={s.slug} className="m-story">
          <div>
            <div className="m-story-head"><span className="m-num" dir="ltr" aria-hidden="true">{num(i)}</span><span className="m-field">{tr(s.field, lang)}</span></div>
            <h2>{tr(s.title, lang)}</h2>
            <p className="m-scene-text">{tr(s.scene, lang)}</p>
            <p className="m-label">{tr(MAG.withSystem, lang)}</p>
            <ol className="m-steps">{s.steps.map((st) => <li key={st.en}><span>{tr(st, lang)}</span></li>)}</ol>
            <p className="m-gain">{tr(s.gain, lang)}</p>
            <Link href={`/${lang}/industries/${s.slug}`} className="m-more">{tr(MAG.readField, lang)} <Ico n="arrow" size={18} /></Link>
          </div>
          <div className="m-story-art">{SCENES[s.slug](tr(s.title, lang))}</div>
        </section>
      ))}

      <section id="insights">
        <div className="n-home-head">
          <p className="m-field">{tr(INSIGHTS_PAGE.homeKicker, lang)}</p>
          <h2>{tr(INSIGHTS_PAGE.homeH, lang)}</h2>
          <p>{tr(INSIGHTS_PAGE.homeP, lang)}</p>
        </div>
        <div className="n-grid">{INSIGHTS.map((a) => <InsightCard key={a.slug} a={a} lang={lang} level={3} />)}</div>
        <div className="k-cta n-home-foot"><Link href={`/${lang}/insights`} className="k-btn k-btn-ghost">{tr(INSIGHTS_PAGE.all, lang)} <Ico n="arrow" size={18} /></Link></div>
      </section>

      <div className="m-trust">
        <div className="m-trust-in">
          <h2>{tr(MAG.trustH, lang)}</h2>
          <p className="m-trust-p">{tr(MAG.trustP, lang)}</p>
          <div className="m-trust-grid">
            {MAG.trust.map((t) => <div key={t.h.en}><h3><Ico n={t.icon} />{tr(t.h, lang)}</h3><p>{tr(t.p, lang)}</p></div>)}
          </div>
        </div>
      </div>

      <section>
        <h2 className="k-h2">{tr(MAG.pathH, lang)}</h2>
        <ol className="m-path-list">{MAG.path.map((p) => <li key={p.h.en}><h3>{tr(p.h, lang)}</h3><p>{tr(p.p, lang)}</p></li>)}</ol>
      </section>

      <section className="m-close">
        <h2>{tr(MAG.closeH, lang)}</h2>
        <p>{tr(MAG.closeP, lang)}</p>
        <div className="k-cta">
          <Link href={`/${lang}/contact`} className="k-btn k-btn-primary">{tr(C.contact, lang)} <Ico n="arrow" size={18} /></Link>
          <Link href={`/${lang}/how-we-work`} className="k-btn k-btn-ghost">{tr(C.learnMore, lang)}</Link>
        </div>
      </section>
    </Page>
  );
}
