import { MAG } from "@/lib/copy";
import { tr, type Lang } from "@/lib/i18n";
import { Ico } from "./Ico";

const TIMES = ["09:12", "09:40", "10:05"];

/** The picture at the top of the home page: one request followed step by step
 *  in a system window, and an appointment on a phone. It is an illustration of
 *  how our systems work, not a screenshot and not a client's data, so the whole
 *  figure is one image for assistive technology and its inner text is hidden. */
export function HeroConsole({ lang }: { lang: Lang }) {
  const c = MAG.console;
  return (
    <div className="h-stage" role="img" aria-label={tr(c.alt, lang)}>
      <div className="h-win" aria-hidden="true">
        <div className="h-win-bar"><i /><i /><i /><span>{tr(c.title, lang)}</span></div>
        <div className="h-win-body">
          <div className="h-req">
            <div><small>{tr(c.ref, lang)}</small><b>{tr(c.name, lang)}</b></div>
            <span className="k-pill k-pill-development">{tr(c.progress, lang)}</span>
          </div>
          <ol className="h-steps">
            {c.steps.map((s, i) => (
              <li key={s.l.en} className={i < TIMES.length ? "done" : "now"}>
                <span className="h-dot">{i < TIMES.length && <Ico n="check" size={14} />}</span>
                <span><b>{tr(s.l, lang)}</b><small>{tr(s.who, lang)}</small></span>
                <time dir="ltr">{TIMES[i] ?? "· · ·"}</time>
              </li>
            ))}
          </ol>
          <div className="h-audit"><Ico n="lock" size={16} />{tr(c.audit, lang)}</div>
        </div>
      </div>
      <div className="h-phone" aria-hidden="true">
        <div>
          <small>{tr(c.appt, lang)}</small>
          <b dir="ltr">10:30</b>
          <span>{tr(c.when, lang)}</span>
          <em><span>{tr(c.ticket, lang)}</span> <span dir="ltr">A-042</span></em>
          <strong><Ico n="check" size={14} />{tr(c.confirmed, lang)}</strong>
        </div>
      </div>
    </div>
  );
}
