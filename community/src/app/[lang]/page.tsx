import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Page } from "@/components/site/Chrome";
import { IndustryCard } from "@/components/site/Blocks";
import { HeroConsole } from "@/components/site/Hero";
import { Ico } from "@/components/site/Ico";
import { SceneEducation, SceneEnterprise, SceneGovernment, SceneHealth, SceneSecurity } from "@/components/site/Scenes";
import { InsightCard } from "@/components/site/Insights";
import { INDUSTRIES, PRODUCTS, productsIn } from "@/lib/catalog";
import { C, HOME, MAG, META } from "@/lib/copy";
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
      <div className="m-hero">
      <section className="m-cover">
        <div>
          <p className="m-kicker">{tr(MAG.kicker, lang)}</p>
          <h1>{tr(MAG.h1, lang)}</h1>
          <p className="m-sub">{tr(MAG.sub, lang)}</p>
          <div className="k-cta">
            <a href="#stories" className="k-btn k-btn-primary">{tr(MAG.ctaStories, lang)}</a>
            <Link href={`/${lang}/contact`} className="k-btn k-btn-ghost">{tr(C.contact, lang)}</Link>
          </div>
        </div>
        <div className="m-cover-art"><HeroConsole lang={lang} /></div>
      </section>
      <div className="m-hero-facts">
        <dl>
          <div><dt>{tr(MAG.facts.industries, lang)}</dt><dd dir="ltr">{INDUSTRIES.length}</dd></div>
          <div><dt>{tr(MAG.facts.products, lang)}</dt><dd dir="ltr">{PRODUCTS.length}</dd></div>
          <div><dt>{tr(MAG.facts.languages, lang)}</dt><dd dir="ltr">3</dd></div>
          <div><dt>{tr(MAG.facts.delivery, lang)}</dt><dd dir="ltr">3</dd></div>
        </dl>
      </div>
      </div>

      <section className="m-film">
        <div className="n-home-head">
          <p className="m-field">{tr(MAG.film.kicker, lang)}</p>
          <h2>{tr(MAG.film.h, lang)}</h2>
          <p>{tr(MAG.film.p, lang)}</p>
          <a className="m-more" href={`/video/queue-${lang}-vertical.mp4`}>{tr(MAG.film.vertical, lang)} <Ico n="arrow" size={18} /></a>
          <a className="m-more" href={`/video/licence-${lang}.mp4`}>{tr(MAG.film.second, lang)} <Ico n="arrow" size={18} /></a>
        </div>
        <video className="m-film-video" controls playsInline preload="none" poster={`/video/queue-${lang}.jpg`} aria-label={tr(MAG.film.label, lang)}>
          <source src={`/video/queue-${lang}.mp4`} type="video/mp4" />
        </video>
      </section>

      <section className="m-sectors">
        <div className="n-home-head">
          <p className="m-field">{tr(MAG.sectorsKicker, lang)}</p>
          <h2>{tr(HOME.industriesH, lang)}</h2>
          <p>{tr(HOME.industriesP, lang)}</p>
        </div>
        <div className="k-grid k-grid5">
          {INDUSTRIES.map((i) => <IndustryCard key={i.slug} i={i} lang={lang} count={productsIn(i.slug).length} />)}
        </div>
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
