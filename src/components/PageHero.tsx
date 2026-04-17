import { ReactNode } from "react";
import Container from "@/components/Container";
import { FadeIn } from "@/components/Animations";

interface PageHeroProps {
  subtitle: string;
  title: ReactNode;
  description: string;
  accentColor?: string;
}

export default function PageHero({ subtitle, title, description, accentColor }: PageHeroProps) {
  return (
    <section className="text-white py-24 md:py-32 overflow-hidden relative" style={{ background: "var(--hero-bg)" }}>
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] bg-blue-500/20 blur-[100px] rounded-full" />
      </div>
      <Container className="text-center relative z-10">
        <FadeIn>
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: accentColor ?? "var(--accent)" }}
          >
            {subtitle}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted-2)" }}>
            {description}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
