'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import { Check, RotateCcw, Sparkles, Trophy } from 'lucide-react'

const GRID_SIZE = 3
const TILE_COUNT = GRID_SIZE * GRID_SIZE
const solvedTiles = Array.from({ length: TILE_COUNT }, (_, index) => index)

function shuffledTiles() {
  const tiles = [...solvedTiles]
  for (let index = tiles.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[tiles[index], tiles[swapIndex]] = [tiles[swapIndex], tiles[index]]
  }
  if (tiles.every((tile, index) => tile === index)) {
    ;[tiles[0], tiles[1]] = [tiles[1], tiles[0]]
  }
  return tiles
}

export default function Page() {
  const [tiles, setTiles] = useState(shuffledTiles)
  const [selectedTile, setSelectedTile] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)

  const isSolved = useMemo(() => tiles.every((tile, index) => tile === index), [tiles])

  function selectTile(index: number) {
    if (isSolved) return
    if (selectedTile === null) {
      setSelectedTile(index)
      return
    }
    if (selectedTile === index) {
      setSelectedTile(null)
      return
    }

    setTiles((currentTiles) => {
      const nextTiles = [...currentTiles]
      ;[nextTiles[selectedTile], nextTiles[index]] = [nextTiles[index], nextTiles[selectedTile]]
      return nextTiles
    })
    setMoves((currentMoves) => currentMoves + 1)
    setSelectedTile(null)
  }

  function resetPuzzle() {
    setTiles(shuffledTiles())
    setSelectedTile(null)
    setMoves(0)
  }

  if (isSolved) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#a9322c] text-[#fff7ec]">
        <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-7 py-12 text-center celebration-screen">
          <div className="celebration-glow pointer-events-none absolute inset-0" />
          <div className="celebration-confetti pointer-events-none absolute inset-0" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ '--i': index } as CSSProperties} />)}
          </div>
          <div className="pointer-events-none absolute left-8 top-12 size-24 rounded-full border border-[#f5c56d]/40 celebration-ring" />
          <div className="pointer-events-none absolute bottom-16 right-4 size-40 rounded-full border border-[#f5c56d]/25 celebration-ring celebration-ring-delayed" />
          <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-[#f5c56d] bg-[#7c2424] text-[#ffe9ac] shadow-[0_12px_35px_rgba(50,24,21,0.25)] celebration-badge">
            <Trophy className="size-9" strokeWidth={1.8} />
          </div>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[#f5c56d] celebration-copy celebration-copy-one">Puzzle complete</p>
          <h1 className="mt-4 font-serif text-[48px] leading-[0.95] tracking-[-0.045em] text-[#fff0c9] celebration-copy celebration-copy-two">Happy<br /><span className="text-[#f5c56d]">Navaratri!</span></h1>
          <div className="my-8 h-px w-20 bg-[#f5c56d]/60 celebration-divider" />
          <p className="max-w-[320px] text-[18px] leading-8 text-[#fff0c9] celebration-copy celebration-copy-three">The Departments of <strong className="font-semibold text-white">CSE, AIML &amp; CSD</strong> of Easwari Engineering College wish you a joyful Navaratri.</p>
          <button type="button" onClick={resetPuzzle} className="mt-10 rounded-full border border-[#f5c56d] px-5 py-2.5 text-sm font-bold text-[#fff0c9] transition hover:bg-[#7c2424] active:scale-95 celebration-button">Play again</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7ec] text-[#321815]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-7 pt-6 sm:px-6">
        <header className="flex items-center justify-between page-enter">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#a9322c] text-[#ffe8ad] shadow-[0_6px_16px_rgba(169,50,44,0.2)]">
              <Sparkles className="size-5" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a9322c]">Easwari Engineering College</p>
              <p className="mt-0.5 text-sm font-semibold text-[#5b2d24]">Navarathri 2026</p>
            </div>
          </div>
          <button type="button" onClick={resetPuzzle} aria-label="Restart puzzle" className="flex size-10 items-center justify-center rounded-full border border-[#e8cda5] bg-[#fffaf1] text-[#a9322c] transition hover:bg-[#fff0d7] active:scale-95">
            <RotateCcw className="size-[18px]" />
          </button>
        </header>

        <section className="pb-5 pt-10 text-center page-enter page-enter-delay-1">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8c27d] bg-[#fff0cd] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a16]">
            <span className="size-1.5 rounded-full bg-[#d96a24]" />
            A festive challenge
          </div>
          <h1 className="font-serif text-[42px] leading-[0.98] tracking-[-0.045em] text-[#7c2424]">Unscramble the<br /><span className="text-[#d56a25]">celebration</span></h1>
        </section>

        <section aria-label="Navarathri image puzzle" className="relative rounded-[28px] border-4 border-[#e6a94b] bg-[#d47a26] p-2.5 shadow-[0_16px_35px_rgba(122,50,25,0.16)] puzzle-shell page-enter page-enter-delay-2">
          <div className="grid aspect-square grid-cols-3 gap-1.5 overflow-hidden rounded-[18px] bg-[#f8dca0] p-1.5">
            {tiles.map((tile, index) => {
              const row = Math.floor(tile / GRID_SIZE)
              const column = tile % GRID_SIZE
              const isSelected = selectedTile === index
              return (
                <button
                  key={`${tile}-${index}`}
                  type="button"
                  aria-label={`Puzzle tile ${index + 1}${isSelected ? ', selected' : ''}`}
                  onClick={() => selectTile(index)}
                  className={`relative overflow-hidden rounded-[10px] border-2 bg-[#df8a3b] transition duration-200 tile-enter ${isSelected ? 'z-10 scale-[0.94] border-[#fff4c9] shadow-[0_0_0_3px_#a9322c]' : 'border-[#f8dca0]/80 hover:brightness-105 active:scale-[0.97]'}`}
                  style={{ backgroundImage: "url('/navarathri-puzzle.png')", backgroundPosition: `${column * 50}% ${row * 50}%`, backgroundSize: '300% 300%' }}
                >
                  {isSelected && <span className="absolute inset-0 flex items-center justify-center bg-[#a9322c]/35"><Check className="size-7 text-white" strokeWidth={3} /></span>}
                </button>
              )
            })}
          </div>
          <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#f5c56d] bg-[#a9322c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff0c5] shadow-sm">Swap two tiles</div>
        </section>

        <div className="mt-7 flex items-center justify-center gap-2 text-sm text-[#8c6657]">
          <span className="font-medium">Moves</span>
          <span className="rounded-full bg-[#f5e4c8] px-2.5 py-1 font-bold text-[#a04a26]">{moves}</span>
          <span className="mx-1 text-[#d3ad7e]">•</span>
          <span>Tap a tile, then its destination</span>
        </div>

        <p className="mt-auto pt-8 text-center text-xs font-medium tracking-wide text-[#b18a76]">May this season bring light, learning &amp; joy.</p>
      </div>
    </main>
  )
}
