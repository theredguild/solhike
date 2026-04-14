"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { categories, hikes } from "../hikes"

export function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" onClick={() => { if (window.innerWidth < 1024) onToggle() }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-bold text-sm">
                SH
              </div>
              <div>
                <div className="text-zinc-100 font-semibold text-base leading-tight">
                  SolHike
                </div>
                <div className="text-zinc-500 text-xs leading-tight">
                  Solidity Learning Hikes
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {categories.map((category) => (
            <div key={category} className="mb-4">
              <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {category}
              </div>
              <ul className="space-y-0.5">
                {hikes
                  .filter((h) => h.category === category)
                  .map((hike) => {
                    const isActive = pathname === `/${hike.slug}`
                    return (
                      <li key={hike.slug}>
                        <Link
                          href={hike.status === "wip" ? "#" : `/${hike.slug}`}
                          onClick={() => { if (window.innerWidth < 1024) onToggle() }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? "bg-amber-500/10 text-amber-400 font-medium"
                              : hike.status === "wip"
                              ? "text-zinc-600 cursor-not-allowed"
                              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                          }`}
                        >
                          <span className="truncate">{hike.title}</span>
                          {hike.status === "wip" && (
                            <span className="ml-auto text-[10px] leading-none px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 shrink-0">
                              WIP
                            </span>
                          )}
                          {hike.status === "complete" && !isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                          )}
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800">
          <a
            href="https://docs.soliditylang.org/en/v0.8.29/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Solidity Docs
          </a>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
      aria-label="Open navigation"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}