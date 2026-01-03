"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import Link from "next/link"
import { CodeAnimation } from "./code-animation"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Now with GPT-4 powered analysis
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            AI-Powered Code Reviews in Seconds
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Submit your code and receive instant AI analysis including bug detection, security vulnerabilities,
            performance suggestions, and best practice feedback.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/review">
                Review Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/github">
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              20+ Languages
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              Real-time Analysis
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              GitHub Integration
            </div>
          </div>
        </div>

        <div className="mt-16">
          <CodeAnimation />
        </div>
      </div>
    </section>
  )
}
