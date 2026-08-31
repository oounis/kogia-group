import type { Metadata } from "next";
import Link from "next/link";
import Marque from "@/components/Marque";
import styles from "../legal/legal.module.css";
import { DATE_DOCUMENTS_HUMAINE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Les règles d'usage de Kogia : ce que vous pouvez publier, ce qui appartient à qui, et ce que le service garantit ou non.",
};

/**
 * Page publique, accessible sans compte : le formulaire d'inscription demande
 * de l'accepter, elle doit donc être lisible AVANT de créer un compte.
 *
 * Écrite en langage clair et sur ce que le service fait réellement. Pas de
 * clause recopiée qui promettrait des garanties inexistantes ou décrirait des
 * fonctionnalités absentes (paiements, abonnements…).
 */
export default function TermsPage() {
  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Marque />
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/explore">Explorer</Link>
            <Link href="/about">À propos</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.titre}>Conditions d&apos;utilisation</h1>
        <p className={styles.maj}>Dernière mise à jour : {DATE_DOCUMENTS_HUMAINE}</p>

        <p className={styles.lede}>
          Kogia est un service édité par KogiaGroup. En créant un compte, vous
          acceptez ces conditions. Elles sont écrites pour être lues, pas pour
          être survolées.
        </p>

        <h2>Le service</h2>
        <p>
          Kogia publie des idées explorées sérieusement et permet d&apos;en
          discuter. La lecture est publique et ne demande pas de compte. Un
          compte sert à participer : réagir, commenter, suivre des sujets, et
          publier si vous en avez l&apos;autorisation.
        </p>
        <p>
          Le service est jeune et évolue. Des fonctionnalités peuvent apparaître,
          changer ou disparaître. Nous ne promettons pas une disponibilité
          ininterrompue.
        </p>

        <h2>Votre compte</h2>
        <ul>
          <li>Vous devez avoir au moins 16 ans.</li>
          <li>
            La connexion se fait par un code envoyé à votre adresse e-mail :
            gardez l&apos;accès à cette boîte, c&apos;est elle qui protège votre
            compte.
          </li>
          <li>Un compte est personnel. Ne le partagez pas.</li>
          <li>Vous pouvez le supprimer quand vous voulez.</li>
        </ul>

        <h2>Ce que vous publiez</h2>
        <p>
          <strong>Vous gardez la propriété de ce que vous écrivez.</strong> Nous
          ne revendiquons aucun droit de propriété sur vos textes. Vous nous
          accordez seulement l&apos;autorisation technique de les stocker et de
          les afficher sur le service, ce qui est nécessaire pour les publier.
          Cette autorisation cesse si vous les retirez, sauf pour les copies de
          sauvegarde le temps de leur rotation normale.
        </p>
        <p>Vous vous engagez à ne pas publier :</p>
        <ul>
          <li>du contenu illégal, haineux, ou qui harcèle une personne</li>
          <li>du contenu qui ne vous appartient pas, sans droit de le publier</li>
          <li>des données personnelles d&apos;autrui sans son accord</li>
          <li>du spam, de la promotion déguisée ou du contenu automatisé en masse</li>
          <li>du code ou des liens destinés à nuire aux autres personnes ou au service</li>
        </ul>

        <h2>Modération</h2>
        <p>
          Nous pouvons masquer ou supprimer un contenu, et suspendre un compte,
          en cas de manquement à ces règles. Quand c&apos;est possible, nous
          expliquons pourquoi. Si vous pensez que c&apos;est une erreur, écrivez
          à <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a> , 
          une personne lira.
        </p>

        <h2>Gratuité</h2>
        <p>
          Le service est aujourd&apos;hui gratuit. Il n&apos;y a ni paiement, ni
          abonnement, ni publicité. Si cela changeait un jour, ce ne serait pas
          rétroactif et vous seriez prévenu avant.
        </p>

        <h2>Garanties et responsabilité</h2>
        <p>
          Le service est fourni « en l&apos;état ». Nous faisons de notre mieux
          pour qu&apos;il fonctionne et pour protéger vos données, mais nous ne
          garantissons ni l&apos;absence d&apos;interruption, ni l&apos;absence
          d&apos;erreur, ni que le contenu publié par d&apos;autres personnes
          soit exact. Les opinions publiées appartiennent à leurs auteurs et
          n&apos;engagent pas KogiaGroup.
        </p>
        <p>
          Conservez une copie de ce à quoi vous tenez : vous pouvez demander
          l&apos;export de vos données à tout moment.
        </p>

        <h2>Fin</h2>
        <p>
          Vous pouvez arrêter d&apos;utiliser le service quand vous voulez. Nous
          pouvons clore un compte en cas de manquement grave ou répété, ou si le
          service s&apos;arrête, dans ce dernier cas, avec un préavis
          raisonnable et la possibilité d&apos;exporter vos contenus.
        </p>

        <h2>Modifications</h2>
        <p>
          Si ces conditions changent de façon significative, la date en haut de
          page est mise à jour et les personnes ayant un compte sont informées.
        </p>

        <h2>Contact</h2>
        <p>
          KogiaGroup · <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>
        </p>
      </main>

      <footer className={styles.pied}>
        <p>
          <Link href="/privacy">Politique de confidentialité</Link> · © 2026 KogiaGroup
        </p>
      </footer>
    </>
  );
}
