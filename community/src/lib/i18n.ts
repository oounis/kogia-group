/* The three company languages. Mandatory on every KogiaGroup surface
   (founder directive, 2026-11-09). Arabic is real RTL: `dir` is set on <html>,
   and layout uses logical properties (inline-start/end), never left/right. */
export const LANGS = ["en", "fr", "ar"] as const;
export type Lang = (typeof LANGS)[number];
export type T = Record<Lang, string>;

export const isLang = (v: string | undefined): v is Lang => !!v && (LANGS as readonly string[]).includes(v);
export const dir = (l: Lang) => (l === "ar" ? "rtl" : "ltr");
export const tr = (t: T, l: Lang) => t[l];

export const LANG_NAME: Record<Lang, string> = { en: "English", fr: "Français", ar: "العربية" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", fr: "fr_FR", ar: "ar_AR" };

/** Pick the best language from an Accept-Language header. English is the default. */
export function negotiate(header: string | null | undefined): Lang {
  for (const part of (header ?? "").toLowerCase().split(",")) {
    const code = part.trim().slice(0, 2);
    if (isLang(code)) return code;
  }
  return "en";
}

/** hreflang alternates for a path that exists in every language. */
export function alternates(lang: Lang, path: string) {
  const p = path === "/" ? "" : path;
  return {
    canonical: `/${lang}${p}`,
    languages: { en: `/en${p}`, fr: `/fr${p}`, ar: `/ar${p}`, "x-default": `/en${p}` },
  };
}
