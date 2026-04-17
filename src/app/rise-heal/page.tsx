import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { FadeIn, FadeInStagger } from "@/components/Animations";
import { Sparkles, Heart, RefreshCw, Layers } from "lucide-react";

const pillars = [
  {
    title: "Acknowledge",
    desc: "The first step is recognising that high performance and emotional wellbeing are not opposites — they are deeply connected. You cannot sustain excellence while running on empty.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Reflect",
    desc: "Structured reflection — journaling, coaching conversations, or simply pausing — creates the space to understand what you truly need, not just what the market demands of you.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Rebuild",
    desc: "With clarity comes the ability to rebuild — your routines, your boundaries, your sense of purpose. This is not about stepping back. It is about stepping forward with intention.",
    icon: <RefreshCw className="w-6 h-6" />,
  },
];

const resources = [
  { title: "Burnout in Finance", desc: "Recognising the signs early and building sustainable work practices before crisis hits." },
  { title: "Imposter Syndrome", desc: "Why high achievers feel like frauds — and evidence-based strategies to overcome it." },
  { title: "Career Transitions", desc: "Navigating role changes, redundancy, and reinvention with clarity and confidence." },
  { title: "Mindful Leadership", desc: "How presence, empathy, and self-awareness make you a more effective leader." },
];

export default function RiseHealPage() {
  return (
    <>
      {/* Hero — warm gradient */}
      <section
        className="py-28 md:py-40 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, var(--surface) 0%, var(--background) 60%, var(--accent-light) 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-300/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-300/20 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "#DB2777" }}>Rise & Heal</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight max-w-4xl mx-auto tracking-tight" style={{ color: "var(--foreground)" }}>
              Support for Women Facing{" "}
              <span style={{ color: "#DB2777" }}>Emotional & Professional Challenges</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed italic" style={{ color: "var(--muted)" }}>
              "A dedicated platform for women in finance and demanding roles to navigate personal transitions, career hurdles, and rediscovering professional confidence."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <FadeIn className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-1 mx-auto mb-10 rounded-full" style={{ background: "var(--accent)" }} />
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8" style={{ color: "var(--foreground)" }}>
              Finance is a demanding profession. The pressure to perform, the long hours, the constant change — it takes a toll that is rarely acknowledged in boardrooms or on CVs.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Rise & Heal is my commitment to changing that conversation. It is a space where ambition and vulnerability coexist — where you can be both a high-performing professional and a whole human being.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Pillars */}
      <Section style={{ background: "var(--surface)" }}>
        <Container>
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Our Foundation</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--foreground)" }}>The Three Pillars</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "var(--accent)" }}
                />
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {p.icon}
                </div>
                <span className="font-serif text-6xl font-extrabold block mb-2" style={{ color: "var(--surface-2)" }}>0{i + 1}</span>
                <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>{p.desc}</p>
              </div>
            ))}
          </FadeInStagger>
        </Container>
      </Section>

      {/* Quote */}
      <Section style={{ background: "var(--background)" }}>
        <Container>
          <FadeIn className="max-w-4xl mx-auto text-center relative">
            <div className="absolute -top-10 -left-5 text-9xl font-serif -z-10 opacity-10" style={{ color: "var(--accent)" }}>&ldquo;</div>
            <blockquote className="font-serif text-3xl md:text-4xl leading-snug mb-8" style={{ color: "var(--foreground)" }}>
              Rest is not the absence of ambition. It is the foundation upon which sustainable ambition is built.
            </blockquote>
            <div className="w-16 h-1 mx-auto mb-6 rounded-full" style={{ background: "var(--border)" }} />
            <p className="font-bold tracking-[0.2em] uppercase text-sm" style={{ color: "var(--accent)" }}>Savita Dubey</p>
          </FadeIn>
        </Container>
      </Section>

      {/* Resources */}
      <Section style={{ background: "var(--surface)" }}>
        <Container>
          <FadeIn className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: "var(--card)", border: "1px solid var(--card-border)", color: "var(--accent)" }}
            >
              <Layers size={14} /> Support Toolkit
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6" style={{ color: "var(--foreground)" }}>Resources & Support</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
              Practical tools and conversations to help you navigate the emotional landscape of a finance career.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resources.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
              >
                <div className="w-2 h-7 rounded-full mb-4" style={{ background: "#DB2777" }} />
                <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </FadeInStagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="text-white" style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" }}>
        <Container className="text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">You Don&apos;t Have to Navigate This Alone</h2>
            <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
              If you are going through a difficult period in your career or life, reach out. A conversation can be the beginning of something better.
            </p>
            <Button href="/contact" className="!bg-white !text-indigo-600 hover:!bg-indigo-50 shadow-lg border-none">
              Reach Out
            </Button>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
