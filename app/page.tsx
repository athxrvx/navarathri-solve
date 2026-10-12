'use client'

import { useEffect, useMemo, useState, type CSSProperties, type DragEvent } from 'react'
import { ArrowLeft, Check, RotateCcw, Sparkles, Trophy } from 'lucide-react'

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
  const [board, setBoard] = useState<(number | null)[]>(Array(TILE_COUNT).fill(null))
  const [pieces, setPieces] = useState<number[]>(solvedTiles)
  const [moves, setMoves] = useState(0)
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null)
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const image = imageIndex === null ? null : imageChoices[imageIndex]
  const isSolved = useMemo(() => board.every((tile, index) => tile === index), [board])

  useEffect(() => {
    setPieces(shuffledTiles())
  }, [])

  function chooseImage(index: number) {
    setImageIndex(index)
    resetPuzzle()
  }

  function resetPuzzle() {
    setBoard(Array(TILE_COUNT).fill(null))
    setPieces(shuffledTiles())
    setDraggedPiece(null)
    setSelectedPiece(null)
    setMoves(0)
  }

  function placePiece(slot: number, piece = draggedPiece ?? selectedPiece) {
    if (piece === null || board[slot] !== null || isSolved) return
    if (piece !== slot) return
    setBoard((current) => current.map((tile, index) => (index === slot ? piece : tile)))
    setPieces((current) => current.filter((currentPiece) => currentPiece !== piece))
    setMoves((current) => current + 1)
    setDraggedPiece(null)
    setSelectedPiece(null)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>, slot: number) {
    event.preventDefault()
    placePiece(Number(event.dataTransfer.getData('text/plain')))
  }

  if (image && isSolved) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#a9322c] text-[#fff7ec]">
        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-7 py-12 text-center celebration-screen">
          <div className="celebration-glow pointer-events-none absolute inset-0" />
          <div className="celebration-confetti pointer-events-none absolute inset-0" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span key={index} style={{ '--i': index } as CSSProperties} />)}</div>
          <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-[#f5c56d] bg-[#7c2424] text-[#ffe9ac] shadow-[0_12px_35px_rgba(50,24,21,0.25)] celebration-badge"><Trophy className="size-10" strokeWidth={1.8} /></div>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[#f5c56d]">Puzzle complete</p>
          <h1 className="mt-4 font-serif text-[clamp(52px,9vw,96px)] leading-[0.95] tracking-[-0.045em] text-[#fff0c9]">Happy<br /><span className="text-[#f5c56d]">Navaratri!</span></h1>
          <div className="my-8 h-px w-24 bg-[#f5c56d]/60" />
          <p className="max-w-2xl text-[18px] leading-8 text-[#fff0c9]">The Departments of <strong className="font-semibold text-white">CSE, AIML &amp; CSD</strong> of Easwari Engineering College wish you a joyful Navaratri.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3"><button type="button" onClick={resetPuzzle} className="rounded-full border border-[#f5c56d] px-5 py-2.5 text-sm font-bold text-[#fff0c9] transition hover:bg-[#7c2424] active:scale-95">Play again</button><button type="button" onClick={() => setImageIndex(null)} className="rounded-full bg-[#f5c56d] px-5 py-2.5 text-sm font-bold text-[#7c2424] transition hover:bg-[#ffe09a] active:scale-95">Choose another image</button></div>
        </div>
      </main>
    )
  }

  if (!image) {
    return (
      <main className="min-h-screen bg-[#fff7ec] text-[#321815]"><div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-7 sm:px-8 lg:px-12"><header className="flex items-center gap-2.5"><div className="flex size-10 items-center justify-center rounded-2xl bg-[#a9322c] text-[#ffe8ad]"><Sparkles className="size-5" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a9322c]">Easwari Engineering College</p><p className="mt-0.5 text-sm font-semibold text-[#5b2d24]">Navarathri 2026</p></div></header><section className="mx-auto max-w-3xl pb-10 pt-14 text-center"><div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8c27d] bg-[#fff0cd] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a16]"><span className="size-1.5 rounded-full bg-[#d96a24]" />Choose your celebration</div><h1 className="font-serif text-[clamp(42px,7vw,76px)] leading-[0.98] tracking-[-0.045em] text-[#7c2424]">Pick an image to<br /><span className="text-[#d56a25]">start the puzzle</span></h1><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#8c6657]">Choose your favorite Navaratri scene, then drag every piece from the desk into its matching 3 × 3 tile.</p></section><section aria-label="Choose a Navaratri image" className="grid grid-cols-2 gap-4 pb-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">{imageChoices.map((choice, index) => <button key={choice.src} type="button" onClick={() => chooseImage(index)} className="group overflow-hidden rounded-[22px] border-4 border-[#f0c778] bg-[#fff0cd] p-1.5 text-left shadow-[0_12px_24px_rgba(122,50,25,0.1)] transition duration-300 hover:-translate-y-2 hover:border-[#a9322c] active:scale-95"><div className="aspect-square overflow-hidden rounded-[15px]"><img src={choice.src} alt={choice.alt} className="size-full object-cover transition duration-500 group-hover:scale-110" /></div><span className="block px-2 pb-1 pt-3 text-sm font-bold text-[#7c2424]">{choice.title}</span><span className="block px-2 pb-2 text-xs text-[#a66f56]">Tap to play</span></button>)}</section><p className="mt-auto pb-2 text-center text-xs font-medium tracking-wide text-[#b18a76]">May this season bring light, learning &amp; joy.</p></div></main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7ec] text-[#321815]"><div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-12"><header className="flex items-center justify-between"><button type="button" onClick={() => setImageIndex(null)} className="flex items-center gap-2 text-sm font-bold text-[#a9322c] transition hover:gap-3"><ArrowLeft className="size-4" />Choose another</button><button type="button" onClick={resetPuzzle} aria-label="Restart puzzle" className="flex size-10 items-center justify-center rounded-full border border-[#e8cda5] bg-[#fffaf1] text-[#a9322c] transition hover:bg-[#fff0d7] active:scale-95"><RotateCcw className="size-[18px]" /></button></header><section className="pb-6 pt-9 text-center"><div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8c27d] bg-[#fff0cd] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a16]"><span className="size-1.5 rounded-full bg-[#d96a24]" />{image.title}</div><h1 className="font-serif text-[clamp(42px,7vw,76px)] leading-[0.98] tracking-[-0.045em] text-[#7c2424]">Build the<br /><span className="text-[#d56a25]">celebration</span></h1></section><div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]"><section aria-label="Navarathri image puzzle" className="relative mx-auto w-full max-w-[780px] rounded-[30px] border-4 border-[#e6a94b] bg-[#d47a26] p-3 shadow-[0_16px_35px_rgba(122,50,25,0.16)]"><div className="mb-3 flex items-center justify-between px-2 text-xs font-bold uppercase tracking-[0.18em] text-[#fff0c9]"><span>3 × 3 board</span><span>{moves} placed</span></div><div className="grid aspect-square grid-cols-3 gap-2 rounded-[20px] bg-[#f8dca0] p-2">{board.map((tile, slot) => <div key={slot} onDragOver={(event) => event.preventDefault()} onClick={() => placePiece(slot)} onDrop={(event) => handleDrop(event, slot)} className={`puzzle-slot relative flex min-h-0 items-center justify-center overflow-hidden rounded-[14px] border-2 border-dashed border-[#d49a43] bg-[#ffeab7]/70 ${draggedPiece === slot ? 'ring-4 ring-[#fff4ca]' : ''}`}>{tile !== null ? <div className="puzzle-piece size-full" style={tileStyle(tile, image.src)} role="img" aria-label={`Placed puzzle piece ${tile + 1}`} /> : <span className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#c28b3e]">Drop here</span>}</div>)}</div></section><aside aria-label="Puzzle pieces desk" className="rounded-[26px] border-2 border-[#e5bd71] bg-[#fff0cd] p-4 shadow-[0_12px_28px_rgba(122,50,25,0.12)]"><div className="mb-3 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a4a16]">Piece desk</p><p className="mt-1 text-sm text-[#a66f56]">Drag each piece to its matching spot</p></div><Check className="size-5 text-[#d56a25]" /></div><div className="grid grid-cols-3 gap-2 lg:grid-cols-2">{pieces.map((piece) => <div key={piece} draggable onDragStart={(event) => { setDraggedPiece(piece); event.dataTransfer.setData('text/plain', String(piece)); event.dataTransfer.effectAllowed = 'move' }} onDragEnd={() => setDraggedPiece(null)} onClick={() => setSelectedPiece(piece)} role="button" tabIndex={0} aria-label={`Drag puzzle piece ${piece + 1}`} className="puzzle-piece aspect-square cursor-grab rounded-[10px] border-2 border-[#edc678] bg-[#f8dca0] shadow-[0_5px_10px_rgba(122,50,25,0.12)] transition hover:-translate-y-1 hover:shadow-[0_9px_16px_rgba(122,50,25,0.18)] active:cursor-grabbing" style={tileStyle(piece, image.src)} />)}</div></aside></div><p className="mt-7 text-center text-sm font-medium text-[#8c6657]">Moves <span className="mx-1 inline-flex size-8 items-center justify-center rounded-full bg-[#f5e2bb] font-bold text-[#a9322c]">{moves}</span><span className="mx-2 text-[#d5aa72]">•</span>Drag pieces from the desk onto the matching outlines</p></div></main>
  )
}
