import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { blogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <Section style={{ background: "var(--background)" }}>
      <Container>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors mb-10"
            style={{ color: "var(--accent)" }}
          >
            ← Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{ color: "var(--accent)", background: "var(--accent-light)" }}
            >
              {post.tag}
            </span>
            <span className="text-xs" style={{ color: "var(--muted-2)" }}>{post.date}</span>
            <span className="text-xs" style={{ color: "var(--muted-2)" }}>{post.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "var(--foreground)" }}>
            {post.title}
          </h1>

          <p className="text-lg leading-relaxed pb-8 mb-8" style={{ color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
            {post.description}
          </p>

          <div className="space-y-5">
            {paragraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h2 key={i} className="font-serif text-xl font-semibold mt-10 mb-2" style={{ color: "var(--foreground)" }}>
                    {para.replace(/\*\*/g, "")}
                  </h2>
                );
              }
              const formatted = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{ color: "var(--muted)" }}
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              );
            })}
          </div>

          <div className="mt-14 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-sm mb-1" style={{ color: "var(--muted-2)" }}>Written by</p>
            <p className="font-semibold" style={{ color: "var(--foreground)" }}>Savita Dubey</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>INSEAD MiF · Chartered Accountant · Finance. Compliance. Leadership.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
