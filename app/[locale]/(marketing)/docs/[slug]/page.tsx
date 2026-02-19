import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { docs } from "@/lib/docs-content"
import { Metadata } from "next"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = docs[params.slug]
  if (!doc) return { title: "Not Found" }
  return {
    title: `${doc.title} - halltoo Docs`,
    description: `Read documentation for ${doc.title} on halltoo.`,
  }
}

export default function DocPage({ params }: PageProps) {
  const doc = docs[params.slug]

  if (!doc) {
    notFound()
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary/20 prose-pre:border prose-pre:border-border/40">
      <ReactMarkdown>{doc.content}</ReactMarkdown>
    </article>
  )
}
