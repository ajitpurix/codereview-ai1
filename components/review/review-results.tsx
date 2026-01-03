"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Bug, AlertTriangle, Lock, Zap, Sparkles, ChevronDown, ChevronRight, Copy, Check } from "lucide-react"

export interface ReviewIssue {
  id: string
  type: "bug" | "warning" | "security" | "performance" | "best-practice"
  severity: "low" | "medium" | "high"
  line: number
  title: string
  description: string
  suggestion?: string
}

interface ReviewResultsProps {
  issues: ReviewIssue[]
  isLoading?: boolean
  onLineClick?: (line: number) => void
}

const typeConfig = {
  bug: {
    icon: Bug,
    label: "Bugs",
    className: "text-destructive",
    bgClass: "bg-destructive/10 border-destructive/30",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warnings",
    className: "text-warning",
    bgClass: "bg-warning/10 border-warning/30",
  },
  security: {
    icon: Lock,
    label: "Security",
    className: "text-destructive",
    bgClass: "bg-destructive/10 border-destructive/30",
  },
  performance: {
    icon: Zap,
    label: "Performance",
    className: "text-accent",
    bgClass: "bg-accent/10 border-accent/30",
  },
  "best-practice": {
    icon: Sparkles,
    label: "Best Practices",
    className: "text-muted-foreground",
    bgClass: "bg-muted border-border",
  },
}

const severityConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-warning/20 text-warning" },
  high: { label: "High", className: "bg-destructive/20 text-destructive" },
}

function IssueCard({
  issue,
  onLineClick,
}: {
  issue: ReviewIssue
  onLineClick?: (line: number) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const config = typeConfig[issue.type]
  const severity = severityConfig[issue.severity]
  const Icon = config.icon

  const handleCopySuggestion = async () => {
    if (issue.suggestion) {
      await navigator.clipboard.writeText(issue.suggestion)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn("w-full rounded-md border p-3 text-left transition-colors hover:bg-muted/50", config.bgClass)}
        >
          <div className="flex items-start gap-3">
            <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", config.className)} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{issue.title}</span>
                <Badge variant="outline" className={cn("text-xs", severity.className)}>
                  {severity.label}
                </Badge>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLineClick?.(issue.line)
                }}
                className="mt-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Line {issue.line}
              </button>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 space-y-3 rounded-md border border-border bg-card p-3">
          <p className="text-sm text-muted-foreground">{issue.description}</p>
          {issue.suggestion && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Suggested Fix</span>
                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={handleCopySuggestion}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <pre className="rounded-md bg-muted p-2 font-mono text-xs overflow-x-auto">{issue.suggestion}</pre>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function ReviewResults({ issues, isLoading, onLineClick }: ReviewResultsProps) {
  // Group issues by type
  const groupedIssues = issues.reduce(
    (acc, issue) => {
      if (!acc[issue.type]) {
        acc[issue.type] = []
      }
      acc[issue.type].push(issue)
      return acc
    },
    {} as Record<string, ReviewIssue[]>,
  )

  const typeOrder: ReviewIssue["type"][] = ["bug", "security", "warning", "performance", "best-practice"]

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-sm">Analyzing your code...</p>
      </div>
    )
  }

  if (issues.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <Sparkles className="h-8 w-8" />
        <p className="text-sm">Submit code to see AI review results</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Review Results</h2>
        <span className="text-sm text-muted-foreground">
          {issues.length} issue{issues.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <div className="space-y-6">
        {typeOrder.map((type) => {
          const typeIssues = groupedIssues[type]
          if (!typeIssues?.length) return null

          const config = typeConfig[type]
          const TypeIcon = config.icon

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center gap-2">
                <TypeIcon className={cn("h-4 w-4", config.className)} />
                <span className="text-sm font-medium">{config.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {typeIssues.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {typeIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} onLineClick={onLineClick} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
