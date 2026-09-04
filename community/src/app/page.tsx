import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Parcours from "@/components/Parcours";
import { createClient } from "@/lib/supabase/server";
import { dureeDeLecture } from "@/lib/site";
import { TRAVAUX, CHIFFRES_MAISON, LIBELLE_ETAT_COURT, type Etat } from "@/lib/travaux";
import { dernieres, dateLisible } from "@/lib/journal";
import styles from "./page.module.css";

/**
 * L'entrée de Kogia. Elle doit répondre à trois questions en quelques
 * secondes : qu'est-ce que cette société, qu'a-t-elle réellement construit,
 * et qu'est-ce qui s'est passé récemment.
 *
 * La liste des produits n'est plus écrite ici : elle vient de `lib/travaux`,
 * qui alimente aussi la page des réalisations et « À propos ». Les trois
 * copies précédentes ne s'accordaient déjà plus, et l'une annonçait Coreon
 * EDU « en production » alors que son propre audit écrit que l'application
 * déployée est locale au navigateur.
 */
const SLUG_VEDETTE = "kharbga-from-sand-to-screen";

/* Le temps de lecture était écrit en dur (« 14 min ») alors que la page
   d'article le calcule depuis le contenu et affiche 15 min : deux chiffres
   différents pour le même texte, visibles par n'importe quel lecteur.
   Une seule source de vérité désormais : le contenu. */
async function dureeVedette(): Promise<number | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles").select("body")
      .eq("slug", SLUG_VEDETTE).eq("status", "published").single();
    return data?.body ? dureeDeLecture(data.body) : null;
  } catch {
    return null;
  }
}

/* La pastille d'état de la page d'accueil. Quatre teintes : ce qui sert de
   vrais utilisateurs, ce qui est visible mais n'est pas un service, ce qui
   avance, ce qui est arrêté. La démo avait d'abord le vert de la production,
   ce qui est exactement la confusion que cette page vient corriger : une
   démo publique n'est pas une production. */
const TON: Record<Etat, string> = {
  production: styles.vit,
  demo: styles.demo,
  chantier: styles.chantier,
  pause: styles.prepare,
  prepare: styles.prepare,
};

/** Les six projets mis en avant : les deux en production, la démo, et les
 *  trois chantiers. Le reste est sur la page des réalisations, qui est là
 *  pour ça. */
const EN_AVANT = ["registre-scolaire", "la-plateforme", "coreon-edu", "kogia-kids", "clampwars", "kogiagroup-com"];

