import Link from "next/link"
import { Facebook, Twitter, Github, Linkedin, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/40 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            halltoo
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            The unified chat workspace for managing and switching between multiple LLMs like ChatGPT, Claude, and Gemini.
          </p>
          <div className="flex gap-4 text-muted-foreground">
            <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
            <Link href="https://github.com" target="_blank" className="hover:text-primary transition-colors"><Github size={20} /></Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-6 text-foreground">Product</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-foreground">Company</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-foreground">Legal</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-16 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground/60">
        © {new Date().getFullYear()} halltoo Inc. All rights reserved.
      </div>
    </footer>
  )
}
