import { ReactElement } from "react";
import Image from "next/image";
import { Service } from "@/data/services";
import Card from "@/components/Card";
import { StaggerItem } from "@/components/Animations";
import { Briefcase, GraduationCap, Mic2 } from "lucide-react";

const icons: Record<string, ReactElement> = {
  briefcase: <Briefcase className="w-5 h-5" />,
  "academic-cap": <GraduationCap className="w-5 h-5" />,
  microphone: <Mic2 className="w-5 h-5" />,
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <StaggerItem>
      <Card className="flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group border-(--card-border)">
        {service.image && (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-(--card) to-transparent opacity-60" />
            <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg">
              {icons[service.icon]}
            </div>
          </div>
        )}
        <div className="p-8 flex flex-col flex-1">
          {!service.image && (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
              {icons[service.icon]}
            </div>
          )}
          <h3 className="font-serif text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-(--accent)" style={{ color: "var(--foreground)" }}>{service.title}</h3>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>{service.tagline}</p>
          <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--muted)" }}>{service.description}</p>
          <ul className="space-y-3 pt-6 border-t border-(--border)">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm font-medium" style={{ color: "var(--muted)" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </StaggerItem>
  );
}
