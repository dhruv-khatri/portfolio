import "@/app/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import type { ReactNode } from "react"

export const metadata = {
  title: "Dhruv Khatri — Computational Biology & AI",
  description: "Computational biology, machine learning, and AI systems by Dhruv Khatri.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="portfolio-theme-v2"
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
