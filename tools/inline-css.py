#!/usr/bin/env python3
"""Replie assets/kogia.css dans chaque page au moment du déploiement.

Le dépôt garde une seule feuille de style — une correction de design se fait
à un seul endroit. Le site publié, lui, n'a aucune requête CSS bloquante :
le style part avec le HTML, comme avant l'extraction.

Le fichier assets/kogia.css reste publié : les pages en cours d'écriture,
ouvertes en local, continuent de fonctionner avec la balise <link>.
"""
import pathlib
import re
import sys

racine = pathlib.Path(__file__).resolve().parent.parent / "site"
feuille = racine / "assets" / "kogia.css"

if not feuille.exists():
    sys.exit(f"feuille introuvable : {feuille}")

css = feuille.read_text(encoding="utf-8")
lien = re.compile(r'[ \t]*<link rel="stylesheet" href="(?:\.\./)?assets/kogia\.css">\n?')

remplacees = 0
for page in sorted(racine.rglob("*.html")):
    texte = page.read_text(encoding="utf-8")
    if not lien.search(texte):
        continue
    # `\g<0>` n'est pas utilisé : le CSS peut contenir des séquences comme \1
    texte = lien.sub(lambda _: "<style>\n" + css + "</style>\n", texte, count=1)
    if lien.search(texte):
        sys.exit(f"{page.relative_to(racine)} : plusieurs liens vers la feuille")
    page.write_text(texte, encoding="utf-8")
    remplacees += 1
    print(f"  replié dans {page.relative_to(racine)}")

if remplacees == 0:
    sys.exit("aucune page ne référence la feuille — extraction cassée ?")
print(f"{remplacees} page(s) traitée(s)")
