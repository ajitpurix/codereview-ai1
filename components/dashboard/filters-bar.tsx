"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

interface FiltersBarProps {
  onSearch?: (query: string) => void
  onLanguageChange?: (language: string) => void
  onSeverityChange?: (severity: string) => void
}

export function FiltersBar({ onSearch, onLanguageChange, onSeverityChange }: FiltersBarProps) {
  const [language, setLanguage] = useState("all")
  const [severity, setSeverity] = useState("all")

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search reviews..." className="pl-9" onChange={(e) => onSearch?.(e.target.value)} />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Language: {language === "all" ? "All" : language}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={language}
              onValueChange={(v) => {
                setLanguage(v)
                onLanguageChange?.(v)
              }}
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="typescript">TypeScript</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="javascript">JavaScript</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="python">Python</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="go">Go</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rust">Rust</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Severity
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by severity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={severity}
              onValueChange={(v) => {
                setSeverity(v)
                onSeverityChange?.(v)
              }}
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="errors">Errors only</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="warnings">Warnings</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="passed">Passed</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
