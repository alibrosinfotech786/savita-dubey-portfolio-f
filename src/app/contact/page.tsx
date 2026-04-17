"use client";

import { useState } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import { FadeIn, FadeInStagger } from "@/components/Animations";
import { CheckCircle2, Send, ArrowRight } from "lucide-react";

const engagements = [
  { label: "Corporate Advisory", desc: "Incorporation, secretarial services, governance, and regulatory compliance." },
  { label: "Training & Workshops", desc: "Accounting, audit methodology, and AML/KYC programmes for teams and individuals." },
  { label: "Speaking Engagements", desc: "Keynotes on finance, ethics, leadership, and empowering women in business." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        subtitle="Get in Touch"
        title={<>Let&apos;s Start a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Conversation</span></>}
        description="Whether you have a project in mind, a question about my services, or simply want to connect — I'd love to hear from you."
      />

      <Section style={{ background: "var(--background)" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left */}
            <div className="space-y-10">
              <FadeIn>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>How Can I Help?</h2>
                <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                  I work with finance professionals, corporate teams, and educational institutions across the globe. Every engagement is tailored — no off-the-shelf solutions.
                </p>
              </FadeIn>

              <FadeInStagger className="space-y-6">
                {engagements.map((item) => (
                  <div key={item.label} className="flex gap-5 group">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold mb-1" style={{ color: "var(--foreground)" }}>{item.label}</p>
                      <p className="leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </FadeInStagger>

              <FadeIn>
                <div className="p-7 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <p className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" /> Response Time
                  </p>
                  <p className="text-lg" style={{ color: "var(--muted)" }}>I typically respond within 1–2 business days via email.</p>
                </div>
              </FadeIn>
            </div>

            {/* Right — Form */}
            <FadeIn direction="left">
              <div
                className="rounded-[2rem] p-8 md:p-12 shadow-2xl"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
              >
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "var(--accent-light)" }}>
                      <Send className="w-10 h-10" style={{ color: "var(--accent)" }} />
                    </div>
                    <h3 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Message Sent</h3>
                    <p className="text-lg" style={{ color: "var(--muted)" }}>Thank you for reaching out. I&apos;ll be in touch shortly.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 rounded-xl">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all"
                          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all"
                          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Enquiry Type</label>
                      <select
                        className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      >
                        <option>Corporate Advisory</option>
                        <option>Training / Workshop</option>
                        <option>Speaking Engagement</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Your Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell me about your project or question..."
                        className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all resize-none"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group hover:opacity-90"
                      style={{ background: "var(--accent)" }}
                    >
                      Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  );
}
