"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onToggleSidebar?: () => void
  showSidebarToggle?: boolean
}

export function Header({ onToggleSidebar, showSidebarToggle = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        {showSidebarToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-1 items-center gap-4">
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Action
          </Button>
        </div>
      </div>
    </header>
  )
}
