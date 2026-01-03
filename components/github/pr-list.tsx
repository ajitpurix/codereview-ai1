"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GitPullRequest, CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react"

interface PullRequest {
  id: string
  number: number
  title: string
  author: string
  branch: string
  status: "pending" | "reviewed" | "issues"
  reviewScore?: number
  createdAt: string
}

interface PRListProps {
  pullRequests: PullRequest[]
  onReview: (id: string) => void
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    className: "bg-muted text-muted-foreground",
  },
  reviewed: {
    icon: CheckCircle,
    label: "Reviewed",
    className: "bg-success/20 text-success",
  },
  issues: {
    icon: AlertCircle,
    label: "Issues Found",
    className: "bg-warning/20 text-warning",
  },
}

export function PRList({ pullRequests, onReview }: PRListProps) {
  if (pullRequests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <GitPullRequest className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No pull requests to review</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Pull Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {pullRequests.map((pr) => {
          const config = statusConfig[pr.status]
          const StatusIcon = config.icon

          return (
            <div
              key={pr.id}
              className="flex items-center justify-between gap-4 rounded-md border border-border p-3 transition-colors hover:bg-muted/30"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate font-medium text-sm">{pr.title}</span>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    #{pr.number}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{pr.author}</span>
                  <span>•</span>
                  <span>{pr.branch}</span>
                  <span>•</span>
                  <span>{pr.createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className={cn("text-xs", config.className)}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {config.label}
                </Badge>
                {pr.reviewScore !== undefined && <span className="text-sm font-medium">{pr.reviewScore}/100</span>}
                <Button size="sm" variant="ghost" onClick={() => onReview(pr.id)}>
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View review</span>
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
