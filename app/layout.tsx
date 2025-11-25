import "@/app/globals.css"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "Dhruv Khatri - Bioinformatician & Data Scientist",
  description: "Portfolio website showcasing bioinformatics and data science projects",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="portfolio-theme-v2"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
