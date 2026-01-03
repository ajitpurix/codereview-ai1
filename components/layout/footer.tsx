export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 px-4 py-4 lg:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <nav className="flex gap-4">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  )
}
