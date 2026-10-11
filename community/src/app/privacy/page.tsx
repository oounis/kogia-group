import type { Metadata } from "next";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "../legal/legal.module.css";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Les données liées à la visite du site KogiaGroup, à la mesure d'audience et aux demandes de contact.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <EnTete actif={undefined} />
      <main className={styles.main}>
        <h1 className={styles.titre}>Politique de confidentialité</h1>
        <p className={styles.maj}>Dernière mise à jour : 15 septembre 2026</p>
        <p className={styles.lede}>
          Cette page concerne le site de présentation kogiagroup.com, édité par
          KogiaGroup. Les produits accessibles depuis ce site présentent leurs
          propres informations sur le traitement des données.
        </p>
        <h2>Visiter le site</h2>
        <p>
          Les pages de présentation sont accessibles sans compte. Le site actuel
          ne propose ni inscription, ni publication de commentaires, ni paiement.
          Les services techniques qui transmettent les pages reçoivent les
          informations nécessaires à la connexion, notamment l&apos;adresse IP
          et les informations de requête du navigateur. Des journaux techniques
          servent à diagnostiquer les erreurs et à protéger le service.
        </p>
        <h2>Mesure d&apos;audience</h2>
        <p>
          Le site utilise Cloudflare Web Analytics pour mesurer la fréquentation
          et les performances des pages. Cette mesure est distincte des messages
          que vous nous adressez. Pour connaître le fonctionnement de ce service,
          consultez la{" "}
          <a href="https://developers.cloudflare.com/web-analytics/about/">
            présentation de Cloudflare Web Analytics
          </a>.
        </p>
        <h2>Nous contacter</h2>
        <p>
          Les liens de contact ouvrent votre application de messagerie. Si vous
          envoyez un message, nous recevons votre adresse e-mail et les informations
          que vous choisissez de nous communiquer pour répondre à votre demande.
          Évitez d&apos;inclure des données personnelles d&apos;élèves dans une
          demande générale ou une demande de démonstration.
        </p>
        <h2>Hébergement et services techniques</h2>
        <p>
          Le site est hébergé sur une infrastructure Contabo. Cloudflare fournit
          des services techniques liés au domaine et à la mesure d&apos;audience.
          Les échanges par e-mail passent par les services de messagerie de
          l&apos;expéditeur et du destinataire.
        </p>
        <h2>Anciens comptes et contenus communautaires</h2>
        <p>
          Une version précédente de Kogia proposait des comptes et des discussions.
          Ces fonctions ne sont plus disponibles sur le site actuel. Leur retrait
          du site ne constitue pas une confirmation de suppression des données
          historiques. Pour une demande concernant un ancien compte ou contenu,
          écrivez à{" "}
          <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>.
          Nous vérifierons les données concernées pour répondre à votre demande.
        </p>
        <h2>Conservation et demandes relatives aux données</h2>
        <p>
          Pour connaître les données conservées à votre sujet et leur durée de
          conservation, ou demander leur consultation, correction, export ou
          suppression, contactez{" "}
          <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>.
          Indiquez si votre demande concerne une visite, un échange par e-mail ou
          un ancien compte, afin que nous puissions retrouver les éléments utiles.
        </p>
        <h2>Changements</h2>
        <p>
          La date ci-dessus indique la dernière mise à jour de cette page.
          Les nouvelles fonctions qui modifient le traitement des données doivent
          être accompagnées d&apos;une mise à jour de ces informations.
        </p>
      </main>
      <Pied />
    </>
  );
}
