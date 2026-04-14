"use client"

import { useState } from "react"
import { Sidebar, MobileMenuButton } from "./sidebar"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <MobileMenuButton onClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="lg:ml-72 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {children}
        </div>
      </main>
    </>
  )
}