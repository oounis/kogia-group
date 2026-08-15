import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PlaceholderPage
      titre={`Sujet : ${slug}`}
      description="La page de sujet arrive avec la table topics et les articles réels qui s'y rattachent."
    />
  );
}
