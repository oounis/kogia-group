import type { Metadata } from "next";
import Link from "next/link";
import Marque from "@/components/Marque";
import styles from "../legal/legal.module.css";
import { DATE_DOCUMENTS_HUMAINE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données Kogia collecte, pourquoi, combien de temps elles sont conservées, et comment les faire supprimer.",
};

/**
 * Page publique, volontairement accessible sans compte : le formulaire
 * d'inscription demande de l'accepter, elle doit donc être lisible AVANT de
 * créer un compte. /settings/privacy est un écran de réglages authentifié,
 * ce n'est pas un substitut.
 *
 * Écrite pour décrire ce que le produit fait RÉELLEMENT aujourd'hui, pas un
 * texte type recopié. Toute nouvelle collecte de données doit modifier cette
 * page dans le même changement.
 */
export default function PrivacyPage() {
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
        <h1 className={styles.titre}>Politique de confidentialité</h1>
        <p className={styles.maj}>Dernière mise à jour : {DATE_DOCUMENTS_HUMAINE}</p>

        <p className={styles.lede}>
          Kogia est édité par KogiaGroup, une entreprise individuelle fondée par
          Othman Ounis. Cette page décrit ce que le service collecte réellement
          aujourd&apos;hui. Elle est volontairement courte, parce que le service
          collecte peu.
        </p>

        <h2>Ce que nous collectons</h2>
        <p>
          <strong>Si vous n&apos;avez pas de compte :</strong> une mesure
          d&apos;audience sans cookie (Cloudflare Web Analytics), qui compte les
          pages vues sans vous identifier ni vous suivre d&apos;un site à
          l&apos;autre.
        </p>
        <p>
          <strong>Si vous créez un compte :</strong>
        </p>
        <ul>
          <li>votre adresse e-mail, pour vous connecter et vous écrire</li>
          <li>votre identifiant public, votre nom affiché et, si vous en mettez une, votre biographie</li>
          <li>les sujets que vous choisissez de suivre</li>
          <li>ce que vous publiez : articles, brouillons, commentaires, réactions</li>
          <li>des dates techniques (création du compte, dernière connexion)</li>
        </ul>
        <p>
          Nous ne demandons <strong>pas</strong> de mot de passe : la connexion
          se fait par un code à usage unique envoyé par e-mail. Nous ne stockons
          donc aucun mot de passe. Nous ne demandons ni votre vrai nom, ni votre
          adresse, ni votre téléphone, ni votre date de naissance.
        </p>

        <h2>Pourquoi</h2>
        <p>
          Uniquement pour faire fonctionner le service : vous authentifier,
          afficher ce que vous publiez, et vous prévenir de ce qui vous
          concerne. Nous ne faisons pas de publicité et nous ne construisons pas
          de profil publicitaire.
        </p>

        <h2>Ce que nous ne faisons pas</h2>
        <ul>
          <li>nous ne vendons ni ne louons vos données</li>
          <li>nous ne les transmettons à aucun courtier en données</li>
          <li>nous n&apos;utilisons pas de cookies publicitaires ni de pixels de suivi tiers</li>
          <li>nous ne lisons pas votre contenu pour cibler de la publicité</li>
        </ul>

        <h2>Qui héberge et traite les données</h2>
        <p>
          Le service s&apos;appuie sur des prestataires techniques, qui traitent
          des données pour notre compte : <strong>Supabase</strong> (comptes et
          base de données), <strong>Render</strong> (hébergement de
          l&apos;application), <strong>Cloudflare</strong> (domaine et mesure
          d&apos;audience). Les e-mails d&apos;authentification transitent par
          le fournisseur d&apos;envoi configuré sur le service.
        </p>

        <h2>Combien de temps</h2>
        <p>
          Tant que votre compte existe. Si vous le supprimez, votre compte et vos
          données personnelles sont effacés. Les contenus que vous avez publiés
          publiquement peuvent rester visibles de façon anonymisée si
          d&apos;autres personnes y ont répondu, afin de ne pas trouer des
          discussions existantes — dites-le nous si vous voulez qu&apos;ils
          soient retirés aussi.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander à consulter, corriger, exporter ou supprimer vos
          données, et vous opposer à un traitement. Écrivez à{" "}
          <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a> :
          c&apos;est une adresse relevée par une personne, pas un formulaire
          automatique. Nous répondons sous 30 jours au plus.
        </p>

        <h2>Âge</h2>
        <p>
          Le service n&apos;est pas destiné aux moins de 16 ans et nous ne
          collectons pas sciemment leurs données.
        </p>

        <h2>Changements</h2>
        <p>
          Si cette politique change de façon significative, la date en haut de
          page est mise à jour et les personnes ayant un compte en sont
          informées. Nous ne modifions pas discrètement ce texte pour élargir la
          collecte.
        </p>

        <h2>Contact</h2>
        <p>
          KogiaGroup · <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>
        </p>
      </main>

      <footer className={styles.pied}>
        <p>
          <Link href="/terms">Conditions d&apos;utilisation</Link> · © 2026 KogiaGroup
        </p>
      </footer>
    </>
  );
}
