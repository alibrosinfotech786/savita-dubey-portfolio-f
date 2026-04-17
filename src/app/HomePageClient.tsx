"use client";

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
import { FadeIn, FadeInStagger, RevealLine, CountUp } from "@/components/Animations";
import { ArrowRight, Trophy, Users, BookOpen, ShieldCheck, ChevronDown } from "lucide-react";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Global Institutions" },
  { value: 500, suffix: "+", label: "Professionals Trained" },
];

export default function HomePageClient() {
  const featuredLearning = learningItems.slice(0, 3);
  const featuredBlogs = blogPosts.slice(0, 3);

  return (
    <>
      {/* -- Hero -- */}
      <Section className="relative flex items-center min-h-[70vh] pt-20" role="banner" style={{ background: "var(--hero-bg)", color: "var(--hero-text)" }}>
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000" 
            alt="Savita Dubey - Finance & Compliance Expert Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 z-10" style={{ background: "var(--hero-overlay)" }} />
        </div>

        <Container className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
          <div className="flex flex-col items-start text-left gap-6">
            <FadeIn>
              <span
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ background: "var(--hero-badge-bg)", border: "1px solid var(--hero-badge-border)", color: "var(--accent)" }}
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Finance
                </div>
                <div className="w-1 h-1 rounded-full bg-current opacity-30" />
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} /> Compliance
                </div>
                <div className="w-1 h-1 rounded-full bg-current opacity-30" />
                <div className="flex items-center gap-1.5">
                  <Users size={14} /> Leadership
                </div>
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Savita Dubey <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl opacity-90">INSEAD Master in <span className="italic">Finance</span> | Compliance Leader</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-md md:text-lg max-w-xl leading-relaxed" style={{ color: "var(--hero-muted)" }}>
                Chartered Accountant and INSEAD alumna with 15+ years of experience at KPMG and JPMorgan Chase. Expert in corporate advisory, AML/KYC training, and audit methodology.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap gap-4 mt-4">
              <Button href="/learning-hub">
                Explore Learning Hub <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button href="/services" variant="outline">
                View Services
              </Button>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="hidden lg:block relative h-150 w-full">
             <div className="relative h-full w-full rounded-2xl overflow-hidden border border-(--hero-badge-border) shadow-2xl">
               <Image 
                src="https://plus.unsplash.com/premium_photo-1686244745026-98fc15ad3400?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHByb2Zlc3Npb25hbHN8ZW58MHx8MHx8fDA%3D" 
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

        <FadeIn delay={0.8} className="absolute bottom-8 left-12 flex flex-col items-start gap-2 cursor-pointer z-30" viewport={{ once: true }}>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="flex flex-col items-start gap-2 transition-opacity hover:opacity-70 group"
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
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-serif font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
                      <CountUp value={s.value} suffix={s.suffix} />
                    </span>
                  </div>
                  <p className="max-w-30 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-tight" style={{ color: "var(--muted)" }}>{s.label}</p>
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
                <p className="text-lg" style={{ color: "var(--muted)" }}>
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
                    <p className="leading-relaxed text-sm" style={{ color: "var(--muted)" }}>Deep institutional knowledge from JPMorgan and KPMG applied to your compliance frameworks.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--accent-light)" }}>
                    <BookOpen className="text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Education</h4>
                    <p className="leading-relaxed text-sm" style={{ color: "var(--muted)" }}>CA and INSEAD background utilized to simplify and articulate complex financial concepts.</p>
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
              <ServiceCard key={s.id} service={s} />
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
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
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
                <div className="space-y-6 text-lg leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
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
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>Latest analysis on global markets and regulatory trends.</p>
            </FadeIn>
          </div>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </FadeInStagger>
        </Container>
      </Section>
    </>
  );
}

