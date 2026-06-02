import { CSSProperties, ReactNode } from "react";

export default function Section({
  children,
  className = "",
  id,
  style,
  ...props
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`} style={style} {...props}>
      {children}
    </section>
  );
}
