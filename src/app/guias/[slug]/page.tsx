import { vault } from "@/content";
import { ArticleTemplate } from "@/templates";
type P = { params: Promise<{ slug: string }> };
export default async function Page({ params }: P) {
  const { slug } = await params;
  const note = vault[slug];
  return <ArticleTemplate title="Guia lorem ipsum" note={note} crumbs={[{ label: "Aprender", href: "/aprender" }, { label: note?.title ?? "Guia", href: `/guias/${slug}` }]} />;
}
