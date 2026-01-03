"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Eye, EyeOff, RefreshCw, Trash2 } from "lucide-react"

const languages = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "C#",
  "C++",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
]

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark")
  const [strictness, setStrictness] = useState([70])
  const [preferredLanguages, setPreferredLanguages] = useState(["TypeScript", "Python", "Go"])
  const [securityScan, setSecurityScan] = useState(true)
  const [performanceScan, setPerformanceScan] = useState(true)
  const [bestPractices, setBestPractices] = useState(true)
  const [showApiKey, setShowApiKey] = useState(false)
  const apiKey = "cr_live_a1b2c3d4e5f6g7h8i9j0"

  const toggleLanguage = (lang: string) => {
    setPreferredLanguages((prev) => (prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]))
  }

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and review preferences</p>
        </div>

        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security & Scanning</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-6">
            {/* Theme */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Customize how CodeReview AI looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Preferred Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preferred Languages</CardTitle>
                <CardDescription>Select your most used programming languages for better suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant={preferredLanguages.includes(lang) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => toggleLanguage(lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Strictness */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Strictness Level</CardTitle>
                <CardDescription>
                  Adjust how strict the AI should be when reviewing code. Higher values mean more suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lenient</span>
                    <span className="text-sm font-medium">{strictness[0]}%</span>
                    <span className="text-sm text-muted-foreground">Strict</span>
                  </div>
                  <Slider value={strictness} onValueChange={setStrictness} max={100} step={5} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Scanning Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Scanning Options</CardTitle>
                <CardDescription>Choose which types of issues to scan for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Security Vulnerabilities</p>
                    <p className="text-xs text-muted-foreground">
                      Detect SQL injection, XSS, and other security issues
                    </p>
                  </div>
                  <Switch checked={securityScan} onCheckedChange={setSecurityScan} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Performance Issues</p>
                    <p className="text-xs text-muted-foreground">
                      Identify slow algorithms and resource-heavy patterns
                    </p>
                  </div>
                  <Switch checked={performanceScan} onCheckedChange={setPerformanceScan} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Best Practices</p>
                    <p className="text-xs text-muted-foreground">Suggest code style and convention improvements</p>
                  </div>
                  <Switch checked={bestPractices} onCheckedChange={setBestPractices} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            {/* API Keys */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">API Keys</CardTitle>
                <CardDescription>Manage your API keys for programmatic access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Live API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="pr-10 font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button variant="outline" size="icon" onClick={handleCopyApiKey}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy API key</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this key to authenticate API requests. Keep it secret.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate Key
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">API Usage</CardTitle>
                <CardDescription>Your current API usage this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reviews used</span>
                    <span className="font-medium">127 / 1,000</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[12.7%] rounded-full bg-accent" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Resets on February 1, 2026</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            {/* Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Change Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
