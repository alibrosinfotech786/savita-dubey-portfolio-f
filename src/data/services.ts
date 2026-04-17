export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
  image?: string;
  category: "Advisory" | "Training" | "Speaking";
}

export const services: Service[] = [
  {
    slug: "corporate-advisory",
    title: "Corporate Compliance Advisory",
    tagline: "Governance, Structure & Regulatory Clarity",
    category: "Advisory",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    description: "Expert guidance on business structure, governance, and regulatory requirements — from incorporation through to ongoing compliance management.",
    deliverables: [
      "Company Incorporation",
      "Secretarial Services",
      "Governance & Compliance",
      "Regulatory Advisory"
    ]
  },
  {
    slug: "professional-training",
    title: "Training & Education",
    tagline: "Accounting, Audit & AML Programmes",
    category: "Training",
    icon: "academic-cap",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    description: "Specialised training programmes for finance professionals and corporate teams — covering accounting, audit methodology, and AML/KYC frameworks.",
    deliverables: [
      "Accounting Workshops",
      "Audit Methodology",
      "AML / KYC Training",
      "Regulatory Updates"
    ]
  },
  {
    slug: "public-speaking",
    title: "Speaking Engagements",
    tagline: "Finance, Ethics & Leadership",
    category: "Speaking",
    icon: "microphone",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=1000",
    description: "Engaging keynote sessions and panel contributions on the future of finance, ethical leadership, and empowering women in professional roles.",
    deliverables: [
      "Finance & Markets",
      "Ethics in Business",
      "Leadership Development",
      "Empowering Professional Women"
    ]
  }
];
