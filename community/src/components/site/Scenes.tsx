/* Drawn scenes for the magazine home page. Pure SVG, no text inside (so they
   serve Arabic, French and English alike), brand tokens only plus one warm
   highlight. Each scene tells the story next to it: who asks, where the work
   travels, what comes back. Decorative: the story text carries the meaning. */
import type { ReactNode } from "react";

const INK = "var(--k-pine-900)";
const OCEAN = "var(--k-emerald-600)";
const SOFT = "var(--k-emerald-100)";
const PALE = "var(--k-emerald-50)";
const LINE = "var(--k-g-line)";
const WARM = "#F0B429";
const WHITE = "#fff";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg className="m-scene" viewBox="0 0 520 380" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="520" height="380" rx="28" fill={PALE} />
      <g fill={SOFT}>{Array.from({ length: 6 }, (_, r) => Array.from({ length: 9 }, (_, c) => <circle key={`${r}-${c}`} cx={36 + c * 56} cy={34 + r * 62} r="1.6" />))}</g>
      {children}
    </svg>
  );
}

const Person = ({ x, y, c = INK, s = 1 }: { x: number; y: number; c?: string; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="0" r="11" fill={c} />
    <path d="M-17 46c0-20 7-30 17-30s17 10 17 30z" fill={c} />
  </g>
);

const Phone = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="44" height="76" rx="9" fill={INK} />
    <rect x="4" y="8" width="36" height="58" rx="4" fill={WHITE} />
    <rect x="9" y="15" width="26" height="5" rx="2.5" fill={SOFT} />
    <rect x="9" y="25" width="18" height="5" rx="2.5" fill={SOFT} />
    <rect x="9" y="46" width="26" height="12" rx="6" fill={OCEAN} />
  </g>
);

