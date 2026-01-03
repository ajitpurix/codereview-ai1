"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, AlertTriangle, MoreHorizontal, Download, Share2, Trash2, Eye } from "lucide-react"

export interface HistoryItem {
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

interface HistoryTableProps {
  items: HistoryItem[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
  onSelectAll: (selected: boolean) => void
  onDelete: (id: string) => void
  onExport: (id: string, format: "pdf" | "markdown") => void
  onShare: (id: string) => void
}

const statusConfig = {
  passed: {
    icon: CheckCircle,
    label: "Passed",
    className: "bg-success/20 text-success border-success/30",
  },
  warnings: {
    icon: AlertTriangle,
    label: "Warnings",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  errors: {
    icon: AlertCircle,
    label: "Errors",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
}

export function HistoryTable({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onDelete,
  onExport,
  onShare,
}: HistoryTableProps) {
  const allSelected = items.length > 0 && selectedItems.length === items.length

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox checked={allSelected} onCheckedChange={(checked) => onSelectAll(!!checked)} />
            </TableHead>
            <TableHead>File</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const config = statusConfig[item.status]
            const StatusIcon = config.icon

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={() => onSelectItem(item.id)} />
                </TableCell>
                <TableCell>
                  <Link href={`/review/${item.id}`} className="font-medium hover:underline">
                    {item.filename}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.language}</Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium",
                      item.score >= 80 ? "text-success" : item.score >= 60 ? "text-warning" : "text-destructive",
                    )}
                  >
                    {item.score}
                  </span>
                  /100
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("gap-1", config.className)}>
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    {item.issues.errors > 0 && <span className="text-destructive">{item.issues.errors}E</span>}
                    {item.issues.warnings > 0 && <span className="text-warning">{item.issues.warnings}W</span>}
                    {item.issues.suggestions > 0 && <span>{item.issues.suggestions}S</span>}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/review/${item.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onExport(item.id, "pdf")}>
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onExport(item.id, "markdown")}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Markdown
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onShare(item.id)}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => onDelete(item.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