export default async function Home() {
  const minutes = await dureeVedette();
  const produits = EN_AVANT
    .map((s) => TRAVAUX.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const nouvelles = dernieres(4);

  return (
    <>
      <EnTete actif="/" />

      <main>
        {/* Le titre disait « On construit des logiciels. Et on écrit ce qu'on
            apprend. » C'était honnête, mais ça décrivait un atelier, pas une
            société : un visiteur ne pouvait pas savoir en cinq secondes si
            Kogia prend des clients, vend des plateformes, ou tient un carnet.
            Ce qui distingue Kogia n'est pas de construire des logiciels,
            c'est de montrer les preuves. Donc le titre dit ce qu'on fait, et
            les chiffres au-dessous le prouvent. */}
        <section className={styles.hero}>
          <h1>
            Des logiciels qui tournent en production, avec les preuves.
          </h1>
          <p>
            Kogia Group conçoit et exploite des plateformes métier, pour
            l&apos;éducation d&apos;abord. Pas des maquettes : un registre
            scolaire qui sert <strong>323 élèves</strong> chaque jour de
            classe, des sauvegardes dont la restauration est réellement
            rejouée, et l&apos;état exact de chaque projet écrit noir sur
            blanc, y compris quand il est à l&apos;arrêt.
          </p>
          <div className={styles.heroActions}>
            <Link href="/realisations" className="bouton accent">Nos plateformes</Link>
            <Link href="/savoir-faire" className="bouton ligne">Ce qu&apos;on sait faire</Link>
          </div>
        </section>

        {/* La bande de chiffres. Elle vient du même fichier que les projets,
            et la méthode de comptage est écrite sur la page des
            réalisations : un chiffre sans sa méthode n'est qu'une
            affirmation. */}
        <section className={`${styles.bande} entree-douce`} data-rang="2" aria-label="La société en chiffres">
          <div className={styles.bandeIn}>
            {CHIFFRES_MAISON.map((c) => (
              <div key={c.libelle} className={styles.bandeItem}>
                <span className={styles.bandeValeur}>{c.valeur}</span>
                <span className={styles.bandeLibelle}>{c.libelle}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ce qui tourne, avec un état honnête par ligne, et chaque ligne
            mène désormais à une vraie page de projet plutôt qu'à rien. */}
        <section id="ce-qui-tourne" className={`${styles.tourne} entree-douce`} data-rang="3">
          <div className={styles.sectionEntete}>
            <p className={styles.sectionT}>Ce qui tourne</p>
            <Link href="/realisations" className={styles.lienSection}>
              Les dix projets
            </Link>
          </div>
          <ul className={styles.produits}>
            {produits.map((p) => (
              <li key={p.slug} className={styles.produit}>
                <span className={`${styles.etat} ${TON[p.etat]}`}>
                  {LIBELLE_ETAT_COURT[p.etat]}
                </span>
                <div>
                  <h3>
                    <Link href={`/realisations/${p.slug}`}>{p.nom}</Link>
                  </h3>
                  <p>{p.baseline}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.preuve}>
            <strong>La preuve qui compte.</strong> Un registre scolaire
            construit ici sert aujourd&apos;hui une école de 323 élèves : dix
            classes, la présence prise par période, au téléphone par les
            enseignants, en arabe. C&apos;est le seul de ces projets dont se
            servent des gens qui ne travaillent pas ici, et c&apos;est écrit
            comme tel partout sur ce site.
          </p>
        </section>

        {/* Les dernières nouvelles. Le journal n'est pas une rubrique de
            communiqués : ce sont des faits datés, et plusieurs racontent une
            panne. Les montrer sur la page d'accueil est un choix. */}
        <section className={`${styles.nouvelles} entree-douce`} data-rang="4">
          <div className={styles.sectionEntete}>
            <p className={styles.sectionT}>Dernières nouvelles</p>
            <Link href="/journal" className={styles.lienSection}>
              Tout le journal
            </Link>
          </div>
          <ul className={styles.nouvellesListe}>
            {nouvelles.map((e) => (
              <li key={e.titre} className={styles.nouvelle}>
                <div className={styles.nouvelleHaut}>
                  <time className={styles.nouvelleDate} dateTime={e.date}>
                    {dateLisible(e.date)}
                  </time>
                  <span className={styles.nouvelleRubrique}>{e.rubrique}</span>
                  {e.projet && <span className={styles.nouvelleProjet}>{e.projet}</span>}
                </div>
                <Link href="/journal" className={styles.nouvelleTitre}>
                  {e.titre}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.vedette}>
          <p className={styles.sectionT}>Article vedette</p>
          <Link
            className={styles.vedetteCarte}
            href="/articles/kharbga-from-sand-to-screen"
          >
            <span className={styles.vedetteCat}>
              Technologie{minutes ? ` · ${minutes} min de lecture` : ""}
            </span>
            <h2>Du sable à l&apos;écran : le Kharbga peut-il devenir le grand jeu de stratégie numérique d&apos;Afrique du Nord ?</h2>
            <p>
              Un concept de projet Kogia Group : préserver un jeu vivant,
              respecter ses variantes régionales, et le reconstruire pour le
              mobile, le web et la compétition.
            </p>
          </Link>
        </section>

        <section className={styles.comment}>
          <p className={styles.sectionT}>Comment Kogia fonctionne</p>
          {/* C'etaient trois cartes cote a cote. Le texte etait juste mais la
              mise en page ne disait pas que les etapes se SUIVENT, ni que la
              plupart des idees s'arretent en route. Un schema le dit en une
              image, et prend moins de hauteur que trois cartes. */}
          <Parcours />
          <p className={styles.commentPlus}>
            La façon de travailler est écrite en entier, avec les huit règles
            de la maison et la panne qui a produit chacune :{" "}
            <Link href="/savoir-faire">comment on travaille</Link>.
          </p>
        </section>

        <section className={styles.cta}>
          <h2>Une idée, un projet, ou juste une remarque ?</h2>
          {/* La question demandait un mot et le bouton ouvrait un compte.
              Le bouton fait maintenant ce que la phrase promet ; s'inscrire
              reste offert en haut de page, pour qui le cherche. */}
          <div className={styles.ctaActions}>
            <a href="mailto:contact@kogiagroup.com" className="bouton accent">Écrire à Kogia</a>
            <Link href="/join" className="bouton ligne">Créer un compte</Link>
          </div>
        </section>
      </main>

      <Pied />
    </>
  );
}
