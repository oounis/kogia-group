/**
 * LE JOURNAL — ce qui s'est réellement passé, à la date où c'est arrivé.
 *
 * Ce n'est pas une rubrique « actualités » : il n'y a pas de communiqué, pas
 * d'annonce de partenariat, pas de « nous sommes ravis de ». Chaque entrée est
 * un fait daté, tiré d'un commit, d'un audit ou d'une observation en
 * production, et beaucoup racontent une erreur. C'est délibéré : le registre
 * des pannes d'une maison de logiciel en dit plus long sur elle que sa liste
 * de succès.
 *
 * RÈGLE : pas d'entrée sans date vérifiable et sans trace. Si on ne sait pas
 * dire d'où vient l'information, elle n'entre pas.
 */

export type Rubrique =
  | "Production"
  | "Plateforme"
  | "Produit"
  | "Sécurité"
  | "Design"
  | "Société";

/** Les rubriques, avec la teinte d'état qui leur convient. « Sécurité » n'est
 *  pas rouge : ces entrées racontent des défauts fermés, pas des incidents
 *  ouverts. */
export const RUBRIQUES: Rubrique[] = [
  "Production",
  "Plateforme",
  "Produit",
  "Sécurité",
  "Design",
  "Société",
];

export type Entree = {
  date: string;          // ISO, la date réelle du fait
  rubrique: Rubrique;
  projet: string | null; // le nom du projet concerné, s'il y en a un
  titre: string;
  texte: string;
  /** Le fait mesuré, quand il y en a un. Affiché comme une ligne à part. */
  chiffre?: string;
};

