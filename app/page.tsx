'use client'

import { useState, type CSSProperties } from 'react'
import { ArrowLeft, RotateCcw, Sparkles, Trophy } from 'lucide-react'

const GRID_SIZE = 3
const TILE_COUNT = GRID_SIZE * GRID_SIZE
const solvedTiles = Array.from({ length: TILE_COUNT }, (_, index) => index)
const imageChoices = [
  { src: '/navarathri-choice-1.png', title: 'Divine glow', alt: 'Goddess Durga in a decorated temple' },
  { src: '/navarathri-choice-2.png', title: 'Light & rangoli', alt: 'A glowing Navaratri rangoli with diyas' },
  { src: '/navarathri-choice-3.png', title: 'Dance of joy', alt: 'A traditional dancer celebrating Navaratri' },
  { src: '/navarathri-choice-4.png', title: 'Temple welcome', alt: 'A decorated temple entrance with lamps' },
  { src: '/navarathri-choice-5.png', title: 'Dandiya nights', alt: 'Dancers celebrating Navaratri' },
]

function shuffledTiles() {
  const tiles = [...solvedTiles]
  for (let index = tiles.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[tiles[index], tiles[swapIndex]] = [tiles[swapIndex], tiles[index]]
  }
  if (tiles.every((tile, index) => tile === index)) [tiles[0], tiles[1]] = [tiles[1], tiles[0]]
  return tiles
}

const tileStyle = (tile: number, src: string): CSSProperties => ({
  backgroundImage: `url(${src})`,
  backgroundPosition: `${(tile % GRID_SIZE) * 50}% ${Math.floor(tile / GRID_SIZE) * 50}%`,
})

