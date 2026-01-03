"use client"

import { Suspense, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { RepoCard } from "@/components/github/repo-card"
import { PRList } from "@/components/github/pr-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Search, RefreshCw, CheckCircle } from "lucide-react"

const mockRepos = [
  {
    id: "1",
    name: "frontend-app",
    fullName: "johndoe/frontend-app",
    description: "A modern React frontend application with TypeScript and Tailwind CSS",
    language: "TypeScript",
    stars: 245,
    forks: 32,
    defaultBranch: "main",
  },
  {
    id: "2",
    name: "api-service",
    fullName: "johndoe/api-service",
    description: "REST API service built with Node.js and Express",
    language: "JavaScript",
    stars: 128,
    forks: 18,
    defaultBranch: "main",
  },
  {
    id: "3",
    name: "data-pipeline",
    fullName: "johndoe/data-pipeline",
    description: "ETL pipeline for processing large datasets with Python",
    language: "Python",
    stars: 89,
    forks: 12,
    defaultBranch: "master",
  },
  {
    id: "4",
    name: "microservice-auth",
    fullName: "johndoe/microservice-auth",
    description: "Authentication microservice with JWT tokens",
    language: "Go",
    stars: 67,
    forks: 8,
    defaultBranch: "main",
  },
]

const mockPRs = [
  {
    id: "1",
    number: 142,
    title: "Add user authentication flow",
    author: "janedoe",
    branch: "feature/auth",
    status: "issues" as const,
    reviewScore: 72,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    number: 141,
    title: "Fix memory leak in data processing",
    author: "devuser",
    branch: "fix/memory-leak",
    status: "reviewed" as const,
    reviewScore: 95,
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    number: 140,
    title: "Update dependencies to latest versions",
    author: "johndoe",
    branch: "chore/deps",
    status: "pending" as const,
    createdAt: "1 day ago",
  },
]

function GitHubPageContent() {
  const [isConnected, setIsConnected] = useState(true)
  const [connectedRepos, setConnectedRepos] = useState<string[]>(["1"])
  const [autoReviewRepos, setAutoReviewRepos] = useState<string[]>(["1"])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRepos = mockRepos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!isConnected) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Github className="mx-auto mb-4 h-12 w-12" />
              <CardTitle>Connect GitHub</CardTitle>
              <CardDescription>
                Connect your GitHub account to automatically review pull requests and repositories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setIsConnected(true)}>
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">GitHub Integration</h1>
            <p className="text-sm text-muted-foreground">Manage connected repositories and review pull requests</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Connected as</span>
              <span className="font-medium">johndoe</span>
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        <PRList
          pullRequests={mockPRs}
          onReview={(id) => {
            console.log("Review PR:", id)
          }}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Repositories</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredRepos.map((repo) => (
              <RepoCard
                key={repo.id}
                name={repo.name}
                fullName={repo.fullName}
                description={repo.description}
                language={repo.language}
                stars={repo.stars}
                forks={repo.forks}
                defaultBranch={repo.defaultBranch}
                isConnected={connectedRepos.includes(repo.id)}
                autoReview={autoReviewRepos.includes(repo.id)}
                onConnect={() => setConnectedRepos((prev) => [...prev, repo.id])}
                onToggleAutoReview={(enabled) => {
                  if (enabled) {
                    setAutoReviewRepos((prev) => [...prev, repo.id])
                  } else {
                    setAutoReviewRepos((prev) => prev.filter((id) => id !== repo.id))
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function GitHubPage() {
  return (
    <Suspense fallback={null}>
      <GitHubPageContent />
    </Suspense>
  )
}