const Doc = ({ x, y, seal = true }: { x: number; y: number; seal?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="78" height="100" rx="8" fill={WHITE} stroke={LINE} strokeWidth="2" />
    <rect x="12" y="14" width="40" height="6" rx="3" fill={INK} />
    <rect x="12" y="28" width="54" height="5" rx="2.5" fill={SOFT} />
    <rect x="12" y="39" width="54" height="5" rx="2.5" fill={SOFT} />
    <rect x="12" y="50" width="34" height="5" rx="2.5" fill={SOFT} />
    <g fill={INK}>
      <rect x="12" y="66" width="9" height="9" /><rect x="24" y="66" width="5" height="5" /><rect x="12" y="78" width="5" height="9" />
      <rect x="20" y="80" width="9" height="7" /><rect x="31" y="73" width="6" height="6" />
    </g>
    {seal && <g><circle cx="60" cy="78" r="15" fill={OCEAN} /><path d="M53 78l5 5 9-10" fill="none" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></g>}
  </g>
);

const Flow = ({ d }: { d: string }) => <path d={d} fill="none" stroke={OCEAN} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />;
const Dot = ({ x, y, c = OCEAN }: { x: number; y: number; c?: string }) => <g><circle cx={x} cy={y} r="9" fill={WHITE} /><circle cx={x} cy={y} r="5.5" fill={c} /></g>;
const Ground = ({ y = 318 }: { y?: number }) => <rect x="28" y={y} width="464" height="4" rx="2" fill={SOFT} />;

/* Cover: five institutions standing on one platform. */
export function SceneCover({ label }: { label: string }) {
  return (
    <svg className="m-scene m-scene-cover" viewBox="0 0 640 420" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="420" rx="32" fill={PALE} />
      <circle cx="540" cy="86" r="44" fill={WARM} opacity=".9" />
      <g fill={SOFT}>{Array.from({ length: 5 }, (_, r) => Array.from({ length: 11 }, (_, c) => <circle key={`${r}-${c}`} cx={40 + c * 56} cy={36 + r * 44} r="1.8" />))}</g>
      {/* hospital */}
      <g transform="translate(44 150)">
        <rect width="96" height="130" rx="6" fill={WHITE} stroke={INK} strokeWidth="3" />
        <rect x="34" y="-26" width="28" height="26" rx="4" fill={OCEAN} /><path d="M48 -20v14M41 -13h14" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
        <g fill={SOFT}><rect x="14" y="18" width="18" height="18" rx="3" /><rect x="39" y="18" width="18" height="18" rx="3" /><rect x="64" y="18" width="18" height="18" rx="3" /><rect x="14" y="48" width="18" height="18" rx="3" /><rect x="64" y="48" width="18" height="18" rx="3" /></g>
        <rect x="39" y="48" width="18" height="18" rx="3" fill={WARM} /><rect x="36" y="92" width="24" height="38" rx="3" fill={INK} />
      </g>
      {/* school */}
      <g transform="translate(160 186)">
        <path d="M0 34L52 0l52 34z" fill={OCEAN} /><rect x="6" y="34" width="92" height="60" fill={WHITE} stroke={INK} strokeWidth="3" />
        <circle cx="52" cy="22" r="7" fill={WHITE} /><rect x="42" y="60" width="20" height="34" rx="3" fill={INK} />
        <g fill={SOFT}><rect x="14" y="46" width="18" height="16" rx="3" /><rect x="72" y="46" width="18" height="16" rx="3" /></g>
        <path d="M52 0v-26" stroke={INK} strokeWidth="3" /><path d="M52 -26h20l-5 7 5 7H52z" fill={WARM} />
      </g>
      {/* municipality */}
      <g transform="translate(284 128)">
        <path d="M-6 44L60 0l66 44z" fill={INK} /><rect x="0" y="44" width="120" height="10" fill={INK} />
        <g fill={WHITE} stroke={INK} strokeWidth="3"><rect x="8" y="54" width="16" height="84" /><rect x="38" y="54" width="16" height="84" /><rect x="68" y="54" width="16" height="84" /><rect x="98" y="54" width="16" height="84" /></g>
        <rect x="-8" y="138" width="136" height="14" rx="3" fill={INK} /><circle cx="60" cy="27" r="8" fill={WARM} />
      </g>
      {/* guarded building */}
      <g transform="translate(424 170)">
        <rect width="74" height="110" rx="6" fill={WHITE} stroke={INK} strokeWidth="3" />
        <g fill={SOFT}><rect x="12" y="14" width="50" height="10" rx="3" /><rect x="12" y="32" width="50" height="10" rx="3" /><rect x="12" y="50" width="50" height="10" rx="3" /></g>
        <rect x="25" y="74" width="24" height="36" rx="3" fill={OCEAN} /><circle cx="43" cy="93" r="2.5" fill={WHITE} />
        <path d="M74 12l22 8-4 12-18-6z" fill={INK} /><path d="M92 26l26 30H84z" fill={WARM} opacity=".45" />
      </g>
      {/* office tower */}
      <g transform="translate(524 136)">
        <rect width="72" height="144" rx="6" fill={INK} />
        <g fill={PALE}>{Array.from({ length: 5 }, (_, r) => [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={10 + c * 19} y={14 + r * 24} width="13" height="14" rx="2" opacity={(r + c) % 3 === 0 ? 1 : 0.45} />))}</g>
      </g>
      {/* one platform under all of them */}
      <g stroke={OCEAN} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" fill="none">
        <path d="M92 282v44" /><path d="M212 282v44" /><path d="M344 282v44" /><path d="M461 282v44" /><path d="M560 282v44" />
      </g>
      <rect x="40" y="326" width="560" height="56" rx="18" fill={OCEAN} />
      {[92, 212, 344, 461, 560].map((x) => <g key={x}><circle cx={x} cy="354" r="11" fill={WHITE} /><circle cx={x} cy="354" r="5" fill={OCEAN} /></g>)}
      <path d="M103 354h98M223 354h110M355 354h95M472 354h77" stroke={WHITE} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

/* Government: the request leaves a phone, crosses the municipality, comes back sealed. */
export function SceneGovernment({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <Ground />
      <Person x={70} y={236} />
      <Phone x={96} y={196} />
      <Flow d="M146 204C176 120 214 96 250 110" />
      <g transform="translate(196 118)">
        <path d="M-8 46L64 0l72 46z" fill={INK} /><rect x="0" y="46" width="128" height="10" fill={INK} />
        <g fill={WHITE} stroke={INK} strokeWidth="3"><rect x="10" y="56" width="16" height="118" /><rect x="102" y="56" width="16" height="118" /></g>
        <rect x="30" y="66" width="68" height="108" rx="6" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <rect x="40" y="78" width="48" height="30" rx="4" fill={INK} /><rect x="45" y="83" width="38" height="20" rx="2" fill={SOFT} />
        <path d="M51 96l6 6 13-14" fill="none" stroke={OCEAN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="64" cy="128" r="9" fill={OCEAN} /><path d="M50 164c0-16 6-24 14-24s14 8 14 24z" fill={OCEAN} />
        <rect x="-10" y="174" width="148" height="14" rx="3" fill={INK} /><circle cx="64" cy="28" r="8" fill={WARM} />
      </g>
      <Flow d="M330 156C372 132 398 140 416 170" />
      <Doc x={392} y={176} />
      <Dot x={146} y={204} /><Dot x={250} y={110} c={WARM} /><Dot x={416} y={170} />
      {/* the empty queue */}
      <g stroke={INK} strokeWidth="3" strokeLinecap="round"><path d="M40 318v-22M76 318v-22" /><path d="M40 300h36" stroke={WARM} /></g>
    </Frame>
  );
}

/* Healthcare: one file travels through reception, doctor, laboratory, pharmacy. */
export function SceneHealth({ label }: { label: string }) {
  const station = (x: number, child: ReactNode) => (
    <g transform={`translate(${x} 168)`}>
      <rect width="96" height="128" rx="14" fill={WHITE} stroke={LINE} strokeWidth="2" />
      {child}
    </g>
  );
  return (
    <Frame label={label}>
      <Ground />
      <path d="M76 110H444" stroke={OCEAN} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      {[76, 198, 322, 444].map((x) => <path key={x} d={`M${x} 110v58`} stroke={OCEAN} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />)}
      {/* the single patient file */}
      <g transform="translate(232 54)">
        <path d="M0 14a8 8 0 0 1 8-8h22l8 10h32a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill={INK} />
        <rect x="8" y="24" width="62" height="40" rx="5" fill={WHITE} /><circle cx="24" cy="40" r="7" fill={OCEAN} />
        <rect x="36" y="34" width="26" height="5" rx="2.5" fill={SOFT} /><rect x="36" y="44" width="18" height="5" rx="2.5" fill={SOFT} />
        <path d="M14 56h10l4-6 5 10 4-4h22" fill="none" stroke={WARM} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {station(28, <g><rect x="18" y="74" width="60" height="34" rx="5" fill={INK} /><circle cx="48" cy="46" r="10" fill={OCEAN} /><path d="M32 78c0-12 7-18 16-18s16 6 16 18z" fill={OCEAN} /><rect x="60" y="20" width="22" height="28" rx="4" fill={WARM} /><rect x="65" y="27" width="12" height="4" rx="2" fill={WHITE} /></g>)}
      {station(150, <g><circle cx="48" cy="42" r="11" fill={INK} /><path d="M28 96c0-22 9-32 20-32s20 10 20 32z" fill={INK} /><path d="M40 68c0 14 16 14 16 0" fill="none" stroke={WHITE} strokeWidth="3" /><circle cx="56" cy="84" r="5" fill={WARM} /></g>)}
      {station(274, <g><path d="M40 26h16M44 26v24l-16 36a8 8 0 0 0 7 12h26a8 8 0 0 0 7-12L52 50V26" fill={WHITE} stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" /><path d="M35 78l-5 10a5 5 0 0 0 5 7h26a5 5 0 0 0 5-7l-5-10z" fill={OCEAN} /><circle cx="44" cy="68" r="3" fill={OCEAN} /></g>)}
      {station(396, <g><rect x="22" y="36" width="52" height="64" rx="8" fill={OCEAN} /><rect x="30" y="22" width="36" height="14" rx="4" fill={INK} /><path d="M48 54v28M34 68h28" stroke={WHITE} strokeWidth="6" strokeLinecap="round" /></g>)}
      <Dot x={76} y={110} /><Dot x={198} y={110} /><Dot x={322} y={110} /><Dot x={444} y={110} c={WARM} />
    </Frame>
  );
}

/* Education: the register is taken in class, the parent hears the same morning. */
export function SceneEducation({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <Ground />
      <g transform="translate(40 142)">
        <path d="M0 44L80 0l80 44z" fill={OCEAN} /><rect x="8" y="44" width="144" height="132" fill={WHITE} stroke={INK} strokeWidth="3" />
        <circle cx="80" cy="27" r="8" fill={WHITE} />
        <rect x="24" y="60" width="112" height="70" rx="6" fill={INK} />
        {[0, 1, 2].map((r) => <g key={r}><circle cx="42" cy={76 + r * 19} r="5" fill={SOFT} /><rect x="54" y={72 + r * 19} width="44" height="7" rx="3.5" fill={SOFT} opacity=".5" />{r === 1 ? <path d="M112 71l10 10M122 71l-10 10" stroke={WARM} strokeWidth="3.5" strokeLinecap="round" /> : <path d="M110 76l5 5 9-10" fill="none" stroke="#7FD4A8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />}</g>)}
        <path d="M80 0v-28" stroke={INK} strokeWidth="3" /><path d="M80 -28h24l-6 8 6 8H80z" fill={WARM} />
      </g>
      <Person x={150} y={272} c={OCEAN} s={0.9} />
      <Flow d="M214 190C270 120 330 120 388 176" />
      <g transform="translate(232 108)"><rect width="46" height="34" rx="8" fill={WHITE} stroke={LINE} strokeWidth="2" /><path d="M8 10l15 11 15-11" fill="none" stroke={OCEAN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></g>
      <Phone x={372} y={190} />
      <g transform="translate(404 168)"><circle r="15" fill={WARM} /><path d="M-6 0l4 5 8-9" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></g>
      <Person x={446} y={248} />
      <Person x={478} y={278} c={OCEAN} s={0.62} />
      <Dot x={214} y={190} /><Dot x={388} y={176} />
    </Frame>
  );
}

/* Security and buildings: door, camera and visitor all report to one screen. */
export function SceneSecurity({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <Ground />
      <g transform="translate(36 96)">
        <rect width="170" height="222" rx="8" fill={WHITE} stroke={INK} strokeWidth="3" />
        <g fill={SOFT}><rect x="18" y="22" width="36" height="26" rx="4" /><rect x="67" y="22" width="36" height="26" rx="4" /><rect x="116" y="22" width="36" height="26" rx="4" /><rect x="18" y="62" width="36" height="26" rx="4" /><rect x="116" y="62" width="36" height="26" rx="4" /></g>
        <rect x="60" y="126" width="50" height="96" rx="4" fill={OCEAN} /><circle cx="100" cy="176" r="4" fill={WHITE} />
        <rect x="120" y="150" width="20" height="30" rx="4" fill={INK} /><circle cx="130" cy="160" r="4" fill={WARM} />
        <path d="M170 18l30 10-5 15-25-8z" fill={INK} /><path d="M196 36l44 62h-66z" fill={WARM} opacity=".4" />
      </g>
      <Person x={250} y={272} />
      <g transform="translate(260 290)"><rect width="22" height="28" rx="4" fill={WHITE} stroke={OCEAN} strokeWidth="2.5" /><circle cx="11" cy="10" r="4" fill={OCEAN} /><rect x="5" y="18" width="12" height="4" rx="2" fill={OCEAN} /></g>
      <Flow d="M236 126C280 86 312 86 340 108" /><Flow d="M176 246C240 226 300 196 340 176" /><Flow d="M270 268C300 250 320 232 340 220" />
      <g transform="translate(340 84)">
        <rect width="150" height="168" rx="14" fill={INK} />
        <rect x="10" y="10" width="130" height="148" rx="8" fill={WHITE} />
        <rect x="18" y="20" width="54" height="40" rx="6" fill={PALE} /><path d="M30 50l10-14 8 8 8-12 10 18z" fill={OCEAN} />
        <rect x="78" y="20" width="54" height="40" rx="6" fill={WARM} /><path d="M105 30a8 8 0 0 1 8 8v6l3 5H94l3-5v-6a8 8 0 0 1 8-8z" fill={INK} />
        <rect x="18" y="68" width="54" height="40" rx="6" fill={PALE} /><rect x="36" y="76" width="18" height="26" rx="2" fill={OCEAN} />
        <rect x="78" y="68" width="54" height="40" rx="6" fill={PALE} /><circle cx="105" cy="82" r="6" fill={OCEAN} /><path d="M94 104c0-9 5-13 11-13s11 4 11 13z" fill={OCEAN} />
        <rect x="18" y="118" width="114" height="8" rx="4" fill={SOFT} /><rect x="18" y="132" width="74" height="8" rx="4" fill={SOFT} />
      </g>
      <rect x="392" y="252" width="46" height="14" fill={INK} /><rect x="368" y="266" width="94" height="10" rx="5" fill={INK} />
      <Dot x={340} y={108} /><Dot x={340} y={176} /><Dot x={340} y={220} c={WARM} />
    </Frame>
  );
}

/* Enterprise and firms: files, a deadline that warns in time, a reviewed document. */
export function SceneEnterprise({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <Ground />
      <g transform="translate(44 196)">
        {[0, 1, 2].map((i) => <g key={i} transform={`translate(${i * 8} ${-i * 34})`}><path d="M0 12a8 8 0 0 1 8-8h30l9 10h61a8 8 0 0 1 8 8v70a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill={i === 2 ? OCEAN : i === 1 ? INK : SOFT} /><rect x="12" y="30" width="60" height="7" rx="3.5" fill={WHITE} opacity=".85" /></g>)}
      </g>
      <g transform="translate(206 74)">
        <rect width="150" height="140" rx="14" fill={WHITE} stroke={LINE} strokeWidth="2" /><path d="M0 14a14 14 0 0 1 14-14h122a14 14 0 0 1 14 14v22H0z" fill={INK} />
        <g stroke={WHITE} strokeWidth="5" strokeLinecap="round"><path d="M38 -8v18M112 -8v18" stroke={INK} /></g>
        {Array.from({ length: 3 }, (_, r) => Array.from({ length: 5 }, (_, c) => (r === 1 && c === 3
          ? <g key={`${r}-${c}`}><rect x={12 + c * 27} y={48 + r * 30} width="20" height="22" rx="5" fill={WARM} /><circle cx={34 + c * 27} cy={46 + r * 30} r="7" fill={OCEAN} /></g>
          : <rect key={`${r}-${c}`} x={12 + c * 27} y={48 + r * 30} width="20" height="22" rx="5" fill={SOFT} />)))}
      </g>
      <Flow d="M168 214C190 250 214 264 250 268" /><Flow d="M300 214C320 236 348 246 378 236" />
      <Person x={278} y={262} />
      <g transform="translate(378 150)">
        <rect width="98" height="130" rx="10" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <rect x="14" y="16" width="48" height="7" rx="3.5" fill={INK} /><rect x="14" y="32" width="70" height="5" rx="2.5" fill={SOFT} /><rect x="14" y="43" width="70" height="5" rx="2.5" fill={SOFT} /><rect x="14" y="54" width="46" height="5" rx="2.5" fill={SOFT} />
        <circle cx="32" cy="94" r="16" fill={OCEAN} /><path d="M24 94l6 6 10-12" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="68" cy="94" r="16" fill={INK} /><path d="M60 94l6 6 10-12" fill="none" stroke={WARM} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Dot x={168} y={214} /><Dot x={300} y={214} c={WARM} /><Dot x={378} y={236} />
    </Frame>
  );
}
