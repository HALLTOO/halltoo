import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { Pricing } from "@/components/sections/Pricing"
import { CTA } from "@/components/sections/CTA"
import { LogoWall } from "@/components/sections/LogoWall"
import { Security } from "@/components/sections/Security"
import { Testimonials } from "@/components/sections/Testimonials"

export default function LandingPage() {
  return (
    <>
      <Hero />
      <LogoWall />
      <Features />
      <Security />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  )
}
