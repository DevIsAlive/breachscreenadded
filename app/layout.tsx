import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LocalizationProvider } from "@/components/localization-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Roblox V2 - Win Prizes",
  description: "Win amazing Roblox prizes and gift cards",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}        `}</style>
      </head>
      <body>
        <LocalizationProvider>{children}</LocalizationProvider>
      </body>
    </html>
  )
}
