"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// SEO items usually go in a separate layout or page if it's a server component
// Since this is a Client Component, we rely on the Root Layout's metadata 
// but we can ensure internal content is semantically correct for SEO.
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import LearningCard from "@/features/learning/LearningCard";
import BlogCard from "@/features/blog/BlogCard";
import ServiceCard from "@/features/services/ServiceCard";
import { learningItems } from "@/data/learning";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { FadeIn, FadeInStagger, RevealLine, CountUp, staggerContainer } from "@/components/Animations";
import { ArrowRight, Trophy, Users, BookOpen, ShieldCheck, ChevronDown } from "lucide-react";
import { useBlogStore } from "@/store/blogStore";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Global Institutions" },
  { value: 500, suffix: "+", label: "Professionals Trained" },
];

export default function HomePageClient() {
  const { posts, loading, fetchPosts } = useBlogStore();

  useEffect(() => {
    fetchPosts(1, 3);
  }, [fetchPosts]);

  const featuredLearning = learningItems.slice(0, 3);
  
  // Create dummy fallback data if no posts exist in backend
  const dummyPosts = [
    {
      id: "dummy-1",
      title: "Sustainable Wealth Management in the Digital Age",
      excerpt: "Explore how modern compliance and digital tools are reshaping long-term investment strategies.",
      category: "Finance",
      cover_image: "/dummy/img1.png",
      created_at: new Date().toISOString(),
      slug: "dummy-1"
    },
    {
      id: "dummy-2",
      title: "The Future of Global Compliance Standards",
      excerpt: "A deep dive into upcoming regulatory changes and their impact on international banking.",
      category: "Compliance",
      cover_image: "/dummy/img2.png",
      created_at: new Date().toISOString(),
      slug: "dummy-2"
    },
    {
      id: "dummy-3",
      title: "Leadership in Times of Financial Turmoil",
      excerpt: "Key strategies for maintaining team morale and operational excellence during market shifts.",
      category: "Leadership",
      cover_image: "/dummy/img3.png",
      created_at: new Date().toISOString(),
      slug: "dummy-3"
    }
  ];

  const featuredBlogs = posts.length > 0 ? posts.slice(0, 3) : dummyPosts;

  return (
    <>
      {/* -- Hero -- */}
      <Section className="relative flex items-center min-h-[90vh] md:min-h-[80vh] lg:min-h-[70vh] pt-20 md:pt-28" role="banner" style={{ background: "var(--hero-bg)", color: "var(--hero-text)" }}>
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image 
            src="/savitadubey.jpeg" 
            alt="Savita Dubey - Finance & Compliance Expert Background"
            fill
            className="object-cover opacity-60 md:opacity-70"
            priority
          />
          <div className="absolute inset-0 z-10" style={{ background: "var(--hero-overlay)" }} />
        </div>

        <Container className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center py-10 md:py-20">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 md:gap-8">
            <FadeIn>
              <span
                className="inline-flex flex-wrap justify-center lg:justify-start items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ background: "var(--hero-badge-bg)", border: "1px solid var(--hero-badge-border)", color: "var(--accent)" }}
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Finance
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-current opacity-30" />
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} /> Compliance
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-current opacity-30" />
                <div className="flex items-center gap-1.5">
                  <Users size={14} /> Leadership
                </div>
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Savita Dubey <br className="hidden sm:block" />
                <span className="text-xl sm:text-3xl lg:text-4xl opacity-90 block mt-2">INSEAD Master in <span className="italic">Finance</span> | Compliance Leader</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mx-auto lg:mx-0" style={{ color: "var(--hero-muted)" }}>
                Chartered Accountant and INSEAD alumna with 15+ years of experience at KPMG and JPMorgan Chase. Expert in corporate advisory, AML/KYC training, and audit methodology.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-2 sm:mt-4 w-full sm:w-auto">
              <Button href="/learning-hub" className="w-full sm:w-auto justify-center px-6 py-3 text-sm">
                Explore Learning Hub <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button href="/services" variant="outline" className="w-full sm:w-auto justify-center px-6 py-3 text-sm border-blue-600/50 text-foreground hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300">
                View Services
              </Button>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="hidden lg:block relative lg:h-[500px] xl:h-[600px] w-full">
             <div className="relative h-full w-full rounded-2xl overflow-hidden border border-(--hero-badge-border) shadow-2xl">
               <Image 
                src="/savitadubey.jpeg" 
                alt="Savita Dubey - Professional Financial Leadership"
                fill
                className="object-cover"
               />
               <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
               <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-white/10 rounded-xl border border-white/10">
                 <p className="text-sm font-medium italic opacity-90 text-white">
                   &ldquo;To simplify complex concepts and empower individuals to succeed with clarity and confidence.&rdquo;
                 </p>
               </div>
             </div>
          </FadeIn>
        </Container>

        <FadeIn delay={0.8} className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 flex flex-col items-center lg:items-start gap-2 cursor-pointer z-30" viewport={{ once: true }}>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="flex flex-col items-center lg:items-start gap-2 transition-opacity hover:opacity-70 group"
            aria-label="Scroll to next section"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors" style={{ color: "var(--hero-muted)" }}>Discover more</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ChevronDown className="w-6 h-6 transition-colors" style={{ color: "var(--hero-muted)" }} />
            </motion.div>
          </button>
        </FadeIn>
      </Section>

      {/* -- Stats -- */}
      <Section className="py-12 border-y" style={{ background: "var(--surface)", borderColor: "var(--card-border)" }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1} className="flex items-center gap-6 justify-center md:justify-start group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110" style={{ background: "var(--accent)", color: "#fff" }}>
                  {i === 0 ? <Trophy size={24} /> : i === 1 ? <BookOpen size={24} /> : <Users size={24} />}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-serif font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
                      <CountUp value={s.value} suffix={s.suffix} />
                    </span>
                  </div>
                  <p className="max-w-30 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-tight text-muted-foreground " >{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* -- Training & Education (Learning Hub) -- */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <FadeIn>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--accent)" }}>
                  <BookOpen size={14} /> Learning Hub
                </p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: "var(--foreground)" }}>Educational Mastery</h2>
                <RevealLine className="h-1 w-16 mb-8 rounded-full" style={{ background: "var(--accent)" } as React.CSSProperties} />
                <p className="text-lg text-muted-foreground " >
                  Deep dives into finance, accounting, and compliance. Structured for professionals and students seeking absolute clarity.
                </p>
              </FadeIn>
            </div>
          </div>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredLearning.map((item) => (
              <LearningCard key={item.slug} item={item} />
            ))}
          </FadeInStagger>

          <FadeIn className="text-center">
            <Button href="/learning-hub" variant="outline" className="px-10">
              Browse Knowledge Repository
            </Button>
          </FadeIn>
        </Container>
      </Section>

      {/* -- Authority Section -- */}
      <Section className="py-0 overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center" style={{ color: "var(--foreground)" }}>
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight">Expertise forged in global institutions.</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--accent-light)" }}>
                    <ShieldCheck className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Corporate Governance</h4>
                    <p className="leading-relaxed text-sm text-muted-foreground " >Deep institutional knowledge from JPMorgan and KPMG applied to your compliance frameworks.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--accent-light)" }}>
                    <BookOpen className="text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Education</h4>
                    <p className="leading-relaxed text-sm text-muted-foreground " >CA and INSEAD background utilized to simplify and articulate complex financial concepts.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="relative min-h-100 lg:min-h-full bg-slate-800">
            <Image 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1500" 
              alt="Corporate background"
              fill
              className="object-cover opacity-60 grayscale"
            />
          </div>
        </div>
      </Section>

      {/* -- Services Preview -- */}
      <Section className="relative overflow-hidden" style={{ background: "var(--background)" }}>
        <Container>
          <FadeIn className="text-center mb-16">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
              <Trophy size={14} /> Services
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--foreground)" }}>Precision Advisory & Coaching</h2>
            <RevealLine className="mt-5 h-1 w-16 rounded-full mx-auto" style={{ background: "var(--accent)" } as React.CSSProperties} />
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </FadeInStagger>

          <FadeIn className="text-center mt-16">
            <Button href="/services" className="px-10">Explore all services</Button>
          </FadeIn>
        </Container>
      </Section>

      {/* -- About Preview -- */}
      <Section style={{ background: "var(--surface)" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="relative group">
              <div className="rounded-3xl aspect-4/5 flex items-center justify-center shadow-2xl overflow-hidden border border-(--border) relative bg-slate-200">
                <Image 
                  src="/savitadubey.jpeg" 
                  alt="Educational Leadership"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-(--accent) rounded-full border-8 border-(--surface) flex items-center justify-center animate-pulse">
                <span className="text-white font-serif text-3xl font-bold">15+</span>
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>About Savita</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: "var(--foreground)" }}>
                  Bridging the gap between <span style={{ color: "var(--accent)" }}>Theory & Practice.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="space-y-6 text-lg leading-relaxed mb-10 text-muted-foreground " >
                  <p>
                    With deep roots in audit (KPMG) and high-stakes banking (JPMorgan Chase), I have spent two decades navigating complex financial and regulatory environments.
                  </p>
                  <p>
                    Today, I leverage that experience along with my INSEAD Master in Finance to train, advise, and speak on the subjects that define modern finance.
                  </p>
                </div>
                <Button href="/about" variant="outline">Learn more about my journey</Button>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* -- Blog Preview -- */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Finance & Governance Insights</h2>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground " >Latest analysis on global markets and regulatory trends.</p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))
            ) : (
              featuredBlogs.map((post) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))
            )}
          </div>
          {featuredBlogs.length > 0 && (
            <FadeIn className="text-center mt-12">
              <Button href="/blog" variant="outline">View All Insights</Button>
            </FadeIn>
          )}
        </Container>
      </Section>
    </>
  );
}

