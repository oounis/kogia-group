#!/usr/bin/env python3
"""Porte de qualité avant publication. Échoue = le déploiement s'arrête.

Chaque contrôle correspond à un défaut réellement parti en production :
un /idees/ en 404, des og:url pointant tous l'accueil, un sitemap d'une
seule URL, des liens d'en-tête visant des blocs masqués, un bloc
d'instructions d'écriture expédié aux lecteurs.
"""
import json
import pathlib
import re
import sys

site = pathlib.Path(__file__).resolve().parent.parent / "site"
erreurs = []

idees = [i for i in json.loads((site / "idees.json").read_text(encoding="utf-8"))["idees"]
         if not i.get("brouillon")]
publies = [site / "idees" / f"{i['slug']}.html" for i in idees]

# 1. chaque idée publiée a son fichier, et réciproquement
for p in publies:
    if not p.exists():
        erreurs.append(f"{p.name} : listé dans idees.json mais absent")
for f in (site / "idees").glob("*.html"):
    if f.name in ("_modele.html", "index.html"):
        continue
    if f.stem not in {i["slug"] for i in idees} and not any(
            i.get("brouillon") and i["slug"] == f.stem
            for i in json.loads((site / "idees.json").read_text(encoding="utf-8"))["idees"]):
        erreurs.append(f"{f.name} : en ligne mais absent d'idees.json")

# 2. la route /idees/ répond
if not (site / "idees" / "index.html").exists():
    erreurs.append("/idees/ n'a pas d'index — c'est un 404 vécu")

# 3. og:url == canonical sur chaque article
for p in publies:
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8")
    canon = re.search(r'rel="canonical" href="([^"]+)"', t)
    og = re.search(r'property="og:url" content="([^"]+)"', t)
    if not canon or not og or canon.group(1) != og.group(1):
        erreurs.append(f"{p.name} : og:url ({og and og.group(1)}) ≠ canonical ({canon and canon.group(1)})")

# 4. aucun marqueur {{...}} ni bloc d'instructions hors du modèle
for f in site.rglob("*.html"):
    if f.name == "_modele.html":
        continue
    t = f.read_text(encoding="utf-8")
    if re.search(r"\{\{[A-Z]+\}\}", t):
        erreurs.append(f"{f.relative_to(site)} : marqueur de gabarit non remplacé")
    if "écrire ici" in t:
        erreurs.append(f"{f.relative_to(site)} : bloc d'instructions d'écriture expédié aux lecteurs")

# 5. chaque ancre visée par l'en-tête existe dans chaque page qui la propose
for f in site.rglob("*.html"):
    if f.name == "_modele.html":
        continue
    t = f.read_text(encoding="utf-8")
    for ancre in re.findall(r'href="#([a-z]+)"', t):
        if f'id="{ancre}"' not in t:
            erreurs.append(f"{f.relative_to(site)} : le lien #{ancre} ne mène nulle part")

# 6. le sitemap couvre toutes les idées publiées
sm = (site / "sitemap.xml").read_text(encoding="utf-8")
for i in idees:
    if f"idees/{i['slug']}.html" not in sm:
        erreurs.append(f"sitemap : {i['slug']} manquant")

# 7. les liens statiques sont bien dans le flux
if 'carte-statique' not in (site / "index.html").read_text(encoding="utf-8"):
    erreurs.append("index.html : aucun lien statique — les articles sont invisibles sans JavaScript")

if erreurs:
    print("PUBLICATION REFUSÉE :")
    for e in erreurs:
        print("  ✗", e)
    sys.exit(1)
print(f"vérification : {len(idees)} idée(s) publiée(s), tous les contrôles passent")
