import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import type React from "react" // Import React
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fire Monitoring System",
  description: "Real-time fire monitoring dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>{children}</body>
      </ClerkProvider>
    </html>
  )
}

