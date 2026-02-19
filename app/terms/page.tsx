import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-24 px-4 mx-auto prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
      <p className="lead text-xl text-muted-foreground mb-12">
        Last updated: February 15, 2026
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using halltoo, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not access or use the Service.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>
        You agree not to use the Service for any unlawful purpose or in any way that violates these Terms. This includes, but is not limited to:
        <ul>
          <li>Generating harmful or illegal content</li>
          <li>Reverse engineering the Service</li>
          <li>Overloading or disrupting our infrastructure</li>
        </ul>
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are owned by halltoo Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        In no event shall halltoo Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at <a href="mailto:support@halltoo.com">support@halltoo.com</a>.
      </p>
    </div>
  )
}
