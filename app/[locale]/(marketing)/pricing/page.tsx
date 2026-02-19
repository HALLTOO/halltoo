import { Pricing } from "@/components/sections/Pricing"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CTA } from "@/components/sections/CTA"

export const metadata = {
  title: "Pricing - halltoo",
  description: "Simple, transparent pricing for individuals and teams.",
}

const faqs = [
  {
    question: "How does the token usage work?",
    answer: "We aggregate API costs from providers. Pro plans include a generous monthly allowance. Team plans have centralized billing with usage limits you can control.",
  },
  {
    question: "Can I bring my own API keys?",
    answer: "Yes! In the Free plan, you can bring your own OpenAI/Anthropic keys. Pro and Team plans include managed access so you don't need separate accounts.",
  },
  {
    question: "Is there a student discount?",
    answer: "Yes, we offer 50% off for students and non-profits. Contact our support team with proof of status.",
  },
  {
    question: "What happens if I cancel?",
    answer: "You'll keep access until the end of your billing cycle. We'll never delete your data unless you request it.",
  },
]

export default function PricingPage() {
  return (
    <div className="pt-20">
      <Pricing />
      
      <section className="py-24 bg-secondary/5">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      <CTA />
    </div>
  )
}
