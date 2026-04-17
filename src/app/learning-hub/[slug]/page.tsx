import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Container from "@/components/Container";
import LearningDetail from "@/features/learning/LearningDetail";
import { learningItems } from "@/data/learning";

export function generateStaticParams() {
  return learningItems.map((item) => ({ slug: item.slug }));
}

export default async function LearningDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = learningItems.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <Section style={{ background: "var(--background)" }}>
      <Container>
        <Link
          href="/learning-hub"
          className="inline-flex items-center gap-1 text-sm font-medium transition-colors mb-10"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Learning Hub
        </Link>
        <LearningDetail item={item} />
      </Container>
    </Section>
  );
}
