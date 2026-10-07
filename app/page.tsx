'use client'

import { useMemo, useState } from 'react'
import { Check, ChevronRight, RotateCcw, Sparkles, Trophy } from 'lucide-react'

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

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7ec] text-[#321815]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-7 pt-6 sm:px-6">
        <header className="flex items-center justify-between">
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

        <section className="pb-5 pt-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8c27d] bg-[#fff0cd] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a16]">
            <span className="size-1.5 rounded-full bg-[#d96a24]" />
            A festive challenge
          </div>
          <h1 className="font-serif text-[42px] leading-[0.98] tracking-[-0.045em] text-[#7c2424]">Unscramble the<br /><span className="text-[#d56a25]">celebration</span></h1>
          <p className="mx-auto mt-4 max-w-[290px] text-[15px] leading-6 text-[#805b4e]">Put the pieces in place to reveal a special Navarathri wish from your CSE, AIML & CSD family.</p>
        </section>

        <section aria-label="Navarathri image puzzle" className="relative rounded-[28px] border-4 border-[#e6a94b] bg-[#d47a26] p-2.5 shadow-[0_16px_35px_rgba(122,50,25,0.16)]">
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
                  className={`relative overflow-hidden rounded-[10px] border-2 bg-[#df8a3b] transition duration-200 ${isSelected ? 'z-10 scale-[0.94] border-[#fff4c9] shadow-[0_0_0_3px_#a9322c]' : 'border-[#f8dca0]/80 hover:brightness-105 active:scale-[0.97]'}`}
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

        {isSolved ? (
          <section className="mt-6 rounded-[24px] border border-[#e4b458] bg-[#fff0c9] p-5 text-center shadow-[0_10px_25px_rgba(160,74,38,0.1)]" aria-live="polite">
            <div className="mx-auto mb-2 flex size-11 items-center justify-center rounded-full bg-[#a9322c] text-[#ffe9ac]"><Trophy className="size-5" /></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a04a26]">Puzzle complete</p>
            <h2 className="mt-2 font-serif text-[25px] leading-tight text-[#7c2424]">Happy Navaratri!</h2>
            <p className="mt-2 text-sm leading-5 text-[#805b4e]">The Departments of CSE, AIML & CSD of Easwari Engineering College wish you a joyful Navaratri.</p>
            <button type="button" onClick={resetPuzzle} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#a9322c]">Play again <ChevronRight className="size-4" /></button>
          </section>
        ) : (
          <p className="mt-auto pt-8 text-center text-xs font-medium tracking-wide text-[#b18a76]">May this season bring light, learning & joy.</p>
        )}
      </div>
    </main>
  )
}
