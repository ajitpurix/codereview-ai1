"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { HistoryTable, type HistoryItem } from "@/components/history/history-table"
import { FiltersBar } from "@/components/dashboard/filters-bar"
import { Button } from "@/components/ui/button"
import { Download, GitCompare, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    filename: "auth-service.ts",
    language: "TypeScript",
    score: 72,
    status: "warnings",
    issues: { errors: 0, warnings: 3, suggestions: 5 },
    createdAt: "Jan 2, 2026",
  },
  {
    id: "2",
    filename: "api-handler.py",
    language: "Python",
    score: 45,
    status: "errors",
    issues: { errors: 2, warnings: 4, suggestions: 3 },
    createdAt: "Jan 2, 2026",
  },
  {
    id: "3",
    filename: "database.go",
    language: "Go",
    score: 95,
    status: "passed",
    issues: { errors: 0, warnings: 0, suggestions: 2 },
    createdAt: "Jan 1, 2026",
  },
  {
    id: "4",
    filename: "payment-utils.js",
    language: "JavaScript",
    score: 68,
    status: "warnings",
    issues: { errors: 0, warnings: 2, suggestions: 6 },
    createdAt: "Dec 31, 2025",
  },
  {
    id: "5",
    filename: "config.rs",
    language: "Rust",
    score: 88,
    status: "passed",
    issues: { errors: 0, warnings: 1, suggestions: 1 },
    createdAt: "Dec 30, 2025",
  },
  {
    id: "6",
    filename: "user-model.ts",
    language: "TypeScript",
    score: 82,
    status: "passed",
    issues: { errors: 0, warnings: 1, suggestions: 3 },
    createdAt: "Dec 29, 2025",
  },
  {
    id: "7",
    filename: "validation.py",
    language: "Python",
    score: 55,
    status: "warnings",
    issues: { errors: 0, warnings: 5, suggestions: 4 },
    createdAt: "Dec 28, 2025",
  },
  {
    id: "8",
    filename: "router.go",
    language: "Go",
    score: 91,
    status: "passed",
    issues: { errors: 0, warnings: 0, suggestions: 1 },
    createdAt: "Dec 27, 2025",
  },
]

export default function HistoryPage() {
  const [items, setItems] = useState(mockHistory)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleSelectAll = (selected: boolean) => {
    setSelectedItems(selected ? items.map((i) => i.id) : [])
  }

  const handleDelete = (id: string) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems((prev) => prev.filter((i) => i.id !== itemToDelete))
      setSelectedItems((prev) => prev.filter((i) => i !== itemToDelete))
    }
    setDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  const handleBulkDelete = () => {
    setItems((prev) => prev.filter((i) => !selectedItems.includes(i.id)))
    setSelectedItems([])
  }

  const handleExport = (id: string, format: "pdf" | "markdown") => {
    // In real implementation, trigger download
    console.log(`Exporting ${id} as ${format}`)
  }

  const handleShare = (id: string) => {
    // In real implementation, copy share link
    const url = `${window.location.origin}/review/${id}`
    navigator.clipboard.writeText(url)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Review History</h1>
            <p className="text-sm text-muted-foreground">Browse and manage your past code reviews</p>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedItems.length} selected</span>
              {selectedItems.length === 2 && (
                <Button variant="outline" size="sm">
                  <GitCompare className="mr-2 h-4 w-4" />
                  Compare
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <FiltersBar />

        <HistoryTable
          items={items}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
          onExport={handleExport}
          onShare={handleShare}
        />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {items.length} reviews</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
