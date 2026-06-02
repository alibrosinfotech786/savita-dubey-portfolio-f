<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExtraBlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'The Digital Transformation of Internal Audit',
                'slug' => 'digital-transformation-internal-audit-2026',
                'excerpt' => 'How automation and AI are reshaping the role of internal auditors from compliance checkers to strategic advisors.',
                'category' => 'Audit',
                'cover_image' => 'https://images.unsplash.com/photo-1551288049-bbbda5366a71?auto=format&fit=crop&q=80&w=1200',
                'content' => "### The Evolution of Audit\n\nIn 2026, internal audit is no longer just about looking at what happened in the past. It is about predicting what might happen in the future. The integration of Artificial Intelligence and Data Analytics has allowed auditors to process 100% of data sets rather than relying on random sampling.\n\nThis shift allows for \"Continuous Auditing,\" where risks are identified in real-time. Organizations that embrace these digital tools are seeing faster response times to risks and more accurate financial reporting.",
                'is_premium' => false,
                'author_name' => 'Savita Dubey',
            ],
            [
                'title' => 'ESG Reporting: Moving Beyond Compliance',
                'slug' => 'esg-reporting-beyond-compliance',
                'excerpt' => 'Why Environmental, Social, and Governance (ESG) metrics are becoming critical for investor trust and long-term sustainability.',
                'category' => 'Governance',
                'cover_image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
                'content' => "### Sustainability as Strategy\n\nESG is no longer a \"nice to have\" section in an annual report. For modern boards, ESG metrics are as vital as EBITDA. Investors are increasingly looking at how companies manage their carbon footprint and social impact as a proxy for long-term resilience.\n\nEffective governance requires a clear framework for measuring these non-financial metrics. Companies that lead in transparency regarding their ESG goals are attracting higher-quality capital and building deeper trust with their stakeholders.",
                'is_premium' => true,
                'author_name' => 'Savita Dubey',
            ],
            [
                'title' => 'Cyber Resilience as a Boardroom Priority',
                'slug' => 'cyber-resilience-boardroom-priority',
                'excerpt' => 'A guide for executives on why cybersecurity is a governance issue, not just an IT problem.',
                'category' => 'Compliance',
                'cover_image' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
                'content' => "### Protecting the Digital Perimeter\n\nCybersecurity has moved from the basement to the boardroom. With the rise of sophisticated ransomware and data breaches, the cost of failure is no longer just technical—it's reputational and legal.\n\nBoards must move from asking \"Are we secure?\" to \"How resilient are we?\" Cyber resilience emphasizes the ability to operate *through* an attack and recover quickly. Compliance teams must work hand-in-hand with IT to ensure incident response plans are tested and ready.",
                'is_premium' => false,
                'author_name' => 'Savita Dubey',
            ],
            [
                'title' => 'Navigating Cross-Border Tax Regulations',
                'slug' => 'navigating-cross-border-tax-2026',
                'excerpt' => 'Understanding the challenges of international tax compliance in an increasingly globalized digital economy.',
                'category' => 'Finance',
                'cover_image' => 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200',
                'content' => "### Global Finance Complexity\n\nAs businesses expand globally, the complexity of tax compliance grows exponentially. The \"Global Minimum Tax\" and digital services taxes are creating a new landscape that requires expert navigation.\n\nStrategic financial planning now requires a deep understanding of local laws in every jurisdiction of operation. This post explores how companies can leverage tax technology to manage their global obligations efficiently without increasing their risk profile.",
                'is_premium' => true,
                'author_name' => 'Savita Dubey',
            ],
            [
                'title' => 'The Importance of Ethical Leadership in Finance',
                'slug' => 'ethical-leadership-finance-impact',
                'excerpt' => 'Exploring how the tone at the top defines the culture of compliance and integrity within an organization.',
                'category' => 'Governance',
                'cover_image' => 'https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=1200',
                'content' => "### Culture Defines Compliance\n\nYou can have the best compliance software in the world, but if the \"tone at the top\" is wrong, the system will fail. Ethical leadership is about more than following rules; it's about creating a culture where employees feel safe to speak up when they see something wrong.\n\nLeaders who prioritize integrity over short-term gains build organizations that are more resilient to scandal and more attractive to top talent. In finance, trust is the ultimate currency.",
                'is_premium' => false,
                'author_name' => 'Savita Dubey',
            ],
        ];

        foreach ($posts as $post) {
            \App\Models\Post::updateOrCreate(['slug' => $post['slug']], $post);
        }
    }
}
