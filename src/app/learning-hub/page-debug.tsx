"use client";

import { useState } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import LearningCard from "@/features/learning/LearningCard";
import PageHero from "@/components/PageHero";
import { learningItems, categories } from "@/data/learning";
import { FadeIn, FadeInStagger } from "@/components/Animations";
import { Search } from "lucide-react";

export default function LearningHubPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? learningItems : learningItems.filter((i) => i.category === active);

  return (
    <>
      <PageHero
        subtitle="Knowledge Repository"
        title={<>Study <span style={{ color: "var(--accent)" }}>Smarter</span>, Not Harder</>}
        description="Structured content across Financial Accounting, Audit, Tax, Compliance, and AML/KYC — built around real concepts, worked examples, and practice questions."
      />

      <Section style={{ background: "var(--background)" }}>
        <Container>
          {/* Category Filter */}
          <FadeIn className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 border ${
                  active === cat 
                    ? "bg-(--accent) text-white border-(--accent)" 
                    : "bg-(--card) text-(--muted) border-(--card-border) hover:border-(--accent)"
                }`}
              >
                {cat}
              </button>
            ))}
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <LearningCard key={item.slug} item={item} />
            ))}
          </FadeInStagger>

          {filtered.length === 0 && (
            <FadeIn className="text-center py-24 rounded-3xl border border-dashed" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--surface-2)" }}>
                <Search style={{ color: "var(--muted)" }} />
              </div>
              <p className="text-lg" style={{ color: "var(--muted-2)" }}>No topics found for this category yet.</p>
            </FadeIn>
          )}
        </Container>
      </Section>
    </>
  );
}
