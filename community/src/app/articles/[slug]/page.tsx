import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

/**
 * Cette route deviendra le rendu serveur des articles publiés, indexable,
 * avec métadonnées Open Graph propres — une fois la table `articles`
 * connectée à un vrai projet Supabase. Voir docs/STATUS.md.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PlaceholderPage
      titre="Cet article arrive ici"
      description={`La route /articles/${slug} rendra les articles publiés côté serveur, indexables par Google. L'unique article publié aujourd'hui reste sur kogiagroup.com le temps que le pipeline de contenu soit branché.`}
    />
  );
}
