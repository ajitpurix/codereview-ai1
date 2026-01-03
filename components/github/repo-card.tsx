"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { GitBranch, Star, GitFork, Check } from "lucide-react"

interface RepoCardProps {
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  forks: number
  defaultBranch: string
  isConnected: boolean
  autoReview: boolean
  onToggleAutoReview: (enabled: boolean) => void
  onConnect: () => void
}

export function RepoCard({
  name,
  fullName,
  description,
  language,
  stars,
  forks,
  defaultBranch,
  isConnected,
  autoReview,
  onToggleAutoReview,
  onConnect,
}: RepoCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onConnect()
    setIsLoading(false)
  }

  return (
    <Card className={isConnected ? "border-accent/50" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="truncate text-base font-medium">{name}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">{fullName}</p>
          </div>
          {isConnected ? (
            <Badge className="shrink-0 bg-accent/20 text-accent border-accent/30">
              <Check className="mr-1 h-3 w-3" />
              Connected
            </Badge>
          ) : (
            <Button size="sm" variant="outline" onClick={handleConnect} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {language && (
            <Badge variant="secondary" className="text-xs">
              {language}
            </Badge>
          )}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {stars.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {forks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="h-3 w-3" />
            {defaultBranch}
          </div>
        </div>

        {isConnected && (
          <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 p-3">
            <div>
              <p className="text-sm font-medium">Auto-review PRs</p>
              <p className="text-xs text-muted-foreground">Automatically review new pull requests</p>
            </div>
            <Switch checked={autoReview} onCheckedChange={onToggleAutoReview} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
