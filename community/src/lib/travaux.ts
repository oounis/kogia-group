import type { NomIcone } from "@/components/icons/Icone";

/**
 * LE CATALOGUE DES TRAVAUX — la seule source de vérité du site sur ce que
 * Kogia a construit.
 *
 * Avant ce fichier, la liste des produits était recopiée à la main dans
 * `page.tsx` ET dans `about/page.tsx`, avec des états qui ne concordaient
 * déjà plus : la page d'accueil annonçait « Kharbga · en construction »
 * pendant que « À propos » lui donnait une adresse publique. Deux copies
 * d'une même liste, c'est une liste qui devient fausse.
 *
 * RÈGLE D'ÉCRITURE, non négociable : chaque chiffre de ce fichier a été
 * mesuré, pas estimé. Les `chiffres` viennent d'un comptage réel (git,
 * `wc -l`, un audit daté, une observation en navigateur) et la source est
 * nommée dans `preuve`. Un chiffre qu'on ne sait pas prouver ne se met pas
 * sur la vitrine d'une société : c'est précisément ce qui a discrédité la
 * version précédente de cette page, qui promettait « une idée par semaine »
 * au-dessus d'un seul article.
 */

/** L'état réel, et le seul vocabulaire autorisé pour le dire.
 *
 *  `production` est réservé à du logiciel utilisé par des gens qui ne
 *  travaillent pas ici. Une démo publique n'est pas une production, et
 *  c'était l'erreur de l'ancienne page d'accueil : Coreon EDU y était
 *  annoncé « en production » alors que son propre audit du 2 août écrit que
 *  l'application déployée est locale au navigateur et que le serveur n'est
 *  déployé nulle part. */
export type Etat =
  | "production"   // des gens de l'extérieur s'en servent
  | "demo"         // publiquement accessible, mais ce n'est pas encore un service
  | "chantier"     // du code qui tourne, pas encore montrable
  | "pause"        // vivant, volontairement arrêté
  | "prepare";     // écrit et décidé, pas encore construit

export const LIBELLE_ETAT: Record<Etat, string> = {
  production: "En production",
  demo: "Démo publique en ligne",
  chantier: "En construction",
  pause: "En pause assumée",
  prepare: "Écrit, pas construit",
};

/** Les mêmes états, en version courte, pour la pastille de la page
 *  d'accueil. Elle a une largeur fixe, choisie pour que les noms de produit
 *  s'alignent au même retrait : trois libellés de trois longueurs
 *  différentes poussaient chaque nom à un retrait différent, ce qui se lit
 *  comme de la négligence. « Démo publique en ligne » ne tenait pas dedans
 *  et recouvrait le nom du produit — constaté en capture à 1440 px. */
export const LIBELLE_ETAT_COURT: Record<Etat, string> = {
  production: "En production",
  demo: "Démo en ligne",
  chantier: "En construction",
  pause: "En pause",
  prepare: "Écrit",
};

export type Chiffre = { valeur: string; libelle: string };

export type Travail = {
  slug: string;
  nom: string;
  /** Une phrase. Ce que c'est, pas ce que ça deviendra. */
  baseline: string;
  domaine: string;
  icone: NomIcone;
  etat: Etat;
  /** Là où on peut le voir, quand on peut le voir. */
  href: string | null;
  hrefLibelle?: string;
  /** Premier commit du dépôt, au format ISO. */
  depuis: string;
  pile: string[];
  chiffres: Chiffre[];
  /** D'où viennent les chiffres. Affiché sur la page du projet. */
  preuve: string;
  /** Le problème, avant la solution. */
  probleme: string;
  /** Ce qui existe et fonctionne, point par point. */
  construit: string[];
  /** Les décisions techniques qui méritent d'être racontées. */
  comment: { titre: string; texte: string }[];
  /** L'état honnête, y compris ce qui manque. */
  ou: string;
  /** Ce que le projet a appris et qui sert ailleurs. */
  appris: string;
};

/* Compté le 2026-09-02 sur les dépôts locaux :
   `git rev-list --count --all` et `wc -l` sur les fichiers suivis
   (.ts .tsx .js .jsx .py .css .sql .prisma .sh .mjs), hors node_modules,
   .next et fichiers de verrou. */
