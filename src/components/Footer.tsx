import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/learning-hub", label: "Learning Hub" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/rise-heal", label: "Rise & Heal" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--hero-bg)", color: "var(--hero-text)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-xl font-bold mb-2">Savita Dubey</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-2)" }}>
              Finance. Compliance. Leadership.
            </p>
            <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
              INSEAD · KPMG · JPMorgan
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: "var(--muted-2)" }}>Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors duration-200 hover:opacity-100" style={{ color: "var(--muted)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: "var(--muted-2)" }}>Get in Touch</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Available for advisory, training, and speaking engagements globally.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-medium transition-colors"
              style={{ color: "var(--accent)" }}
            >
              Send a message →
            </Link>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Savita Dubey. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Designed and developed by{" "}
            <a 
              href="https://alibrosinfotech.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "var(--accent)" }}
            >
              Alibros Infotech Pvt Ltd
            </a>
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Finance. Compliance. Leadership.</p>
        </div>
      </div>
    </footer>
  );
}
