import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  id: string
  filename: string
  language: string
  score: number
  status: "passed" | "warnings" | "errors"
  issues: {
    errors: number
    warnings: number
    suggestions: number
  }
  createdAt: string
}

const statusConfig = {
  passed: {
    icon: CheckCircle,
    label: "Passed",
    className: "bg-success/10 text-success border-success/30",
  },
  warnings: {
    icon: AlertTriangle,
    label: "Warnings",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  errors: {
    icon: AlertCircle,
    label: "Errors",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
}

export function ReviewCard({ id, filename, language, score, status, issues, createdAt }: ReviewCardProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <Link href={`/review/${id}`}>
      <Card className="transition-colors hover:border-accent/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileCode className="h-4 w-4 shrink-0 text-muted-foreground" />
              <CardTitle className="truncate text-base font-medium">{filename}</CardTitle>
            </div>
            <Badge variant="outline" className={cn("shrink-0", config.className)}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{language}</Badge>
              <span className="text-muted-foreground">Score: {score}/100</span>
            </div>
            <span className="text-xs text-muted-foreground">{createdAt}</span>
          </div>

          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            {issues.errors > 0 && (
              <span className="text-destructive">
                {issues.errors} error{issues.errors !== 1 ? "s" : ""}
              </span>
            )}
            {issues.warnings > 0 && (
              <span className="text-warning">
                {issues.warnings} warning{issues.warnings !== 1 ? "s" : ""}
              </span>
            )}
            {issues.suggestions > 0 && (
              <span>
                {issues.suggestions} suggestion{issues.suggestions !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
