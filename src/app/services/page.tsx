import { Metadata } from "next";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ServiceCard from "@/features/services/ServiceCard";
import PageHero from "@/components/PageHero";
import { services } from "@/data/services";
import { FadeIn, FadeInStagger } from "@/components/Animations";
import { Search, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Corporate Advisory, Compliance Training & Keynote Speaking",
  description: "Bespoke corporate advisory, secretarial services, professional training for finance teams, and keynote speaking engagements by Savita Dubey, INSEAD alumna and finance leader.",
  keywords: ["Corporate Advisory", "Compliance Training", "AML KYC Workshop", "Secretarial Services", "Finance Leadership Speaking", "Audit Training", "Savita Dubey Services"],
  openGraph: {
    title: "Professional Services | Savita Dubey",
    description: "Expert guidance in finance, compliance, and corporate governance.",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"],
  },
};

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We start with a 30-minute conversation to understand your goals, challenges, and context.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Tailored Proposal",
    desc: "I design a bespoke engagement plan aligned to your specific needs and timeline.",
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Delivery & Support",
    desc: "We work together with clear milestones, regular check-ins, and measurable outcomes.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        subtitle="Strategic Advisory & Education"
        title={<>Expert Guidance, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Real Results</span></>}
        description="Corporate advisory, professional training, and speaking engagements — each engagement tailored to your organisation's specific needs and goals."
      />

      {/* Services Grid */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </FadeInStagger>
        </Container>
      </Section>

      {/* What's Included */}
      <Section style={{ background: "var(--surface)" }}>
        <Container>
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Areas of Expertise</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--foreground)" }}>What I Bring to Every Engagement</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Incorporation & Secretarial", desc: "Company formation, statutory filings, board governance, and secretarial compliance across jurisdictions." },
              { title: "Regulatory & Compliance Advisory", desc: "Navigating AML, KYC, and sector-specific regulatory requirements with practical, actionable guidance." },
              { title: "Accounting & Audit Training", desc: "Workshops covering financial accounting, audit methodology, and management accounting for finance teams." },
              { title: "Leadership & Ethics Speaking", desc: "Keynotes on finance leadership, ethical decision-making, and empowering women in professional roles." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-7 group hover:shadow-lg transition-all duration-300"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
              >
                <div className="w-2 h-8 rounded-full mb-4" style={{ background: "var(--accent)" }} />
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </FadeInStagger>
        </Container>
      </Section>

      {/* Process */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>How It Works</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--foreground)" }}>A Simple, Focused Process</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 group"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {item.icon}
                </div>
                <span className="font-serif text-5xl font-bold block mb-4" style={{ color: "var(--surface-2)" }}>{item.step}</span>
                <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </FadeInStagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="text-white relative overflow-hidden" style={{ background: "var(--accent)" }}>
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/10 blur-[100px] rounded-full" />
        </div>
        <Container className="text-center relative z-10 py-12">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Let&apos;s Build Something Together</h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Ready to discuss how I can support your organisation or career? I&apos;d love to hear from you.
            </p>
            <Button href="/contact" className="!bg-white !text-indigo-600 hover:!bg-indigo-50 shadow-2xl px-12 py-4 border-none">
              Start a Conversation
            </Button>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
