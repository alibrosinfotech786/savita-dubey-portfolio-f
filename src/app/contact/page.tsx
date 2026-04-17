import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Savita Dubey | Corporate Advisory & Speaking",
  description: "Get in touch for bespoke corporate advisory, compliance training workshops, and finance leadership speaking engagements.",
  keywords: ["Contact Savita Dubey", "Finance Consultant Booking", "Corporate Training Inquiry", "Keynote Speaker Finance", "Compliance Advisory Consultation"],
  openGraph: {
    title: "Contact | Savita Dubey",
    description: "Let's start a conversation about your financial and compliance needs.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

