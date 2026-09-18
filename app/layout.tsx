import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster as ToastToaster } from "@/components/ui/toast"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} font-sans antialiased`}
    >
      {/* style-luma selects the registry/styles/style-luma.css layer;
          base-color-neutral is metadata-only (matches how the real
          design-system-provider tags <body>, no CSS reads it) but kept
          for parity with what the preset actually resolves to. */}
      <body className="style-luma base-color-neutral">
        <ThemeProvider>
          <ThemeToggle />
          <ToastToaster>{children}</ToastToaster>
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