export const TRAVAUX: Travail[] = [
  {
    slug: "coreon-edu",
    nom: "Coreon EDU",
    baseline:
      "Toute la vie d'un établissement scolaire dans un seul logiciel : élèves, classes, présence, notes, finances, cantine.",
    domaine: "Éducation",
    icone: "education",
    etat: "demo",
    href: "https://edu.kogiagroup.com",
    hrefLibelle: "Entrer dans la démo",
    depuis: "2026-06-25",
    pile: ["React 19", "Vite", "Tailwind 4", "Expo / React Native", "Node", "Turso"],
    chiffres: [
      { valeur: "41 800", libelle: "lignes de code" },
      { valeur: "52", libelle: "écrans métier" },
      { valeur: "55", libelle: "modules de domaine" },
      { valeur: "4 569", libelle: "traductions arabe et anglais" },
      { valeur: "132", libelle: "tests qui passent" },
      { valeur: "58/100", libelle: "note de maturité, la nôtre" },
    ],
    preuve:
      "Audit interne du 2 août 2026 sur le commit 786a6e8 (docs/COREON_STATUS.md), plus le comptage git du 2 septembre 2026. La note de 58/100 est notre propre verdict, pas un compliment.",
    probleme:
      "Un établissement scolaire fait tourner sa journée sur des cahiers, des groupes WhatsApp et un tableur que personne n'ose ouvrir. Les logiciels qui existent sont vendus à la direction et subis par les enseignants : il faut douze clics pour noter une absence, et rien n'est en arabe.",
    construit: [
      "Six portails, un par rôle : direction, enseignant, parent, élève, comptabilité, vie scolaire. Chacun ne voit que ce qui le concerne, et les permissions sont un module unique et testé, pas des conditions dispersées dans les écrans.",
      "Un cœur métier de 55 modules en JavaScript pur, sans une seule dépendance et sans une seule API navigateur. Le web et le mobile l'importent tel quel : une règle de calcul de moyenne n'existe qu'à un seul endroit.",
      "Une application mobile native de 22 écrans sur ce même cœur, pour que l'appel se fasse au téléphone, debout, en classe.",
      "L'arabe et l'anglais complets : 2 385 et 2 184 entrées de traduction, avec un affichage de droite à gauche vérifié écran par écran.",
      "L'évaluation d'une classe entière conçue pour tenir en trente secondes, parce que c'est le geste que l'enseignant répète le plus souvent.",
    ],
    comment: [
      {
        titre: "Une constitution écrite avant le code",
        texte:
          "Le dépôt porte un fichier ARCHITECTURE-BIBLE.md qui dit ce qui est non négociable, et un dossier docs/history/ qui garde les architectures décidées puis abandonnées, chacune avec un bandeau « ne jamais suivre ». Garder les mauvaises décisions visibles coûte moins cher que de les redécouvrir.",
      },
      {
        titre: "Trente alertes de sécurité ramenées à zéro",
        texte:
          "L'analyse statique CodeQL a été branchée sur la branche principale et a levé trente alertes. Elles sont toutes traitées, et le passage en a sorti un vrai défaut au passage. Le générateur de traductions corrompait aussi silencieusement les textes contenant un antislash : trouvé, corrigé, testé.",
      },
      {
        titre: "Un audit qui se met une mauvaise note",
        texte:
          "L'audit interne conclut « excellente ingénierie, plateforme inachevée » et chiffre la maturité à 58/100. Le motif est nommé : ce qui est déployé est une application locale au navigateur, le serveur est écrit et testé mais n'est déployé nulle part, et il est mono-établissement par conception. Ce n'est pas un défaut de qualité, c'est un choix d'architecture qui reste à faire.",
      },
    ],
    ou: "La démo est publique et complète : on entre dans n'importe quel portail d'un clic et la première visite simule une journée de classe. Mais c'est une démo, pas un service : l'école vit dans le navigateur. Passer de là à un vrai logiciel multi-établissements demande de déployer le serveur et de sortir du modèle « un processus, une école ». Ce travail n'est pas commencé, et il ne le sera pas avant qu'une école le demande et le paie.",
    appris:
      "Un cœur métier sans dépendances est ce qui a rendu le mobile possible en quelques semaines au lieu de quelques mois. C'est devenu une règle de la maison : la logique ne connaît ni le réseau, ni l'écran.",
  },
  {
    slug: "registre-scolaire",
    nom: "Le registre scolaire",
    baseline:
      "Le seul logiciel construit ici dont se servent, tous les jours, des gens qui ne travaillent pas ici.",
    domaine: "Éducation",
    icone: "proof",
    etat: "production",
    href: null,
    depuis: "2026-08-30",
    pile: ["Next.js", "PostgreSQL 16", "Prisma", "Docker", "Traefik"],
    chiffres: [
      { valeur: "323", libelle: "élèves" },
      { valeur: "10", libelle: "classes" },
      { valeur: "7", libelle: "périodes par journée" },
      { valeur: "150/150", libelle: "requêtes servies pendant un déploiement" },
    ],
    preuve:
      "Chiffres relevés dans la base de production le 30 août 2026 après mise en service, et connexion vérifiée en navigateur. L'école n'est pas nommée et aucune donnée d'élève ne quitte le serveur.",
    probleme:
      "Une école tenait sa présence sur papier. Chaque absence devait être ressaisie, chaque total recalculé, et personne ne pouvait répondre à « combien de fois cet élève a-t-il manqué le cours de mardi ? » sans reprendre le cahier.",
    construit: [
      "La présence prise par période, pas par journée : sept créneaux dans la journée scolaire, parce que manquer la première heure et manquer la journée ne sont pas la même information.",
      "Une interface en arabe, de droite à gauche, sur téléphone, utilisée par les enseignants debout dans leur classe.",
      "Trois cent vingt-trois élèves et dix classes en service, avec les droits d'accès posés par personne et par classe.",
      "Un déploiement sans coupure, prouvé en comptant : cent cinquante requêtes envoyées pendant un déploiement complet, cent cinquante réponses correctes.",
    ],
    comment: [
      {
        titre: "Le défaut qui a fait échouer la première connexion",
        texte:
          "La page de connexion de production livrait des béquilles de développement : l'adresse d'un vrai administrateur pré-remplie, un mot de passe pré-rempli qui faisait donc toujours échouer la première tentative, et un bloc dépliant qui publiait sept comptes de démonstration et leur mot de passe commun. Tout est désormais conditionné à l'environnement. Cette classe de défaut est vérifiée sur chaque application avant qu'un vrai utilisateur y touche.",
      },
      {
        titre: "Une base vide passe tous les contrôles de santé",
        texte:
          "Le déploiement était vert, la base répondait, et pourtant personne ne pouvait se connecter : il n'y avait aucun compte. Un service en bonne santé qui ne sert à rien reste un service en panne. Depuis, la mise en service comprend une connexion réelle, jouée en navigateur, avant d'annoncer quoi que ce soit.",
      },
    ],
    ou: "En service. C'est la preuve que la société met en avant, et volontairement la plus sobre de cette page : l'école n'est pas nommée, aucun nom d'enfant n'apparaît nulle part, et le produit appartient à son commanditaire, pas à Kogia.",
    appris:
      "« Vert en développement n'est pas une preuve. » La phrase est devenue une règle interne, et elle vient d'ici.",
  },
  {
    slug: "kogia-kids",
    nom: "Kogia Kids",
    baseline:
      "Des fiches à imprimer pour les 3-12 ans, gratuites, sans compte, en arabe et en français, écrites par une institutrice.",
    domaine: "Éducation",
    icone: "pearl",
    etat: "chantier",
    href: null,
    depuis: "2026-08-30",
    pile: ["Next 16", "React 19", "Tailwind 4", "Chromium headless", "PDF"],
    chiffres: [
      { valeur: "8 800", libelle: "lignes de code en trois jours" },
      { valeur: "50", libelle: "fiches écrites pour les 3-5 ans" },
      { valeur: "7", libelle: "étapes de la méthode" },
      { valeur: "5", libelle: "paliers de profondeur" },
    ],
    preuve:
      "Comptage git du 2 septembre 2026 sur un dépôt ouvert le 30 août 2026. Les fiches sont vérifiées une par une : espacement et encre mesurés sur le PDF rendu, pas jugés à l'œil.",
    probleme:
      "Un parent qui cherche un exercice pour son enfant tombe sur des sites qui exigent un compte, arrosent la page de publicités et proposent un tas de fiches sans ordre. Personne ne lui dit par quoi commencer, ni pourquoi.",
    construit: [
      "Un moteur de fiches qui rend un PDF par Chromium : ce que le parent imprime est exactement ce qui a été dessiné, au millimètre, sans surprise de pilote d'impression.",
      "La méthode pédagogique complète d'Amani, institutrice et autrice du projet, transcrite mot pour mot dans le code : sept étapes que chaque fiche parcourt dans l'ordre, quel que soit le sujet.",
      "Une échelle de progression en cinq paliers, nommés pour un enfant et pas pour un bulletin : je remarque, j'essaie, je réfléchis, je résous, je comprends.",
      "Trois matières, trois personnages, chacun avec sa raison d'être : l'arabe, les mathématiques, les sciences.",
      "Cinquante fiches écrites pour la tranche 3-5 ans, et un catalogue généré depuis la progression plutôt que tenu à la main.",
    ],
    comment: [
      {
        titre: "La contrainte réglementaire qui a décidé du design",
        texte:
          "Un contenu jugé destiné aux enfants ne peut pas porter de publicité personnalisée, et la publicité non personnalisée rapporte beaucoup moins. Le test du régulateur pèse notamment les personnages animés et les activités destinées aux enfants. La résolution est une règle de design, pas un avis juridique : le site est un outil pour adultes, le monde est pour les enfants et vit sur le papier imprimé. Aucun jeu, aucun compte enfant, aucun point à gagner. Tout ce qui s'adresse à l'enfant est dans le PDF, qui est hors ligne et ne porte aucune publicité.",
      },
      {
        titre: "Une porte de qualité qu'un rendu correct ne peut pas franchir est pire que pas de porte",
        texte:
          "Le contrôle automatique des fiches a d'abord rejeté des rendus parfaitement corrects, pour une tolérance écrite trop serrée. Une porte qui crie au loup se contourne, puis se désactive, puis ne protège plus rien. Elle a été refaite sur des mesures réelles : espacement et couverture d'encre relevés sur le PDF, avec des seuils tirés des fiches validées.",
      },
    ],
    ou: "Les cinq premières fiches sont finies et téléchargeables, la progression du CP au CM2 est écrite, et cinquante fiches attendent leur mise en forme. Le site n'est pas encore public : il attend son nom de domaine et la validation d'Amani, qui est l'autrice et pas une relectrice.",
    appris:
      "Un contrôle automatique doit être calibré sur des cas connus bons avant d'être branché, sinon il enseigne à l'équipe à l'ignorer.",
  },
  {
    slug: "la-plateforme",
    nom: "La plateforme",
    baseline:
      "Un seul serveur qui héberge plusieurs applications, avec des sauvegardes dont la restauration est réellement vérifiée chaque nuit.",
    domaine: "Infrastructure",
    icone: "platform",
    etat: "production",
    href: null,
    depuis: "2026-08-29",
    pile: ["Debian", "Docker", "Traefik v3", "PostgreSQL 16", "Cloudflare R2", "gpg"],
    chiffres: [
      { valeur: "2", libelle: "applications en service" },
      { valeur: "18/18", libelle: "tables retrouvées après restauration réelle" },
      { valeur: "03:15", libelle: "sauvegarde quotidienne, en UTC" },
      { valeur: "1", libelle: "commande pour ajouter une application" },
    ],
    preuve:
      "Exercice de restauration joué en entier le 30 août 2026 : copies locales supprimées, archive rapatriée depuis le stockage distant, déchiffrée, restaurée dans une base neuve, dix-huit tables comparées à la production.",
    probleme:
      "Six applications hébergées chez quatre fournisseurs différents, dont un a suspendu tout le compte pour une facture et mis sept services hors ligne d'un coup. Et, jusqu'au 20 août, rien n'était sauvegardé nulle part.",
    construit: [
      "Un routeur d'entrée unique avec un certificat générique pour tout le domaine : ajouter un service ne demande plus de demander, ni d'attendre, un certificat.",
      "Une seule grappe PostgreSQL, une base et un rôle par application, et aucun port ouvert sur l'hôte : les applications se parlent sur un réseau interne qui n'existe pas depuis l'extérieur.",
      "Une sauvegarde nocturne qui refuse de se déclarer réussie avant d'avoir restauré son propre plus gros export dans une base jetable et comparé le nombre de tables.",
      "Les archives chiffrées en AES256 avant de partir hors du serveur, avec un jeton d'accès restreint à ce seul dépôt et à cette seule adresse IP.",
      "Une commande unique pour ajouter la septième application : aucun fichier partagé n'est modifié, et le certificat couvre déjà le nouveau nom.",
    ],
    comment: [
      {
        titre: "Un filtre d'adresse IP qui fonctionnait trop bien",
        texte:
          "Le jeton de sauvegarde était restreint à l'adresse du serveur, et l'envoi échouait avec un refus sec. Le serveur a aussi une sortie IPv6, et la bibliothèque résolvait l'adresse v6 en premier : le filtre marchait parfaitement, il ne voyait simplement jamais l'adresse autorisée. Le client réseau est désormais épinglé en IPv4.",
      },
      {
        titre: "Le script de restauration avait manqué le correctif",
        texte:
          "Le correctif précédent avait été posé dans le client d'envoi. Le script de restauration, lui, portait sa propre copie du client et n'en a rien su : l'envoi marchait, la restauration mourait sur un refus. Seul un exercice de restauration réel pouvait le trouver. Il n'y a plus qu'un client, et la restauration l'appelle.",
      },
      {
        titre: "Un script qui se met à jour pendant qu'il tourne",
        texte:
          "Le script de déploiement met à jour l'arbre depuis lequel il s'exécute. Bash lit un script par morceaux, donc la première exécution corrigée a silencieusement joué l'ancienne logique. Il se relance maintenant lui-même quand la mise à jour l'a modifié.",
      },
    ],
    ou: "En service, avec deux applications dessus et de la place pour beaucoup d'autres. Le second serveur n'est pas acheté, donc il n'y a pas de bascule automatique en cas de panne de la machine : c'est un choix de coût, assumé, pas un oubli.",
    appris:
      "Une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde, c'est une intention. Et un exercice de restauration trouve des défauts qu'aucune relecture ne trouve.",
  },
  {
    slug: "faz3a",
    nom: "Faz3a",
    baseline:
      "L'action citoyenne de quartier : signaler ce qui est cassé, prouver ce qui est réparé, et suivre qui s'en occupe.",
    domaine: "Civique",
    icone: "civic-action",
    etat: "pause",
    href: null,
    depuis: "2026-08-08",
    pile: ["Expo / React Native", "MapLibre", "Node", "PostgreSQL + PostGIS", "Cloudflare R2"],
    chiffres: [
      { valeur: "8 000", libelle: "lignes de code" },
      { valeur: "9", libelle: "colonnes géographiques" },
      { valeur: "6 305 m", libelle: "distance que la restauration doit retrouver" },
    ],
    preuve:
      "Déploiement de bout en bout daté du 9 août 2026 : interface, API, base géographique et envoi de photos par lien signé, chacun vérifié en fonctionnement.",
    probleme:
      "Un lampadaire cassé, une fuite, une benne qui déborde : tout le monde le voit, personne ne sait à qui le dire, et rien ne dit jamais si ça a été réparé. Les groupes de quartier oublient plus vite qu'ils n'agissent.",
    construit: [
      "Un signalement porté par sa position réelle, avec une base de données géographique et non des coordonnées rangées dans du texte.",
      "L'envoi de photos par lien signé, chaque lien attaché à une seule mission, pour qu'une preuve ne puisse pas être déplacée d'un signalement à un autre.",
      "Une application Android construite en paquet installable, parce que les modules de carte natifs ne tournent pas dans un lanceur générique.",
      "Une vérification de restauration qui contrôle une véritable distance géographique, et pas seulement des lignes présentes : Tunis à Ariana doit faire 6 305 mètres après restauration, ou la sauvegarde est déclarée fausse.",
    ],
    comment: [
      {
        titre: "La valeur en danger était le schéma, pas les données",
        texte:
          "Sur les 8 518 lignes de la base, 8 500 sont des données de référence géographiques. La vraie valeur du projet, c'est la structure : neuf colonnes géographiques réparties sur huit tables. Une cible de migration qui ne sait pas faire de géographie ne peut donc jamais accueillir ce projet, quelle que soit sa taille apparente.",
      },
    ],
    ou: "En pause assumée. L'infrastructure est déployée et fonctionne, mais l'hébergement gratuit de sa base était programmé pour s'auto-supprimer et le projet n'a pas de premier utilisateur réel qui justifie de payer pour le garder chaud. Le code et le schéma sont sauvegardés ; le jour où une commune ou une association le demande, il redémarre.",
    appris:
      "Vérifier une restauration en comptant des lignes ne suffit pas quand le contenu a une géométrie. Un contrôle de sauvegarde doit interroger le sens des données, pas leur volume.",
  },
  {
    slug: "fixeo",
    nom: "Fixéo",
    baseline:
      "Une place de marché de services pour la Tunisie, où l'on décrit un besoin à la voix plutôt qu'au clavier.",
    domaine: "Marché",
    icone: "service",
    etat: "pause",
    href: null,
    depuis: "2026-07-10",
    pile: ["Expo / React Native", "JavaScript testé sans dépendances"],
    chiffres: [
      { valeur: "24", libelle: "gouvernorats couverts" },
      { valeur: "261", libelle: "délégations" },
      { valeur: "15", libelle: "catégories de service" },
      { valeur: "9", libelle: "écrans construits" },
    ],
    preuve:
      "Données administratives tunisiennes réelles embarquées dans le dépôt, et une logique métier testée hors de l'application : six tests exécutables sans lancer le mobile.",
    probleme:
      "Trouver quelqu'un pour un travail précis, en Tunisie, passe par le bouche-à-oreille et un groupe Facebook. Les places de marché existantes demandent de remplir un formulaire, ce que personne ne fait sur téléphone, et rien ne garantit qui se présentera à la porte.",
    construit: [
      "Une entrée du besoin par photo, vidéo et surtout note vocale, parce que la culture du message vocal est déjà là et qu'un formulaire ne sera pas rempli.",
      "Une catégorie et un prix proposés automatiquement, pour viser l'objectif que le client n'ait presque rien à taper.",
      "Un cœur de règles métier pur, sans une seule importation de l'interface, exécutable et testé par lui-même : prix proposé selon la durée, tri des offres, ordre de pertinence du fil.",
      "L'option d'un professionnel du même genre pour une intervention à domicile, décidée pour rendre le service utilisable par des femmes qui ne l'utiliseraient pas autrement.",
      "Les 24 gouvernorats et 261 délégations tunisiennes en données réelles, pas une liste de villes approximative.",
    ],
    comment: [
      {
        titre: "La confiance est le produit, pas une case à cocher",
        texte:
          "Une vérification d'identité humaine plutôt qu'automatique, des évaluations dans les deux sens, et la possibilité de partager une intervention avec un proche : ce ne sont pas des options de sécurité ajoutées après coup, c'est ce qui décide si quelqu'un ouvre sa porte à un inconnu.",
      },
      {
        titre: "Commencer dense plutôt que large",
        texte:
          "Le plan écrit ne lance pas 24 gouvernorats fois 15 catégories, mais le Grand Tunis et quatre catégories fréquentes. Une place de marché sans densité n'a pas de liquidité, et sans liquidité les deux côtés partent le même jour.",
      },
    ],
    ou: "Prototype fonctionnel, en pause assumée. Neuf écrans et le cœur de règles sont écrits et testés ; il manque le travail qu'aucun code ne remplace, c'est-à-dire aller chercher les premiers professionnels dans un quartier précis.",
    appris:
      "Écrire la logique métier sans dépendance à l'interface permet de la tester en une seconde en ligne de commande, alors qu'un test d'écran mobile prend des minutes et casse à chaque changement de mise en page.",
  },
  {
    slug: "clampwars",
    nom: "ClampWars",
    baseline:
      "Un jeu de stratégie original, où l'équilibre a été réglé par la mesure et pas par l'intuition.",
    domaine: "Jeux",
    icone: "compass",
    etat: "chantier",
    href: null,
    depuis: "2026-08-27",
    pile: ["JavaScript", "Canvas", "Python (serveur de développement)"],
    chiffres: [
      { valeur: "2 500", libelle: "lignes de code" },
      { valeur: "9", libelle: "règles, et pas une dixième" },
      { valeur: "100 % → 0 %", libelle: "matches nuls, avant et après" },
      { valeur: "20", libelle: "parties jouées pour valider les niveaux" },
    ],
    preuve:
      "Chaque changement d'équilibre est mesuré sur des séries de parties jouées par les robots, et la journalisation des séries est dans le dépôt.",
    probleme:
      "Un jeu de stratégie peut être élégant sur le papier et injouable en pratique. La première version se terminait par un match nul dans cent pour cent des parties d'un certain niveau, et personne ne l'aurait vu sans compter.",
    construit: [
      "Un plateau, neuf règles et un robot qu'on peut regarder jouer coup par coup pour comprendre pourquoi il décide ce qu'il décide.",
      "Un objectif de territoire au centre du plateau, qui force les deux camps à engager des pièces dans la même zone contestée.",
      "Une position bloquée tranchée sur le territoire, puis le matériel, puis les gains, plutôt que déclarée nulle par abandon.",
      "Une échelle de niveaux confirmée sur vingt parties, pas devinée.",
    ],
    comment: [
      {
        titre: "Un biais du générateur aléatoire avait invalidé toutes les mesures",
        texte:
          "Le générateur de nombres aléatoires utilisé donnait un premier tirage suffisamment corrélé à sa graine pour qu'un même camp l'emporte douze fois sur douze. Toutes les mesures d'équilibre prises avant cette découverte ne voulaient rien dire. C'est le genre de défaut qui ne casse rien, ne lève aucune alerte, et rend faux tout ce qu'on croit savoir.",
      },
      {
        titre: "L'objectif fabrique les cibles dont la règle a besoin",
        texte:
          "Deux versions de l'objectif central ont échoué avant la bonne : une qui comptait les points trop souvent finissait les parties en deux tours, une qui ne visait qu'une seule case rendait cette case imprenable, puisque les pièces amies du détenteur en remplissaient elles-mêmes les abords. Il fallait un objectif qui oblige à poser cinq pièces sur un terrain disputé.",
      },
    ],
    ou: "Jouable de bout en bout en local, contre un robot à plusieurs niveaux. L'interface est en anglais, par décision explicite. Ce n'est pas encore publié : il manque un hébergement et un vrai passage entre les mains de joueurs qui ne connaissent pas les règles.",
    appris:
      "Mesurer avant de régler. Et vérifier son générateur aléatoire avant de croire une seule statistique de jeu.",
  },
  {
    slug: "kharbga",
    nom: "Kharbga",
    baseline:
      "Le jeu de stratégie nord-africain, joué dans le sable depuis des générations, reconstruit pour l'écran.",
    domaine: "Jeux",
    icone: "compass",
    etat: "prepare",
    href: null,
    depuis: "2026-06-18",
    pile: ["JavaScript", "Canvas"],
    chiffres: [
      { valeur: "4 800", libelle: "lignes de code" },
      { valeur: "3×3", libelle: "taille résolue exactement" },
      { valeur: "16", libelle: "règles encore non tranchées" },
    ],
    preuve:
      "Le plateau n'est pas choisi, il est déduit : la présence de la case centrale impose un côté impair. Le cas 3×3 est résolu par énumération complète.",
    probleme:
      "Le Kharbga se joue avec des cailloux et des trous dans le sable, et il se joue différemment d'une région à l'autre. Le numériser oblige à trancher des règles que la tradition n'a jamais écrites, et trancher au hasard revient à effacer une variante.",
    construit: [
      "Les fondations mathématiques du plateau, déduites plutôt que décrétées, avec le cas le plus petit résolu exactement.",
      "Une version jouable, et les enseignements d'une série de parties d'essai.",
      "Un inventaire explicite des seize règles que les sources ne tranchent pas.",
    ],
    comment: [
      {
        titre: "Arrêter de coder tant que les règles ne sont pas décidées",
        texte:
          "Le dépôt porte un panneau d'arrêt : seize points de règle sont ouverts, et il est écrit noir sur blanc qu'il ne faut pas les deviner. Deviner produirait un jeu qui n'est plus le Kharbga de personne. Le travail suivant est une recherche, pas une fonctionnalité.",
      },
    ],
    ou: "Volontairement arrêté avant le code. Le premier vrai travail, c'est de documenter les variantes régionales auprès de gens qui y jouent, puis de décider ce que la version numérique retient et ce qu'elle propose en option. ClampWars a servi de terrain d'essai pour les mécaniques pendant ce temps.",
    appris:
      "Sur un sujet patrimonial, l'inventaire de ce qu'on ne sait pas vaut plus qu'un prototype rapide qui tranche à la légère.",
  },
  {
    slug: "kogia-coffee",
    nom: "Kogia Coffee",
    baseline:
      "Un atelier de café tunisien dont les recettes sont enfin écrites, en grammes, y compris celles qui n'existaient que dans la tête du torréfacteur.",
    domaine: "Commerce",
    icone: "revenue",
    etat: "chantier",
    href: null,
    depuis: "2026-06-22",
    pile: ["HTML", "CSS", "JavaScript", "Kogia Harmony"],
    chiffres: [
      { valeur: "11", libelle: "mélanges avec une formule écrite" },
      { valeur: "8 sur 11", libelle: "n'en avaient aucune" },
      { valeur: "3", libelle: "erreurs de recette trouvées à l'écrit" },
    ],
    preuve:
      "Livre des recettes en version 2, chaque mélange avec ses proportions en grammes et son procédé. Les erreurs listées ci-dessous ont été trouvées en mettant les recettes par écrit.",
    probleme:
      "Une gamme de onze mélanges vendue en ligne, dont huit n'avaient aucune formule écrite. Une recette qui vit dans une seule tête ne peut pas être reproduite, ni transmise, ni corrigée.",
    construit: [
      "Le livre des recettes : onze mélanges, proportions en grammes, procédé complet, torréfaction séparée par composant puis mouture commune et repos.",
      "Une gamme organisée en familles, avec une signature dont les ingrédients sont publics et les proportions secrètes.",
      "Une boutique refondue qui parle la même langue de design que le reste de la maison, au lieu d'en recopier les couleurs à la main.",
      "Une règle commerciale écrite : date de torréfaction sur chaque fiche, stock réel uniquement, et aucun faux avis.",
    ],
    comment: [
      {
        titre: "Mettre par écrit, c'est déjà auditer",
        texte:
          "Le passage à l'écrit a sorti trois erreurs qui étaient en vente : un mélange en poudre dont la fiche annonçait un ingrédient liquide, un produit vendu comme café qui n'en contient pas du tout, et une fiche qui omettait deux ingrédients réellement présents. Le premier est une erreur de recette, le deuxième une erreur de rayon, le troisième un problème de transparence envers le client.",
      },
    ],
    ou: "Les recettes et la gamme sont arrêtées, la boutique est refondue. Il manque la ligne de produits photographiée et les textes de vente pour chaque fiche. Ce n'est pas un logiciel, et c'est justement pour ça que le projet est là : la même discipline s'applique à un produit qu'on boit.",
    appris:
      "Écrire une chose qu'on croyait savoir est la façon la moins chère d'en trouver les défauts. Trois erreurs en vente ont été trouvées sans goûter une seule tasse.",
  },
  {
    slug: "kogiagroup-com",
    nom: "kogiagroup.com",
    baseline:
      /* Disait « une maison d'édition d'idées ». C'était vrai de la première
         version du site, et cela contredisait désormais son propre titre, qui
         annonce des logiciels en production. Une vitrine qui se décrit comme
         un éditeur d'idées dit au visiteur qu'il n'y a rien à acheter. */
      "La vitrine de la société : ce qui tourne en production, avec l'état réel de chaque projet.",
    domaine: "Site",
    icone: "community",
    etat: "production",
    href: "https://kogiagroup.com",
    hrefLibelle: "Vous y êtes",
    depuis: "2026-06-26",
    pile: ["Next 16", "React 19", "PostgreSQL (Supabase)", "Playwright", "Docker"],
    chiffres: [
      { valeur: "11 000", libelle: "lignes de code" },
      { valeur: "138", libelle: "changements publiés" },
      { valeur: "78", libelle: "jetons de design, générés depuis une seule source" },
      { valeur: "36", libelle: "routes construites" },
    ],
    preuve:
      "Comptage git et sortie de construction du 2 septembre 2026. Le chiffre de 100 sur les quatre axes Lighthouse appartient au site statique du 12 août 2026, pas à cette version-ci : il n'est donc pas affiché comme un résultat courant, et la page d'article illustrée retombait de toute façon à 96 en performance à cause de sa photographie.",
    probleme:
      "Le site d'une société qui construit du logiciel se contentait de promettre. Il annonçait « une idée par semaine » au-dessus d'un seul article, une page d'exploration remplie à trente pour cent, trois produits sur cinq, et la seule preuve qui compte, du logiciel utilisé par une vraie école, n'apparaissait nulle part.",
    construit: [
      "Une plateforme de lecture et de discussion : comptes, publication, sujets, commentaires et modération.",
      "Un système de design en jetons générés depuis une source unique, pour qu'aucune couleur ne soit écrite à la main dans une page.",
      "Les pages de vitrine que vous lisez : les réalisations, le journal, la façon de travailler.",
      "Des tests de bout en bout joués sur la version construite, et un contrôle de production après chaque publication.",
    ],
    comment: [
      {
        titre: "Une page qui dit ce qui est vrai plutôt que ce qu'on espérait",
        texte:
          "La refonte du 31 août n'a pas ajouté de fonctionnalité : elle a retiré une promesse hebdomadaire que personne ne tenait, écrit un état honnête à côté de chaque produit, assumé une page d'exploration presque vide, et mis enfin sur la vitrine la seule preuve réelle de la maison. Un état honnête vaut mieux qu'un catalogue flatteur.",
      },
      {
        titre: "Seize dépôts sans une ligne de code, archivés le même jour",
        texte:
          "La société portait douze produits d'une suite de gestion, plus quatre autres dépôts, créés le même jour et contenant trois fichiers et zéro code chacun. Quarante-sept documents de réflexion, tous bons, et seize endroits pour se sentir coupable. Tout a été archivé, rien supprimé, et la réflexion conservée mot pour mot. Il reste une décision à la place : ce sera un seul produit, quand un client le demandera et le paiera.",
      },
      {
        titre: "Un seul propriétaire par domaine",
        texte:
          "Le site a vécu sur un hébergement de pages statiques, puis sur un service géré qui a suspendu tout le compte, avant d'arriver sur la plateforme maison. Chaque déménagement a coûté une panne, et la dernière a été prise pour un défaut de code jusqu'à ce qu'on regarde la facture. Un seul endroit possède désormais le domaine.",
      },
    ],
    ou: "En service, et volontairement mince en contenu : un article de fond publié, pas cinq articles de remplissage. La question ouverte, non tranchée, est la langue : le site est en français, et l'arabe puis l'anglais n'arriveront que quand il y aura du contenu qui mérite d'être traduit.",
    appris:
      "Compter avant de réécrire. La refonte utile est venue d'un relevé, pas d'un avis : un article, trente pour cent de page remplie, trois produits sur cinq.",
  },
];

export function travailParSlug(slug: string): Travail | undefined {
  return TRAVAUX.find((t) => t.slug === slug);
}

/** Les chiffres de la maison, agrégés depuis les projets réels.
 *  Compté le 2026-09-02 : `git rev-list --count --all` sur les neuf dépôts
 *  qui portent du code, et `wc -l` sur les fichiers suivis. */
export const CHIFFRES_MAISON: Chiffre[] = [
  { valeur: "10", libelle: "projets menés" },
  { valeur: "647", libelle: "changements publiés" },
  { valeur: "82 500", libelle: "lignes de code écrites" },
  { valeur: "323", libelle: "élèves servis en production" },
];

/** Depuis quand. Premier commit, tous dépôts confondus. */
export const PREMIER_JOUR = "2026-06-18";
