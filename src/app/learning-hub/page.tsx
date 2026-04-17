import { Metadata } from "next";
import LearningHubClient from "./LearningHubClient";

export const metadata: Metadata = {
  title: "Learning Hub | Accounting, Compliance & Audit Resources",
  description: "Master financial accounting fundamentals, AML/KYC compliance, and audit frameworks with our structured knowledge repository.",
};

export default function LearningHubPage() {
  return <LearningHubClient />;
}

