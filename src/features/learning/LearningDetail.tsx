import { LearningItem } from "@/data/learning";

function Block({ label, children, accent }: { label: string; children: string; accent?: boolean }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        border: accent ? "1px solid color-mix(in srgb, var(--accent) 25%, transparent)" : "1px solid var(--border)",
        background: accent ? "var(--accent-light)" : "var(--surface)",
      }}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>{label}</p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{children}</p>
    </div>
  );
}

export default function LearningDetail({ item }: { item: LearningItem }) {
  return (
    <article className="max-w-3xl mx-auto">
      <span
        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
        style={{ color: "var(--accent)", background: "var(--accent-light)" }}
      >
        {item.category}
      </span>
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: "var(--foreground)" }}>
        {item.title}
      </h1>
      <p
        className="text-base leading-relaxed mb-10 pb-8"
        style={{ color: "var(--muted)", borderBottom: "1px solid var(--border)" }}
      >
        {item.description}
      </p>

      <div className="grid gap-5">
        <Block label="Core Concept">{item.concept}</Block>
        <Block label="Exam Focus">{item.examFocus}</Block>
        <Block label="Worked Example">{item.example}</Block>
        <Block label="Practice Question" accent>{item.practiceQuestion}</Block>

        <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Solution</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{item.solution}</p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "color-mix(in srgb, #EF4444 8%, var(--background))",
            border: "1px solid color-mix(in srgb, #EF4444 20%, transparent)",
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#EF4444" }}>Common Mistakes</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{item.commonMistakes}</p>
        </div>
      </div>
    </article>
  );
}
