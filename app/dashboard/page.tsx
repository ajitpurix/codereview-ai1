import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReviewCard } from "@/components/dashboard/review-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { FiltersBar } from "@/components/dashboard/filters-bar"
import { Button } from "@/components/ui/button"
import { FileCode, Bug, Shield, Zap, Plus } from "lucide-react"
import Link from "next/link"

const mockReviews = [
  {
    id: "1",
    filename: "auth-service.ts",
    language: "TypeScript",
    score: 72,
    status: "warnings" as const,
    issues: { errors: 0, warnings: 3, suggestions: 5 },
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    filename: "api-handler.py",
    language: "Python",
    score: 45,
    status: "errors" as const,
    issues: { errors: 2, warnings: 4, suggestions: 3 },
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    filename: "database.go",
    language: "Go",
    score: 95,
    status: "passed" as const,
    issues: { errors: 0, warnings: 0, suggestions: 2 },
    createdAt: "1 day ago",
  },
  {
    id: "4",
    filename: "payment-utils.js",
    language: "JavaScript",
    score: 68,
    status: "warnings" as const,
    issues: { errors: 0, warnings: 2, suggestions: 6 },
    createdAt: "2 days ago",
  },
  {
    id: "5",
    filename: "config.rs",
    language: "Rust",
    score: 88,
    status: "passed" as const,
    issues: { errors: 0, warnings: 1, suggestions: 1 },
    createdAt: "3 days ago",
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your recent code reviews</p>
          </div>
          <Button asChild>
            <Link href="/review">
              <Plus className="mr-2 h-4 w-4" />
              New Review
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Reviews" value={127} description="+12 this week" icon={FileCode} />
          <StatsCard title="Bugs Found" value={34} description="Critical issues detected" icon={Bug} />
          <StatsCard title="Security Issues" value={8} description="Vulnerabilities flagged" icon={Shield} />
          <StatsCard title="Avg. Score" value={78} description="Out of 100" icon={Zap} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Reviews</h2>
          <FiltersBar />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
