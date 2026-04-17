import Image from "next/image";
import { LearningItem } from "@/data/learning";
import Card from "@/components/Card";
import { StaggerItem } from "@/components/Animations";

export default function LearningCard({ item }: { item: LearningItem }) {
  return (
    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col p-0">
      <div className="relative w-full h-44">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit" style={{ color: "var(--accent)", background: "var(--accent-light)" }}>
          {item.category}
        </span>
        <h3 className="font-serif text-lg font-semibold mb-2 leading-snug" style={{ color: "var(--foreground)" }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
          {item.description}
        </p>
      </div>
    </Card>
  );
}
