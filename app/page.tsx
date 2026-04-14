import Link from "next/link"
import { hikes, categories } from "./hikes"

function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case "Basics":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    case "Tokens":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "Security":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
  }
}

export default function Home() {
  return (
    <div className="pt-8 lg:pt-0">
      {/* Hero */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-bold text-lg">
            SH
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">Solidity Learning Hikes</h1>
            <p className="text-zinc-500 text-sm">Progressive code walkthroughs by The Red Guild</p>
          </div>
        </div>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
          Solidity is a high-level, object-oriented programming language designed for writing smart contracts
          on blockchain platforms, particularly Ethereum. These walkthroughs build contracts step by step,
          explaining each component from fundamentals to security patterns.
        </p>
      </div>

      {/* Hikes by category */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryHikes = hikes.filter((h) => h.category === category)
          return (
            <section key={category}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-400">
                  <CategoryIcon category={category} />
                </span>
                <h2 className="text-xl font-semibold text-zinc-200">{category}</h2>
                <span className="text-xs text-zinc-600 ml-1">
                  {categoryHikes.length} {categoryHikes.length === 1 ? "hike" : "hikes"}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {categoryHikes.map((hike) =>
                  hike.status === "complete" ? (
                    <Link
                      key={hike.slug}
                      href={`/${hike.slug}`}
                      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-amber-500/40 hover:bg-zinc-800/60 transition-all duration-150"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-zinc-100 font-medium group-hover:text-amber-400 transition-colors">
                            {hike.title}
                          </h3>
                          {hike.fileName && (
                            <span className="text-xs text-zinc-600 font-mono">{hike.fileName}</span>
                          )}
                        </div>
                        <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <p className="mt-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-2">
                        {hike.description}
                      </p>
                    </Link>
                  ) : (
                    <div
                      key={hike.slug}
                      className="block rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-5 opacity-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-zinc-500 font-medium">{hike.title}</h3>
                        </div>
                        <span className="shrink-0 text-[10px] leading-none px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-600">
                          WIP
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{hike.description}</p>
                    </div>
                  )
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}