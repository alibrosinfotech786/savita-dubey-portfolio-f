import { CSSProperties, ReactNode } from "react";

export default function Section({
  children,
  className = "",
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`} style={style}>
      {children}
    </section>
  );
}
