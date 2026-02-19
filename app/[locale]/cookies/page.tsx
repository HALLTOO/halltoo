import { motion } from "framer-motion"

export default function CookiesPage() {
  return (
    <div className="container max-w-4xl py-24 px-4 mx-auto prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Cookie Policy</h1>
      <p className="lead text-xl text-muted-foreground mb-12">
        Last updated: February 15, 2026
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your experience.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        We use cookies for the following purposes:
        <ul>
          <li><strong>Essential Cookies:</strong> Required for the website to function (e.g., login status).</li>
          <li><strong>Analytics Cookies:</strong> To understand how visitors use our site (e.g., pages visited, time spent).</li>
          <li><strong>Functionality Cookies:</strong> To remember your choices (e.g., language, dark mode).</li>
        </ul>
      </p>

      <h2>3. Managing Cookies</h2>
      <p>
        You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.
      </p>

      <h2>4. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. We encourage you to review this page periodically for any changes.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us at <a href="mailto:privacy@halltoo.com">privacy@halltoo.com</a>.
      </p>
    </div>
  )
}
