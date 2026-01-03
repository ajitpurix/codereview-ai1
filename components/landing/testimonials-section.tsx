const testimonials = [
  {
    quote:
      "CodeReview AI caught a critical SQL injection vulnerability that our entire team missed. Saved us from a potential disaster.",
    author: "Sarah Chen",
    role: "Senior Engineer at TechCorp",
  },
  {
    quote:
      "We integrated it into our PR workflow. Now every pull request gets automatically reviewed before human review. Game changer.",
    author: "Marcus Johnson",
    role: "Engineering Lead at StartupXYZ",
  },
  {
    quote:
      "The inline comments are incredibly helpful for junior developers on our team. It's like having a senior engineer review every line.",
    author: "Emily Rodriguez",
    role: "CTO at DevStudio",
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Trusted by developers worldwide</h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of teams shipping better code with AI-powered reviews.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