export const JOURNAL: Entree[] = [
  {
    date: "2026-09-01",
    rubrique: "Plateforme",
    projet: "La plateforme",
    titre: "Une console d'exploitation pour le serveur, et son premier faux positif",
    texte:
      "Le serveur a désormais une très petite console pour voir son état sans ouvrir de session à distance. Elle a crié au loup dès son premier jour : son contrôle des erreurs comptait des lignes de journal parfaitement normales. Corrigé le jour même, ce qui est la bonne nouvelle et la seule qui compte, parce qu'une alerte à laquelle on cesse de croire ne protège plus rien.",
  },
  {
    date: "2026-09-01",
    rubrique: "Produit",
    projet: "Kogia Kids",
    titre: "La progression du CP au CM2 est écrite en entier",
    texte:
      "Six niveaux de progression posés bout à bout, et le premier cahier des charges rédigé complètement plutôt qu'esquissé. Le catalogue est généré depuis cette progression : ajouter une fiche ne demande plus de tenir une liste à la main quelque part.",
  },
  {
    date: "2026-08-31",
    rubrique: "Société",
    projet: null,
    titre: "Seize dépôts qui ne contenaient aucun code ont été archivés",
    texte:
      "La société portait douze produits d'une suite de gestion d'entreprise, plus quatre autres dépôts. Créés le même jour de juillet, trois fichiers et zéro fichier de code chacun, pas touchés depuis six semaines. Ils sont archivés, pas supprimés : les quarante-sept documents de réflexion qu'ils contenaient sont conservés mot pour mot. À leur place, une décision : ce sera un seul produit, le socle financier, et seulement quand un client le demandera et le paiera. Douze chantiers ouverts ne sont pas une ambition, c'est douze occasions de ne rien finir.",
    chiffre: "16 dépôts archivés · 47 documents conservés · 0 ligne de code perdue",
  },
  {
    date: "2026-08-31",
    rubrique: "Design",
    projet: "kogiagroup.com",
    titre: "La page d'accueil dit ce qui est vrai plutôt que ce qu'on espérait",
    texte:
      "Relevé avant d'écrire une ligne : le site promettait « une idée par semaine » au-dessus d'un seul article publié, la page d'exploration montrait un élément puis du blanc sur les deux tiers de sa hauteur, la page « à propos » listait trois produits sur cinq, et la seule preuve réelle de la maison, un logiciel utilisé chaque jour par une école, n'apparaissait nulle part. La refonte n'a rien ajouté : elle a retiré la promesse, écrit un état honnête à côté de chaque produit, assumé la page presque vide, et mis la preuve sur la vitrine.",
    chiffre: "1 article pour une promesse hebdomadaire · 3 produits affichés sur 5",
  },
  {
    date: "2026-08-31",
    rubrique: "Produit",
    projet: "Kogia Kids",
    titre: "Les cinq premières fiches sont téléchargeables, après sept défauts fermés",
    texte:
      "Les fiches ont été vérifiées une par une sur le PDF rendu, pas jugées à l'œil : espacement et couverture d'encre mesurés, et une direction de lecture qui était inversée. Sept défauts corrigés, et la porte de qualité rendue mordante. Elle rejetait jusque-là des rendus corrects, ce qui est pire que pas de porte du tout : une porte qui se trompe apprend à l'équipe à la contourner.",
  },
  {
    date: "2026-08-31",
    rubrique: "Produit",
    projet: "Kogia Kids",
    titre: "La méthode de l'institutrice devient le cadre du produit",
    texte:
      "Amani, institutrice et autrice du projet, a envoyé son cadre pédagogique complet. Il remplace ce que le dépôt avait inventé de son côté, et il est meilleur : sept étapes que chaque fiche parcourt dans l'ordre, une échelle de progression en cinq paliers nommés pour un enfant, et trois matières au lieu de cinq catégories qui confondaient un sujet et ce qu'on en fait. Transcrit mot pour mot dans le code, pour qu'aucune reformulation ne s'y glisse.",
  },
  {
    date: "2026-08-30",
    rubrique: "Plateforme",
    projet: "La plateforme",
    titre: "Un serveur vide devient une plateforme qui héberge plusieurs applications",
    texte:
      "Un routeur d'entrée avec un certificat générique pour tout le domaine, une seule grappe PostgreSQL avec une base et un rôle par application et aucun port ouvert sur l'hôte, et une commande unique pour ajouter la prochaine application sans modifier un seul fichier partagé. Quatre pièges ont coûté du temps réel avant que ça tienne, dont un routeur qui voyait zéro conteneur et renvoyait des erreurs partout alors que les applications étaient parfaitement en bonne santé : deux versions d'API incompatibles, et aucun message pour le dire.",
    chiffre: "2 applications en service · 1 commande pour ajouter la suivante",
  },
  {
    date: "2026-08-30",
    rubrique: "Plateforme",
    projet: "La plateforme",
    titre: "Les sauvegardes sont prouvées par une vraie restauration, pas par un journal vert",
    texte:
      "La sauvegarde nocturne refuse de se déclarer réussie avant d'avoir restauré son propre plus gros export dans une base jetable et comparé le nombre de tables. L'exercice complet a été joué : copies locales supprimées, archive rapatriée du stockage distant, déchiffrée, restaurée, dix-huit tables comparées à la production. Il a trouvé un défaut qu'aucune relecture n'aurait vu, le script de restauration portait sa propre copie d'un client réseau et avait donc manqué le correctif posé la veille : l'envoi marchait, la restauration mourait.",
    chiffre: "18 tables retrouvées sur 18 · sauvegarde à 03:15 UTC, chiffrée avant de sortir",
  },
  {
    date: "2026-08-30",
    rubrique: "Sécurité",
    projet: "Le registre scolaire",
    titre: "Une page de connexion de production publiait sept comptes de démonstration",
    texte:
      "Trouvé au moment de la mise en service, avant qu'un utilisateur réel n'y touche. La page livrait des béquilles de développement : l'adresse d'un vrai administrateur pré-remplie, un mot de passe pré-rempli qui faisait donc échouer toutes les premières tentatives, et un bloc dépliant listant sept comptes et leur mot de passe commun. Tout est conditionné à l'environnement depuis. Cette classe de défaut est désormais cherchée sur chaque application avant sa mise en service.",
  },
  {
    date: "2026-08-30",
    rubrique: "Production",
    projet: "Le registre scolaire",
    titre: "Un déploiement sans coupure, prouvé en comptant",
    texte:
      "Cent cinquante requêtes envoyées pendant un déploiement complet du service, cent cinquante réponses correctes. Le déploiement enchaîne récupération, construction, migration de la base, bascule progressive et vérification. Sans le comptage, « sans coupure » n'est qu'une intention.",
    chiffre: "150 requêtes sur 150 servies pendant la bascule",
  },
  {
    date: "2026-08-30",
    rubrique: "Production",
    projet: "Le registre scolaire",
    titre: "Un service parfaitement en bonne santé et parfaitement inutilisable",
    texte:
      "Le déploiement était vert et la base répondait, mais elle était vide : aucun compte, donc personne ne pouvait entrer. Un contrôle de santé qui interroge la base ne dit rien de ce qu'elle contient. La mise en service comprend désormais une connexion réelle, jouée en navigateur, avant qu'on annonce quoi que ce soit comme fait.",
  },
  {
    date: "2026-08-28",
    rubrique: "Produit",
    projet: "ClampWars",
    titre: "Reconstruit simple : neuf règles, et un robot qu'on peut regarder jouer",
    texte:
      "La version précédente a été supprimée plutôt que rapiécée. Neuf règles, un plateau plus petit, et un adversaire dont on peut suivre chaque décision coup par coup, parce qu'un robot qu'on ne peut pas observer ne peut pas être réglé. Les niveaux ont ensuite été confirmés sur vingt parties.",
  },
  {
    date: "2026-08-27",
    rubrique: "Produit",
    projet: "ClampWars",
    titre: "Un biais de générateur aléatoire avait invalidé toutes les mesures d'équilibre",
    texte:
      "Le premier tirage du générateur utilisé était suffisamment corrélé à sa graine pour que le même camp l'emporte douze fois sur douze. Aucune erreur, aucune alerte, et tous les chiffres d'équilibre pris jusque-là ne voulaient rien dire. Le générateur a été remplacé et les mesures reprises depuis zéro.",
    chiffre: "12 parties sur 12 gagnées par le même camp, sans que rien ne le signale",
  },
  {
    date: "2026-08-27",
    rubrique: "Produit",
    projet: "ClampWars",
    titre: "Un objectif de territoire fait tomber les matches nuls de 100 % à zéro",
    texte:
      "À un certain niveau, toutes les parties finissaient par un match nul : la monnaie du jeu ne s'obtenait qu'en capturant, donc aucune capture voulait dire aucune monnaie, donc aucune capture. Deux versions de la correction ont échoué avant la bonne, l'une en finissant les parties en deux tours, l'autre en créant une case tout simplement imprenable. La leçon garde de la valeur au-delà du jeu : c'est l'objectif qui doit fabriquer les situations dont la règle a besoin.",
    chiffre: "100 % de matches nuls avant · 0 % après",
  },
  {
    date: "2026-08-27",
    rubrique: "Produit",
    projet: "kogiagroup.com",
    titre: "L'inscription menée à terme, et cinq défauts prouvés fermés",
    texte:
      "Le parcours d'inscription a été joué en entier par un test automatique, jusqu'au compte réellement créé, pas jusqu'au formulaire soumis. Cinq défauts en sont sortis, dont un code de vérification à huit chiffres là où le service en envoie six : personne ne pouvait terminer son inscription, et rien n'était en erreur.",
  },
  {
    date: "2026-08-22",
    rubrique: "Design",
    projet: "Kogia Coffee",
    titre: "La boutique branche le système de design au lieu de le recopier",
    texte:
      "Les couleurs et la typographie de la boutique étaient des copies à la main de celles de la maison, avec la dérive que cela suppose : deux teintes presque identiques, jamais tout à fait les mêmes. La boutique consomme désormais les jetons générés depuis la source unique.",
  },
  {
    date: "2026-08-21",
    rubrique: "Design",
    projet: null,
    titre: "Une seule langue de design pour toute la maison",
    texte:
      "Un produit Kogia se reconnaît à sa teinte, jamais à un design différent : chaque produit possède une famille de couleur, et tout le reste, typographie, espacement, rayons, mouvement, composants, est identique. Les fichiers de couleurs des produits sont générés depuis une source unique, plus recopiés. La règle qui va avec est écrite dans le fichier lui-même : ne jamais écrire une valeur hexadécimale dans un fichier de produit.",
    chiffre: "78 jetons de design, une seule source",
  },
  {
    date: "2026-08-21",
    rubrique: "Sécurité",
    projet: "Coreon EDU",
    titre: "Trente alertes d'analyse statique ramenées à zéro, et un vrai défaut au passage",
    texte:
      "L'analyse statique a été branchée sur la branche principale de Coreon EDU et a levé trente alertes ouvertes, dont des injections dans les journaux et des contournements d'autorisation pilotables par l'utilisateur. Toutes traitées. Le même passage a sorti un défaut réel : le générateur de traductions corrompait silencieusement tous les textes contenant un antislash.",
    chiffre: "30 alertes ouvertes → 0",
  },
  {
    date: "2026-08-21",
    rubrique: "Produit",
    projet: "Coreon EDU",
    titre: "Coreon EDU envoie enfin ses plantages ailleurs que dans le vide",
    texte:
      "Jusque-là, une erreur chez un utilisateur ne laissait aucune trace exploitable : il fallait qu'il la raconte. Les plantages de l'application web partent maintenant vers un service de suivi, avec des traces lisibles.",
  },
  {
    date: "2026-08-20",
    rubrique: "Plateforme",
    projet: null,
    titre: "Avant ce jour, rien n'était sauvegardé nulle part",
    texte:
      "Découvert en traitant une échéance de suppression automatique sur une base gratuite. Cinq bases de données, dont les données réelles d'une école, sans une seule copie ailleurs. Un script unique les couvre désormais toutes, avec restauration réellement jouée pour vérification, et une exécution quotidienne. Trois pièges ont été rencontrés avant que ça marche, dont un contrôle de disponibilité qui validait un conteneur mort : la première version affichait une coche verte sur une restauration vide.",
    chiffre: "5 bases · 0 sauvegarde avant le 20 août",
  },
  {
    date: "2026-08-17",
    rubrique: "Plateforme",
    projet: "kogiagroup.com",
    titre: "Le domaine change de propriétaire technique, et la mesure d'audience disparaît sans bruit",
    texte:
      "Le site a quitté un hébergement de pages statiques. Le transfert a emporté le mouchard d'audience sans que personne ne le remarque, et le site n'a donc mesuré aucune visite pendant une journée entière, précisément au moment où le trafic des réseaux sociaux arrivait. Restauré. Une bascule d'hébergement ne casse pas seulement ce qu'on regarde.",
  },
  {
    date: "2026-08-13",
    rubrique: "Société",
    projet: "kogiagroup.com",
    titre: "Cinq articles factices supprimés, un vrai article publié",
    texte:
      "Le site portait cinq articles de remplissage pour ne pas paraître vide. Ils ont été supprimés le jour où le premier vrai article de fond a été publié : quatorze minutes de lecture sur le Kharbga, le jeu de stratégie nord-africain, et sur ce qu'il faut trancher pour le numériser sans effacer ses variantes régionales. Une page qui a l'air vide est plus honnête qu'une page remplie de rien.",
  },
  {
    date: "2026-08-12",
    rubrique: "Société",
    projet: null,
    titre: "Kogia se met à publier ce qu'elle apprend",
    texte:
      "La décision, prise en connaissance de ses limites : construire des produits en silence pendant des mois ne fait grandir aucune marque quand on travaille seul. Kogia publie donc les idées qu'elle explore sérieusement, problème, marché, risques et verdict honnête compris, tout en continuant à construire. Une idée est publiée quand elle mérite d'être lue, pas pour tenir un calendrier.",
  },
  {
    date: "2026-08-09",
    rubrique: "Produit",
    projet: "Faz3a",
    titre: "Faz3a est déployé de bout en bout",
    texte:
      "Interface, API, base de données géographique et envoi de photos par lien signé, chacun vérifié en fonctionnement le même jour. Chaque lien d'envoi est attaché à une seule mission, pour qu'une photo de preuve ne puisse pas être déplacée d'un signalement vers un autre.",
  },
  {
    date: "2026-07-21",
    rubrique: "Produit",
    projet: "Fixéo",
    titre: "Le produit s'appelle Fixéo, et le concept est affûté en cinq mouvements",
    texte:
      "Le nom précédent entrait en collision avec une marque tunisienne existante. Au-delà du nom, le plan a été resserré : lancer dense sur le Grand Tunis et quatre catégories fréquentes plutôt que large sur vingt-quatre gouvernorats, décrire son besoin à la voix, faire de la vérification d'identité le produit lui-même, et monétiser par abonnement professionnel parce qu'une commission sur du paiement en espèces ne se collecte pas.",
  },
  {
    date: "2026-07-16",
    rubrique: "Produit",
    projet: "Kogia Coffee",
    titre: "Huit mélanges sur onze étaient en vente sans aucune formule écrite",
    texte:
      "Le passage à l'écrit des recettes a produit un livre complet, en grammes, et sorti trois erreurs qui étaient en rayon : un mélange en poudre dont la fiche annonçait un ingrédient liquide, un produit vendu comme café qui n'en contient pas une trace, et une fiche qui omettait deux ingrédients réellement présents. Aucune tasse n'a été goûtée pour les trouver.",
    chiffre: "8 recettes sur 11 non écrites · 3 erreurs trouvées en les écrivant",
  },
  {
    date: "2026-06-18",
    rubrique: "Société",
    projet: "Kharbga",
    titre: "Premier commit",
    texte:
      "Le premier code de la maison n'était ni un produit d'entreprise, ni un site : c'était une tentative de numériser un jeu de stratégie qu'on joue dans le sable en Afrique du Nord. Il est aujourd'hui volontairement arrêté, avec un inventaire écrit des seize règles que les sources ne tranchent pas, parce que les deviner produirait un jeu qui n'est plus le Kharbga de personne.",
  },
];

/** Le journal, du plus récent au plus ancien. Le tri est calculé, pas
 *  supposé : une entrée ajoutée au mauvais endroit du tableau se replace
 *  toute seule. */
export function journalTrie(): Entree[] {
  return [...JOURNAL].sort((a, b) => b.date.localeCompare(a.date));
}

export function dernieres(n: number): Entree[] {
  return journalTrie().slice(0, n);
}

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Une date lisible, sans dépendance et sans surprise de fuseau : la chaîne
 *  ISO est découpée, jamais passée à `new Date()`, qui interpréterait
 *  « 2026-08-30 » en UTC puis l'afficherait la veille pour un lecteur à
 *  l'ouest de Greenwich. */
export function dateLisible(iso: string): string {
  const [a, m, j] = iso.split("-").map(Number);
  if (!a || !m || !j) return iso;
  return `${j} ${MOIS[m - 1]} ${a}`;
}

export function annee(iso: string): string {
  return iso.slice(0, 4);
}
