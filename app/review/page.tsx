"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CodeEditor } from "@/components/review/code-editor"
import { ReviewResults, type ReviewIssue } from "@/components/review/review-results"
import { Button } from "@/components/ui/button"
import { Play, Loader2 } from "lucide-react"

const defaultCode = `function validateUser(user) {
  if (user.password == '123456') {
    return true;
  }
  
  const query = \`SELECT * FROM users WHERE id=\${user.id}\`;
  const result = db.execute(query);
  
  if (result) {
    console.log(user.password);
    return result;
  }
  
  return false;
}`

const mockIssues: ReviewIssue[] = [
  {
    id: "1",
    type: "security",
    severity: "high",
    line: 6,
    title: "SQL Injection Vulnerability",
    description:
      "User input is directly interpolated into the SQL query, which allows attackers to inject malicious SQL code.",
    suggestion: `const query = "SELECT * FROM users WHERE id = ?";
const result = db.execute(query, [user.id]);`,
  },
  {
    id: "2",
    type: "security",
    severity: "high",
    line: 2,
    title: "Hardcoded Password Check",
    description:
      "Comparing passwords against a hardcoded value is a severe security risk. Passwords should be hashed and compared securely.",
    suggestion: `import { compare } from 'bcrypt';
const isValid = await compare(user.password, storedHash);`,
  },
  {
    id: "3",
    type: "bug",
    severity: "medium",
    line: 2,
    title: "Loose Equality Comparison",
    description:
      "Using == instead of === can lead to unexpected type coercion. Use strict equality for reliable comparisons.",
    suggestion: `if (user.password === '123456') {`,
  },
  {
    id: "4",
    type: "security",
    severity: "medium",
    line: 10,
    title: "Sensitive Data Exposure",
    description:
      "Logging passwords exposes sensitive user data. This could appear in log files and monitoring systems.",
    suggestion: `// Remove password logging
console.log('User authenticated:', user.id);`,
  },
  {
    id: "5",
    type: "best-practice",
    severity: "low",
    line: 1,
    title: "Missing TypeScript Types",
    description: "The function parameter lacks type annotations. Adding types improves code safety and documentation.",
    suggestion: `interface User {
  id: string;
  password: string;
}

function validateUser(user: User): Promise<boolean> {`,
  },
  {
    id: "6",
    type: "performance",
    severity: "low",
    line: 6,
    title: "Synchronous Database Query",
    description: "Database queries should be asynchronous to avoid blocking the event loop.",
    suggestion: `const result = await db.execute(query);`,
  },
]

export default function ReviewPage() {
  const [code, setCode] = useState(defaultCode)
  const [language, setLanguage] = useState("javascript")
  const [issues, setIssues] = useState<ReviewIssue[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [highlightedLines, setHighlightedLines] = useState<number[]>([])

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setIssues([])
    setHighlightedLines([])

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIssues(mockIssues)
    setHighlightedLines(mockIssues.map((i) => i.line))
    setIsAnalyzing(false)
  }

  const handleLineClick = (line: number) => {
    setHighlightedLines([line])
    // In a real implementation, scroll to the line in the editor
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Code Review</h1>
            <p className="text-sm text-muted-foreground">Paste or upload code for AI-powered analysis</p>
          </div>
          <Button onClick={handleAnalyze} disabled={isAnalyzing || !code.trim()}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Analyze Code
              </>
            )}
          </Button>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-2">
          {/* Left panel - Code Editor */}
          <div className="min-h-[400px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              highlightedLines={highlightedLines}
            />
          </div>

          {/* Right panel - Review Results */}
          <div className="rounded-lg border border-border bg-card min-h-[400px]">
            <ReviewResults issues={issues} isLoading={isAnalyzing} onLineClick={handleLineClick} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
