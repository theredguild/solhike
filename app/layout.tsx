import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutShell } from "./components/layout-shell"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TRG's Solidity Learning Hikes",
  description:
    "A collection of progressive code walkthroughs for learning Solidity, from basics to security patterns.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}