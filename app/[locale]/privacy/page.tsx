import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-24 px-4 mx-auto prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <p className="lead text-xl text-muted-foreground mb-12">
        Last updated: February 15, 2026
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect minimal data necessary to provide our services:
        <ul>
          <li>Account information (email, name)</li>
          <li>Usage data (token counts, API calls)</li>
          <li>Payment information (processed securely by Stripe)</li>
        </ul>
      </p>

      <h2>2. How We Use Your Data</h2>
      <p>
        We use your data solely to:
        <ul>
          <li>Provide and maintain the Service</li>
          <li>Process transactions</li>
          <li>Send administrative notifications</li>
          <li>Improve system performance and reliability</li>
        </ul>
      </p>

      <h2>3. Data Sharing</h2>
      <p>
        We do not sell your personal data. We share data only with trusted service providers (e.g., cloud hosting, payment processors) who are contractually obligated to protect your information.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data at any time. You can export your data from the account settings page.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have questions about this policy, please contact us at <a href="mailto:privacy@halltoo.com">privacy@halltoo.com</a>.
      </p>
    </div>
  )
}
