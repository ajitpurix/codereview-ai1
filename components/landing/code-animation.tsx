"use client"

import { useEffect, useState } from "react"

const codeLines = [
  { text: "function validateUser(user) {", color: "text-accent" },
  { text: "  if (user.password == '123456') {", color: "text-foreground" },
  { text: "    return true;", color: "text-foreground" },
  { text: "  }", color: "text-foreground" },
  { text: "  query = `SELECT * FROM users WHERE id=${user.id}`;", color: "text-foreground" },
  { text: "  return db.execute(query);", color: "text-foreground" },
  { text: "}", color: "text-accent" },
]

const annotations = [
  { line: 2, type: "security", message: "Weak password comparison detected" },
  { line: 5, type: "security", message: "SQL injection vulnerability" },
  { line: 2, type: "bug", message: "Use === for strict equality" },
]

export function CodeAnimation() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showAnnotations, setShowAnnotations] = useState(false)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(lineTimer)
          setTimeout(() => setShowAnnotations(true), 500)
          return prev
        }
        return prev + 1
      })
    }, 200)

    return () => clearInterval(lineTimer)
  }, [])

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive/50" />
        <div className="h-3 w-3 rounded-full bg-warning/50" />
        <div className="h-3 w-3 rounded-full bg-success/50" />
        <span className="ml-2 text-sm text-muted-foreground">auth.js</span>
      </div>

      <div className="relative p-4">
        <pre className="font-mono text-sm">
          {codeLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-6 select-none text-right text-muted-foreground">{i + 1}</span>
              <code className={line.color}>{line.text}</code>
            </div>
          ))}
        </pre>

        {showAnnotations && (
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            {annotations.map((ann, i) => (
              <div
                key={i}
                className={`rounded-md px-3 py-2 text-xs font-medium ${
                  ann.type === "security"
                    ? "border border-destructive/30 bg-destructive/10 text-destructive"
                    : "border border-warning/30 bg-warning/10 text-warning"
                }`}
                style={{
                  animation: `fadeIn 0.3s ease-out ${i * 0.15}s both`,
                }}
              >
                <span className="mr-2">{ann.type === "security" ? "🔒" : "⚠"}</span>
                Line {ann.line}: {ann.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
