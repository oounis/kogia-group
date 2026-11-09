import { NextResponse, type NextRequest } from "next/server";
import { isLang, negotiate } from "@/lib/i18n";

/* Every page lives under a language prefix (/en, /fr, /ar).
   A path without one is redirected to the visitor's language
   (Accept-Language, English by default).
   Prefixed requests pass through untouched. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLang(first)) return NextResponse.next();
  const lang = negotiate(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico|icon.svg|og.png|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)"],
};
