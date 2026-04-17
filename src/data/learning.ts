export interface LearningItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  concept: string;
  examFocus: string;
  example: string;
  practiceQuestion: string;
  solution: string;
  commonMistakes: string;
}

export const learningItems: LearningItem[] = [
  {
    slug: "financial-accounting-fundamentals",
    title: "Financial Accounting Fundamentals",
    category: "Financial Accounting",
    description: "Master the foundational principles of accounting, including double-entry systems and financial reporting standards.",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800",
    concept: "Financial accounting involves the systematic recording, reporting, and analysis of financial transactions of a business to provide a clear picture of its financial health.",
    examFocus: "Focus on understanding the accounting equation (Assets = Liabilities + Equity) and the flow of information between financial statements.",
    example: "Recording a sale on credit: Debit Accounts Receivable, Credit Revenue. When cash is received: Debit Cash, Credit Accounts Receivable.",
    practiceQuestion: "What is the primary objective of financial accounting?",
    solution: "The primary objective is to provide useful financial information to external stakeholders for decision-making.",
    commonMistakes: "Confusing accrual basis with cash basis accounting and failing to reconcile accounts properly.",
  },
  {
    slug: "management-accounting-principles",
    title: "Management Accounting Principles",
    category: "Management Accounting",
    description: "Explore the internal use of accounting data for planning, decision-making, and control within an organization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    concept: "Management accounting focuses on providing information to internal managers for planning and controlling operations.",
    examFocus: "Understand cost-volume-profit (CVP) analysis, budgeting, and performance measurement tools.",
    example: "Using a flexible budget to adjust for changes in activity levels compared to a static master budget.",
    practiceQuestion: "How does management accounting differ from financial accounting?",
    solution: "Management accounting is for internal use and forward-looking, while financial accounting is for external use and historically focused.",
    commonMistakes: "Ignoring non-financial metrics and failing to update budget assumptions based on market changes.",
  },
  {
    slug: "audit-assurance-frameworks",
    title: "Audit & Assurance Frameworks",
    category: "Audit & Assurance",
    description: "Learn the rigorous processes behind auditing and the standards that ensure financial statement reliability.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
    concept: "Audit and assurance involve independent examination of financial information to provide an opinion on its accuracy and compliance.",
    examFocus: "Be familiar with ISAs (International Standards on Auditing) and the concept of professional skepticism.",
    example: "Performing substantive testing on inventory by physically counting items at the warehouse.",
    practiceQuestion: "What is the goal of an external audit?",
    solution: "The goal is to provide reasonable assurance that the financial statements are free from material misstatement.",
    commonMistakes: "Underestimating the importance of internal control assessments and lack of documented evidence.",
  },
  {
    slug: "taxation-and-regulatory-compliance",
    title: "Taxation and Regulatory Compliance",
    category: "Tax",
    description: "Navigate the complex landscape of corporate and personal taxation and the importance of strictly following regulations.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800",
    concept: "Taxation involves the calculation and payment of taxes to the government, while compliance ensures adherence to laws and regulations.",
    examFocus: "Understand different types of taxes (direct/indirect) and the regulatory reporting requirements.",
    example: "Calculating corporate income tax based on taxable profit after adjusting accounting profit for tax-deductible items.",
    practiceQuestion: "What is the difference between tax avoidance and tax evasion?",
    solution: "Tax avoidance is legal optimization of tax liability; tax evasion is illegal non-payment or underpayment of taxes.",
    commonMistakes: "Missing filing deadlines and incorrect interpretation of changing tax laws.",
  },
  {
    slug: "aml-kyc-compliance",
    title: "AML/KYC Compliance",
    category: "AML/KYC",
    description: "In-depth study of Anti-Money Laundering (AML) and Know Your Customer (KYC) frameworks to prevent financial crime.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    concept: "AML/KYC entails policies and procedures used by financial institutions to verify customer identity and prevent illegal financial activities.",
    examFocus: "Know the three stages of money laundering (Placement, Layering, Integration) and customer due diligence (CDD) requirements.",
    example: "Conducting Enhanced Due Diligence (EDD) for Politically Exposed Persons (PEPs).",
    practiceQuestion: "What are the three stages of money laundering?",
    solution: "1. Placement, 2. Layering, 3. Integration.",
    commonMistakes: "Treating KYC as a one-time check rather than ongoing monitoring and failing to report suspicious activities.",
  },
  {
    slug: "corporate-compliance-advisory",
    title: "Corporate Compliance Advisory",
    category: "Compliance",
    description: "Study corporate governance, secretarial practices, and regulatory advisory for various jurisdictions.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    concept: "Corporate compliance advisory ensures that companies operate within legal boundaries and maintain ethical standards through robust governance.",
    examFocus: "Study the roles of the Board of Directors, secretarial standards, and sectoral regulatory requirements.",
    example: "Advising a company on the mandatory disclosures required for its annual return filing.",
    practiceQuestion: "Why is corporate governance important for a company?",
    solution: "It ensures transparency, accountability, and protects the interests of all stakeholders, promoting long-term sustainability.",
    commonMistakes: "Failing to document board decisions properly and lack of a comprehensive compliance calendar.",
  }
];

export const categories = ["All", "Financial Accounting", "Management Accounting", "Audit & Assurance", "Tax", "Compliance", "AML/KYC"];
