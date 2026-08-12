#!/usr/bin/env python3
"""Construit ce qui doit être dérivé de idees.json au moment du déploiement.

1. sitemap.xml — la bibliothèque entière, pas seulement l'accueil. Sans lui,
   les articles n'existaient pour aucun moteur : le flux est construit par
   JavaScript et la page ne contenait aucun lien statique.
2. Liens statiques dans #flux — les moteurs et les navigateurs sans
   JavaScript voient une vraie liste ; le script la remplace par les cartes
   complètes dès qu'il démarre.

S'exécute dans l'espace de travail du déploiement, jamais dans le dépôt.
"""
import json
import pathlib
import sys

site = pathlib.Path(__file__).resolve().parent.parent / "site"
idees = [i for i in json.loads((site / "idees.json").read_text(encoding="utf-8"))["idees"]
         if not i.get("brouillon")]
if not idees:
    sys.exit("aucune idée publiée — refus de construire un site vide")

# ── sitemap ──────────────────────────────────────────────────────────────
derniere = max(i["date"] for i in idees)
urls = [f"""  <url>
    <loc>https://kogiagroup.com/</loc>
    <lastmod>{derniere}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>"""]
for i in idees:
    urls.append(f"""  <url>
    <loc>https://kogiagroup.com/idees/{i['slug']}.html</loc>
    <lastmod>{i['date']}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")
(site / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "\n".join(urls) + "\n</urlset>\n", encoding="utf-8")
print(f"sitemap : {1 + len(idees)} URL, lastmod {derniere}")

# ── liens statiques ──────────────────────────────────────────────────────
index = site / "index.html"
t = index.read_text(encoding="utf-8")
marqueur = '<div id="flux" aria-live="polite"></div>'
if marqueur not in t:
    sys.exit("marqueur #flux introuvable — la structure de l'accueil a changé")
liens = "\n".join(
    f'<a class="carte-statique" href="idees/{i["slug"]}.html">'
    f'<b>{i["titre"]}</b><span>{i["resume"]}</span></a>'
    for i in sorted(idees, key=lambda x: x["date"], reverse=True))
t = t.replace(marqueur, f'<div id="flux" aria-live="polite">\n{liens}\n</div>')
index.write_text(t, encoding="utf-8")
print(f"liens statiques : {len(idees)} article(s) dans #flux")
