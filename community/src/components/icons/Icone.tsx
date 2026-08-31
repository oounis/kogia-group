import { CHEMINS_ICONES, type NomIcone } from "./chemins";

export type { NomIcone };
export { NOMS_ICONES } from "./chemins";

/** Tailles du système, telles que définies dans les jetons :
 *  16 en ligne dans du texte · 18 dans un contrôle · 20 en navigation ·
 *  24 pour une icône de mise en avant. */
export const TAILLES_ICONE = { inline: 16, controle: 18, nav: 20, feature: 24 } as const;
export type TailleIcone = keyof typeof TAILLES_ICONE | number;

type Props = {
  nom: NomIcone;
  taille?: TailleIcone;
  /** Texte lu par les lecteurs d'écran. **Obligatoire quand l'icône porte du
   *  sens à elle seule** (un bouton sans texte, par exemple). L'omettre rend
   *  l'icône décorative : elle est alors masquée aux technologies
   *  d'assistance, ce qui est correct lorsqu'un libellé visible l'accompagne
   *  déjà, mais faux si l'icône est la seule information. */
  libelle?: string;
  className?: string;
};

/**
 * L'unique façon d'afficher une icône Kogia.
 *
 * L'icône hérite de la couleur du texte (`currentColor`), donc survol, état
 * actif, état désactivé et fond sombre fonctionnent sans variante de
 * fichier : il suffit de changer `color`. La seconde teinte des icônes
 * bicolores suit `--icone-accent`, qui retombe sur `currentColor` si elle
 * n'est pas définie.
 */
export default function Icone({ nom, taille = "nav", libelle, className }: Props) {
  const px = typeof taille === "number" ? taille : TAILLES_ICONE[taille];
  const decorative = !libelle;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={libelle}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: CHEMINS_ICONES[nom] }}
    />
  );
}
