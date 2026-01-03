import { Bug, FileCode, Lock, Sparkles, Zap, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Bug,
    title: "Bug Detection",
    description: "Instantly identify bugs, logic errors, and potential runtime issues in your code.",
  },
  {
    icon: Lock,
    title: "Security Scanning",
    description: "Detect SQL injection, XSS vulnerabilities, and other security risks automatically.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Get suggestions to improve code efficiency and reduce resource consumption.",
  },
  {
    icon: FileCode,
    title: "Multi-Language Support",
    description: "Support for JavaScript, TypeScript, Python, Go, Rust, Java, and 15+ more languages.",
  },
  {
    icon: MessageSquare,
    title: "Inline Comments",
    description: "AI explanations mapped directly to specific lines in your code.",
  },
  {
    icon: Sparkles,
    title: "Best Practices",
    description: "Follow industry standards with automatic style and convention suggestions.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-card/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Everything you need for better code</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive analysis powered by AI to catch issues before they reach production.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
