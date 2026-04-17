import { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import { FadeIn, FadeInStagger, CountUp } from "@/components/Animations";
import { GraduationCap, Briefcase, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Savita Dubey | Finance Expert & INSEAD Alumna",
  description: "Learn about Savita Dubey's professional journey. Chartered Accountant with 15+ years of experience across KPMG, JPMorgan Chase, and the INSEAD Master in Finance program.",
  keywords: ["Savita Dubey Biography", "Finance Consultant Profile", "INSEAD Alumna Finance", "Chartered Accountant Profile", "KPMG Senior Auditor", "JPMorgan Compliance Officer"],
  openGraph: {
    title: "About Savita Dubey | Experience & Vision",
    description: "Bridging academic theory with real-world financial practice.",
    images: ["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"],
  },
};

const experience = [
  {
    org: "INSEAD",
    role: "Master in Finance",
    period: "Graduate",
    desc: "Advanced finance education at one of the world's leading business schools, focusing on global financial markets, corporate finance, and valuation.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    org: "JPMorgan Chase",
    role: "Banking & Compliance",
    period: "Senior Experience",
    desc: "Gained deep expertise in financial reporting, governance, and regulatory frameworks within one of the world's largest investment banks.",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    org: "KPMG",
    role: "Audit & Assurance",
    period: "Career Foundation",
    desc: "Began professional journey in audit, developing a rigorous foundation in financial controls, compliance, and regulatory standards.",
    icon: <Award className="w-5 h-5" />,
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Global Institutions" },
  { value: 6, suffix: "", label: "Subject Areas" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        subtitle="The Professional Behind the Platform"
        title="Savita Dubey"
        description="Chartered Accountant · INSEAD Master in Finance · Educator · Compliance Specialist. A career built at the intersection of global markets, governance, and leadership."
      />

      {/* Stats Bar */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <Container>
          <div className="grid grid-cols-3 divide-x py-8" style={{ borderColor: "var(--border)" }}>
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "var(--accent)" }}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Introduction */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="rounded-3xl aspect-square flex items-center justify-center shadow-2xl relative overflow-hidden group border border-(--border)">
                <Image 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Savita Dubey - Professional Portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <p className="text-white font-serif text-lg italic">"Bridging academic theory with real-world practice."</p>
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                  <Heart size={14} /> Introduction
                </p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: "var(--foreground)" }}>
                  Two Decades at the <span style={{ color: "var(--accent)" }}>Forefront of Finance</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="space-y-5 text-lg leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
                  <p>
                    I am a Chartered Accountant and Master in Finance graduate from INSEAD, with more than 15 years of experience in audit, banking, and compliance.
                  </p>
                  <p>
                    I began my career at KPMG, building a rigorous foundation in financial controls and regulatory standards. I later worked with JPMorgan Chase, gaining deep expertise in financial reporting, governance, and regulatory frameworks at a global scale.
                  </p>
                  <p>
                    Today, I channel that experience into education and advisory — helping professionals and organisations navigate complexity with clarity and confidence.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="p-6 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Mission</p>
                  <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                    To simplify complex financial and regulatory concepts, empowering professionals to operate with absolute integrity and strategic clarity.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience Journey */}
      <Section style={{ background: "var(--surface)" }}>
        <Container>
          <FadeIn className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--foreground)" }}>A Journey of Excellence</h2>
            <div className="w-16 h-1 bg-(--accent) mx-auto rounded-full" />
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experience.map((exp) => (
              <div key={exp.org} className="bg-(--card) p-8 rounded-3xl border border-(--card-border) shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-(--accent-light) text-(--accent) flex items-center justify-center mb-6">
                  {exp.icon}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>{exp.period}</p>
                <h3 className="font-serif text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>{exp.org}</h3>
                <p className="text-sm font-semibold mb-6 opacity-60 uppercase">{exp.role}</p>
                <p className="leading-relaxed" style={{ color: "var(--muted)" }}>{exp.desc}</p>
              </div>
            ))}
          </FadeInStagger>
        </Container>
      </Section>
    </>
  );
}
