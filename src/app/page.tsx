import { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Savita Dubey | Finance Expert, Compliance Leader & INSEAD Alumna",
  description: "Official platform of Savita Dubey, a Chartered Accountant and INSEAD alumna with 15+ years of experience at KPMG and JPMorgan Chase. Expert in corporate advisory, AML/KYC training, and audit methodology.",
  keywords: ["Savita Dubey", "Finance Expert", "Compliance Leader", "INSEAD Finance", "Chartered Accountant", "KPMG Audit", "JPMorgan Chase Compliance", "AML KYC Training"],
  openGraph: {
    title: "Savita Dubey | Finance & Compliance Leadership",
    description: "Expert financial advisory and compliance training by INSEAD alumna Savita Dubey.",
    images: ["https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}

