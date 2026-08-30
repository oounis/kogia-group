/* Sonde de santé.
 *
 * Traefik et Docker interrogent cette route pour décider si ce conteneur
 * doit recevoir du trafic. Elle reste volontairement locale : elle répond
 * « ce processus Next répond », sans appeler Supabase. Un incident Supabase
 * ne doit pas faire retirer les quatre répliques de la rotation et rendre
 * le site totalement injoignable alors qu'il peut encore servir ses pages
 * statiques.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", service: "kogiagroup-site" });
}
