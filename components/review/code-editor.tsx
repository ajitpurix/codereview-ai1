"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const languages = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
]

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  onLanguageChange: (language: string) => void
  highlightedLines?: number[]
}

export function CodeEditor({ value, onChange, language, onLanguageChange, highlightedLines = [] }: CodeEditorProps) {
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const lines = value.split("\n")

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        onChange(content)

        // Auto-detect language from extension
        const ext = file.name.split(".").pop()?.toLowerCase()
        const langMap: Record<string, string> = {
          ts: "typescript",
          tsx: "typescript",
          js: "javascript",
          jsx: "javascript",
          py: "python",
          go: "go",
          rs: "rust",
          java: "java",
          cs: "csharp",
          cpp: "cpp",
          php: "php",
          rb: "ruby",
        }
        if (ext && langMap[ext]) {
          onLanguageChange(langMap[ext])
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".ts,.tsx,.js,.jsx,.py,.go,.rs,.java,.cs,.cpp,.php,.rb,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Line numbers */}
        <div className="flex flex-col border-r border-border bg-muted/30 px-3 py-3 text-right font-mono text-sm text-muted-foreground select-none">
          {lines.map((_, i) => (
            <div
              key={i}
              className={cn("leading-6", highlightedLines.includes(i + 1) && "text-destructive font-medium")}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code display / input */}
        <div className="relative flex-1 overflow-auto">
          <pre className="absolute inset-0 pointer-events-none p-3 font-mono text-sm leading-6 whitespace-pre">
            {lines.map((line, i) => (
              <div key={i} className={cn(highlightedLines.includes(i + 1) && "bg-destructive/10 -mx-3 px-3")}>
                {line || " "}
              </div>
            ))}
          </pre>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full resize-none bg-transparent p-3 font-mono text-sm leading-6 text-transparent caret-foreground focus:outline-none"
            spellCheck={false}
            placeholder="Paste your code here..."
          />
        </div>
      </div>
    </div>
  )
}
