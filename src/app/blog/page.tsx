import { Metadata } from "next";
import Section from "@/components/Section";
import Container from "@/components/Container";
import BlogCard from "@/features/blog/BlogCard";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/data/blog";
import { FadeInStagger } from "@/components/Animations";

export const metadata: Metadata = {
  title: "Blog | Insights on Finance & Governance",
  description: "Thought leadership and analysis on the evolving landscape of global financial governance, compliance strategies, and ethical leadership.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        subtitle="The Exchange"
        title={<>Perspectives on <span style={{ color: "var(--accent)" }}>Finance & Leadership</span></>}
        description="Thought leadership on finance, compliance, and governance — written for professionals who want to think more clearly and act more decisively."
      />

      <Section style={{ background: "var(--surface)" }}>
        <Container>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </FadeInStagger>
        </Container>
      </Section>
    </>
  );
}