export default function Page() {
  const [imageIndex, setImageIndex] = useState<number | null>(null)
  const [tiles, setTiles] = useState(shuffledTiles)
  const [selectedTile, setSelectedTile] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const image = imageIndex === null ? null : imageChoices[imageIndex]
  const isSolved = tiles.every((tile, index) => tile === index)

  function resetPuzzle() {
    setTiles(shuffledTiles())
    setSelectedTile(null)
    setMoves(0)
  }

  function chooseImage(index: number) {
    setImageIndex(index)
    resetPuzzle()
  }

  function handleTileClick(index: number) {
    if (isSolved) return
    if (selectedTile === null) {
      setSelectedTile(index)
      return
    }
    if (selectedTile === index) {
      setSelectedTile(null)
      return
    }
    setTiles((current) => {
      const next = [...current]
      ;[next[selectedTile], next[index]] = [next[index], next[selectedTile]]
      return next
    })
    setMoves((current) => current + 1)
    setSelectedTile(null)
  }

  if (image && isSolved) return <main className="min-h-screen overflow-hidden bg-[#a9322c] text-[#fff7ec]"><div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-7 py-12 text-center celebration-screen"><div className="celebration-glow pointer-events-none absolute inset-0" /><div className="celebration-confetti pointer-events-none absolute inset-0" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span key={index} style={{ '--i': index } as CSSProperties} />)}</div><div className="relative flex size-24 items-center justify-center rounded-full border-2 border-[#f5c56d] bg-[#7c2424] text-[#ffe9ac] shadow-[0_12px_35px_rgba(50,24,21,0.25)] celebration-badge"><Trophy className="size-10" strokeWidth={1.8} /></div><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[#f5c56d]">Puzzle complete</p><h1 className="mt-4 font-serif text-[clamp(52px,9vw,96px)] leading-[0.95] tracking-[-0.045em] text-[#fff0c9]">Happy<br /><span className="text-[#f5c56d]">Navaratri!</span></h1><div className="my-8 h-px w-24 bg-[#f5c56d]/60" /><p className="max-w-2xl text-[18px] leading-8 text-[#fff0c9]">The Departments of <strong className="font-semibold text-white">CSE, AIML &amp; CSD</strong> of Easwari Engineering College wish you a joyful Navaratri.</p><div className="mt-10 flex flex-wrap justify-center gap-3"><button type="button" onClick={resetPuzzle} className="rounded-full border border-[#f5c56d] px-5 py-2.5 text-sm font-bold text-[#fff0c9] transition hover:bg-[#7c2424] active:scale-95">Play again</button><button type="button" onClick={() => setImageIndex(null)} className="rounded-full bg-[#f5c56d] px-5 py-2.5 text-sm font-bold text-[#7c2424] transition hover:bg-[#ffe09a] active:scale-95">Choose another image</button></div></div></main>

  if (!image) return <main className="min-h-screen bg-[#fff7ec] text-[#321815]"><div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-7 sm:px-8 lg:px-12"><header className="flex items-center gap-2.5"><div className="flex size-10 items-center justify-center rounded-2xl bg-[#a9322c] text-[#ffe8ad]"><Sparkles className="size-5" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a9322c]">Easwari Engineering College</p><p className="mt-0.5 text-sm font-semibold text-[#5b2d24]">Navarathri 2026</p></div></header><section className="mx-auto max-w-3xl pb-10 pt-14 text-center"><div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8c27d] bg-[#fff0cd] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a16]"><span className="size-1.5 rounded-full bg-[#d96a24]" />Choose your celebration</div><h1 className="font-serif text-[clamp(42px,7vw,76px)] leading-[0.98] tracking-[-0.045em] text-[#7c2424]">Pick an image to<br /><span className="text-[#d56a25]">start the puzzle</span></h1><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#8c6657]">Choose a Navaratri scene, then tap two pieces to swap them into place.</p></section><section aria-label="Choose a Navaratri image" className="grid grid-cols-2 gap-4 pb-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">{imageChoices.map((choice, index) => <button key={choice.src} type="button" onClick={() => chooseImage(index)} className="group overflow-hidden rounded-[22px] border-4 border-[#f0c778] bg-[#fff0cd] p-1.5 text-left shadow-[0_12px_24px_rgba(122,50,25,0.1)] transition duration-300 hover:-translate-y-2 hover:border-[#a9322c] active:scale-95"><div className="aspect-square overflow-hidden rounded-[15px]"><img src={choice.src} alt={choice.alt} className="size-full object-cover transition duration-500 group-hover:scale-110" /></div><span className="block px-2 pb-1 pt-3 text-sm font-bold text-[#7c2424]">{choice.title}</span></button>)}</section></div></main>

  return <main className="min-h-screen overflow-hidden bg-[#fff7ec] text-[#321815]"><div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-12"><header className="flex items-center justify-between"><button type="button" onClick={() => setImageIndex(null)} className="flex items-center gap-2 text-sm font-bold text-[#a9322c] transition hover:gap-3"><ArrowLeft className="size-4" />Choose another</button><button type="button" onClick={resetPuzzle} aria-label="Restart puzzle" className="flex size-10 items-center justify-center rounded-full border border-[#e8cda5] bg-[#fffaf1] text-[#a9322c] transition hover:bg-[#fff0d7] active:scale-95"><RotateCcw className="size-[18px]" /></button></header><section className="pb-6 pt-9 text-center"><div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8c27d] bg-[#fff0cd] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a16]"><span className="size-1.5 rounded-full bg-[#d96a24]" />{image.title}</div><h1 className="font-serif text-[clamp(42px,7vw,76px)] leading-[0.98] tracking-[-0.045em] text-[#7c2424]">Build the<br /><span className="text-[#d56a25]">celebration</span></h1></section><div className="mx-auto w-full max-w-[780px]"><section aria-label="Navarathri image puzzle" className="relative rounded-[30px] border-4 border-[#e6a94b] bg-[#d47a26] p-3 shadow-[0_16px_35px_rgba(122,50,25,0.16)]"><div className="mb-3 flex items-center justify-between px-2 text-xs font-bold uppercase tracking-[0.18em] text-[#fff0c9]"><span>3 × 3 board</span><span>{moves} swaps</span></div><div className="grid aspect-square grid-cols-3 gap-2 rounded-[20px] bg-[#f8dca0] p-2">{tiles.map((tile, index) => <button key={index} type="button" aria-label={`Piece ${tile + 1}, position ${index + 1}`} aria-pressed={selectedTile === index} onClick={() => handleTileClick(index)} className={`puzzle-slot relative min-h-0 overflow-hidden rounded-[16px] border-4 bg-[#fff0c9] transition duration-200 ${selectedTile === index ? 'selected-tile scale-[0.96] border-[#a9322c] ring-4 ring-[#fff0c9]' : 'border-[#f0cf8f] hover:scale-[0.98]'}`}><span className="puzzle-piece absolute inset-0" style={tileStyle(tile, image.src)} /><span className="sr-only">{selectedTile === index ? 'Selected. Tap another piece to swap.' : 'Tap to select.'}</span></button>)}</div><div className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border-4 border-[#f5c56d] bg-[#a9322c] px-7 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-[#fff6df] shadow-[0_8px_15px_rgba(90,30,20,0.22)]">Tap two pieces to swap</div></section><div className="mt-12 flex items-center justify-center gap-3 text-base text-[#8c6657]"><span className="font-semibold">Moves</span><span className="flex size-10 items-center justify-center rounded-full bg-[#f6e4c0] font-bold text-[#a34a22]">{moves}</span><span className="text-[#d8a56d]">•</span><span>Tap a tile, then another</span></div></div></div></main>
}
