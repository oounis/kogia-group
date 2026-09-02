import Link from "next/link";
import Marque from "./Marque";
import Icone from "./icons/Icone";
import styles from "./Chrome.module.css";

/** Les liens de navigation, déclarés une fois. L'en-tête les affiche en
 *  rangée sur grand écran et dans un tiroir sur téléphone, à partir du même
 *  tableau : c'est la seule façon de garantir que les deux disent la même
 *  chose. */
const LIENS = [
  { href: "/realisations", libelle: "Réalisations" },
  { href: "/journal", libelle: "Journal" },
  { href: "/savoir-faire", libelle: "Comment on travaille" },
  { href: "/explore", libelle: "Idées" },
  { href: "/about", libelle: "À propos" },
] as const;

type PageActive = (typeof LIENS)[number]["href"] | "/" | undefined;

/**
 * L'en-tête du site.
 *
 * `actif` sert à marquer la page courante. Il est passé explicitement plutôt
 * que déduit de `usePathname()`, pour que l'en-tête reste un composant
 * serveur : le déduire côté client obligerait à hydrater la barre du haut de
 * chaque page pour un effet purement visuel.
 */
export function EnTete({
  actif,
  compact = false,
}: {
  actif?: PageActive;
  /** `compact` retire les actions de compte, pour les pages de vitrine où
   *  « Rejoindre Kogia » n'est pas l'action que la page demande. */
  compact?: boolean;
}) {
  return (
    <header className={styles.top}>
      <div className={styles.topIn}>
        <Marque />

        <nav className={styles.nav} aria-label="Navigation principale">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={actif === l.href ? styles.actif : undefined}
              aria-current={actif === l.href ? "page" : undefined}
            >
              {l.libelle}
            </Link>
          ))}
        </nav>

        {/* Le tiroir mobile. Un <details> plutôt qu'un état React : il
            s'ouvre, se ferme et se pilote au clavier sans une ligne de
            JavaScript, donc il fonctionne avant l'hydratation. */}
        <details className={styles.tiroir}>
          <summary className={styles.tiroirBouton}>
            <Icone nom="menu" taille="nav" libelle="Ouvrir la navigation" />
            {/* Le mot est dans un span pour pouvoir disparaître seul sous
                380 px, où la barre ne tient plus. L'icône porte déjà le nom
                accessible, donc le bouton reste nommé sans lui. */}
            <span className={styles.tiroirLibelle}>Menu</span>
          </summary>
          <div className={styles.tiroirPanneau}>
            {LIENS.map((l) => (
              <Link key={l.href} href={l.href}>{l.libelle}</Link>
            ))}
          </div>
        </details>

        {!compact && (
          <div className={styles.topActions}>
            <Link href="/login" className={styles.lienDiscret}>Se connecter</Link>
            <Link href="/join" className="bouton accent">Rejoindre Kogia</Link>
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * Le pied de page.
 *
 * Il porte un vrai plan du site : c'est le seul endroit où toutes les pages
 * restent atteignables quand la navigation du haut est repliée, et la
 * dernière chance de dire ce que la société est.
 */
export function Pied() {
  return (
    <footer className={styles.pied}>
      <div className={styles.piedIn}>
        <div className={styles.piedMarque}>
          <Marque />
          <p>
            Une maison de logiciel indépendante, entre la Tunisie et Bahreïn.
            On explore des idées, on construit celles qui méritent
            d&apos;exister, et on écrit ce qu&apos;on apprend, y compris quand
            on s&apos;est trompé.
          </p>
        </div>

        <div className={styles.piedCol}>
          <h2>La société</h2>
          <ul>
            <li><Link href="/realisations">Réalisations</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/savoir-faire">Comment on travaille</Link></li>
            <li><Link href="/about">À propos</Link></li>
          </ul>
        </div>

        <div className={styles.piedCol}>
          <h2>Les idées</h2>
          <ul>
            <li><Link href="/explore">Explorer</Link></li>
            <li><Link href="/join">Rejoindre Kogia</Link></li>
            <li><Link href="/login">Se connecter</Link></li>
          </ul>
        </div>

        <div className={styles.piedCol}>
          <h2>Nous joindre</h2>
          <ul>
            <li><a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a></li>
            <li><a href="https://edu.kogiagroup.com">Démo Coreon EDU</a></li>
            <li><Link href="/terms">Conditions</Link></li>
            <li><Link href="/privacy">Confidentialité</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.piedBas}>
        <p>
          © 2026 KogiaGroup · <a href="https://kogiagroup.com">kogiagroup.com</a> ·
          Les commentaires publiés sur ce site sont publics. Retrait ou
          question : <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>
        </p>
      </div>
    </footer>
  );
}
