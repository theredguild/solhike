import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TRG's Solidity Learning Hikes",
  description: "A collection of code walkthroughs for learning Solidity",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="dark bg-zinc-950 prose prose-invert mx-auto py-24 max-w-5xl"
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
