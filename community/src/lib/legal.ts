/**
 * Version unique des documents légaux.
 *
 * `user_consents.document_version` enregistre ce que la personne a réellement
 * accepté. Tant que la date vivait en dur dans les pages /terms et /privacy,
 * rien n'empêchait d'enregistrer une version que la page n'affichait pas :
 * un registre de consentements qui ment est pire que pas de registre.
 * Les deux pages et l'écriture du consentement lisent donc la même valeur.
 *
 * En changeant ces documents : mettre à jour les deux constantes ensemble.
 * Les consentements déjà enregistrés gardent leur ancienne version, ce qui
 * est le comportement voulu (ils sont un historique, jamais réécrits).
 */
export const VERSION_DOCUMENTS = "2026-08-18";
export const DATE_DOCUMENTS_HUMAINE = "18 août 2026";
