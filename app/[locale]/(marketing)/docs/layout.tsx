"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { docs, docCategories } from "@/lib/docs-content"
import { ChevronRight } from "lucide-react"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto px-4 pt-24 pb-20 flex gap-12">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-border/40 pr-6 h-[calc(100vh-8rem)] sticky top-24">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-8 pb-10">
            {docCategories.map((category) => (
              <div key={category}>
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground/80">{category}</h4>
                <ul className="space-y-1">
                  {Object.entries(docs)
                    .filter(([_, doc]) => doc.category === category)
                    .map(([slug, doc]) => {
                      const href = `/docs/${slug}`
                      const isActive = pathname === href
                      return (
                        <li key={slug}>
                          <Link
                            href={href}
                            className={cn(
                              "text-sm block py-1.5 px-3 rounded-md transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}
                          >
                            {doc.title}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Mobile Breadcrumb (Visible on small screens) */}
      <div className="lg:hidden mb-6 fixed top-16 left-0 w-full bg-background/95 backdrop-blur z-40 border-b border-border/40 px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
        <Link href="/docs">Docs</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground whitespace-nowrap">
           {pathname.split("/").pop() || "Overview"}
        </span>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-3xl min-w-0">
        {children}
      </main>
    </div>
  )
}
