import Link from "next/link";
import { INSIGHTS_PAGE, insightDate, type Insight } from "@/lib/insights";
import { tr, type Lang } from "@/lib/i18n";
import { Ico } from "./Ico";

/** One article on the list page and on the home band: field, title, the
 *  opening lines and the headline figure with its source. */
export function InsightCard({ a, lang, level = 2 }: { a: Insight; lang: Lang; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const f = a.figures[0];
  return (
    <Link href={`/${lang}/insights/${a.slug}`} className="k-card n-card">
      <span className="n-card-top">
        <span className="n-card-ico"><Ico n={a.icon} size={22} /></span>
        <span className="n-field">{tr(a.field, lang)}</span>
      </span>
      <H className="n-card-title">{tr(a.title, lang)}</H>
      <span className="n-card-lede">{tr(a.lede, lang)}</span>
      <span className="n-card-fig">
        <b dir="ltr">{f.v}</b>
        <span>{tr(f.l, lang)}</span>
      </span>
      <span className="n-card-foot">
        <time dateTime={a.date}>{insightDate(a.date, lang)}</time>
        <span className="n-card-more">{tr(INSIGHTS_PAGE.read, lang)} <Ico n="arrow" size={18} /></span>
      </span>
    </Link>
  );
}
