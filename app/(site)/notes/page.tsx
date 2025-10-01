'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState, type FormEvent, type MouseEvent } from 'react'

type ApiNote = {
  id: number
  title: string
  content: string
  image_data: string | null
  created_at: string
  updated_at: string
}

type Note = {
  id: string
  title: string
  body: string
  date: string
  imageData: string | null
}

const envBase = (process.env.NEXT_PUBLIC_NOTES_API_URL ?? '').trim()
const buildApiBase = () => (envBase ? envBase.replace(/\/$/, '') : '')

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(value))

const readFileAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string) ?? '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const mapApiNote = (note: ApiNote): Note => ({
  id: String(note.id),
  title: note.title,
  body: note.content,
  date: note.created_at,
  imageData: note.image_data ?? null,
})

export default function NotesPage() {
  const [apiBase, setApiBase] = useState<string>(() => buildApiBase())
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [noteActionError, setNoteActionError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (apiBase) {
      return
    }
    if (typeof window !== 'undefined') {
      const origin = window.location.origin.replace(/\/$/, '')
      setApiBase(`${origin}/api`)
    }
  }, [apiBase])

  const fetchNotes = useCallback(async () => {
    if (!apiBase) {
      return
    }
    setLoading(true)
    setError(null)
    setNoteActionError(null)
    try {
      const response = await fetch(`${apiBase}/notes`, {
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data: ApiNote[] = await response.json()
      const mapped = data.map(mapApiNote)
      setNotes(mapped)
      if (mapped.length) {
        setActiveNoteId((current) => (current && mapped.some((note) => note.id === current) ? current : mapped[0].id))
      } else {
        setActiveNoteId(null)
      }
    } catch (err) {
      console.error('Unable to load notes', err)
      setError('Unable to load notes right now. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }, [apiBase])

  useEffect(() => {
    if (!apiBase) {
      return
    }
    void fetchNotes()
  }, [apiBase, fetchNotes])

  useEffect(() => {
    if (!isFormOpen) return
    const originalOverflow = document.body.style.overflow
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFormOpen(false)
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [isFormOpen])

  const activeNote = useMemo(() => {
    if (!activeNoteId) return null
    return notes.find((note) => note.id === activeNoteId) ?? null
  }, [notes, activeNoteId])

  const handleDelete = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (isDeleting) {
      return
    }
    if (!activeNoteId) {
      return
    }
    if (!apiBase) {
      setNoteActionError('Notes API base URL is not configured yet.')
      return
    }
    if (!window.confirm('Delete this note? This cannot be undone.')) {
      return
    }
    setIsDeleting(true)
    setNoteActionError(null)
    try {
      const response = await fetch(`${apiBase}/notes/${activeNoteId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const filtered = notes.filter((note) => note.id !== activeNoteId)
      setNotes(filtered)
      setActiveNoteId((current) => {
        if (current && filtered.some((note) => note.id === current)) {
          return current
        }
        return filtered.length ? filtered[0].id : null
      })
    } catch (err) {
      console.error('Unable to delete note', err)
      setNoteActionError('Unable to delete this note right now. Please try again shortly.')
    } finally {
      setIsDeleting(false)
    }
  }, [activeNoteId, apiBase, isDeleting, notes])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNoteActionError(null)
    if (!apiBase) {
      setFormError('Notes API base URL is not configured yet.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const title = (formData.get('title') as string | null)?.trim() ?? ''
    const body = (formData.get('body') as string | null)?.trim() ?? ''
    const file = formData.get('image')

    if (!title || !body) {
      setFormError('Heading and body are required.')
      return
    }

    setFormError(null)
    setIsSubmitting(true)

    let imageData: string | null = null
    if (file instanceof File && file.size > 0) {
      try {
        imageData = await readFileAsDataURL(file)
      } catch (err) {
        console.error('Unable to read image file.', err)
        setFormError('Unable to read the selected image. Please try a different file.')
        setIsSubmitting(false)
        return
      }
    }

    try {
      const response = await fetch(`${apiBase}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: body, image_data: imageData }),
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const created: ApiNote = await response.json()
      const mapped = mapApiNote(created)
      setNotes((prev) => [mapped, ...prev.filter((note) => note.id !== mapped.id)])
      setActiveNoteId(mapped.id)
      setIsFormOpen(false)
      event.currentTarget.reset()
    } catch (err) {
      console.error('Unable to create note', err)
      setFormError('Unable to post this note. Please try again shortly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsFormOpen(false)
    }
  }

  return (
    <main className="relative isolate min-h-[calc(100vh-8rem)] overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
            Notes lab
          </span>
          <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">Fun Stuff</h1>
          <p className="mt-4 text-lg text-slate-300/90">
            My thoughts on industry, tech, and anything else :)
          </p>
        </header>

        <section>
          <h2 className="sr-only">Notes list</h2>
          {error ? (
            <div className="rounded-3xl border border-red-400/40 bg-red-500/10 p-6 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          {noteActionError ? (
            <div className="mt-4 rounded-3xl border border-red-400/40 bg-red-500/10 p-6 text-sm text-red-200">
              {noteActionError}
            </div>
          ) : null}
          {loading ? (
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 min-w-[16rem] flex-1 animate-pulse rounded-full border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : notes.length ? (
            <div className="flex flex-wrap gap-4">
              {notes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setActiveNoteId(note.id)}
                  className={`group flex min-w-[16rem] flex-1 items-center justify-between gap-4 rounded-full border px-6 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    activeNoteId === note.id
                      ? 'border-indigo-400/70 bg-indigo-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-slate-200/90 hover:border-indigo-300/40 hover:bg-indigo-500/10'
                  }`}
                >
                  <span className="text-base font-semibold">{note.title}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">
                    {formatDate(note.date)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-slate-300/80">
              <p className="text-lg font-medium">No notes yet.</p>
              <p className="mt-2 text-sm text-slate-400/90">Tap the plus button to craft your first entry.</p>
            </div>
          )}
        </section>

        <section>
          <h2 className="sr-only">Active note</h2>
          {activeNote ? (
            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.35)]">
              <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-indigo-200/80">
                    {formatDate(activeNote.date)}
                  </span>
                  <h3 className="text-3xl font-semibold text-white">{activeNote.title}</h3>
                </header>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                  <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-200/90 lg:flex-1">
                    {activeNote.body}
                  </div>
                  {activeNote.imageData ? (
                    <figure className="flex shrink-0 justify-center lg:justify-end">
                      <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_45px_rgba(15,23,42,0.35)] sm:w-48 lg:w-56">
                        <Image
                          src={activeNote.imageData}
                          alt="Note attachment"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                          unoptimized
                        />
                      </div>
                    </figure>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-red-400/60 bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-100 transition hover:border-red-300 hover:bg-red-500/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isDeleting ? 'Deleting...' : 'Delete note'}
              </button>
            </article>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300/80">
              <p className="text-base">Select a note to read its story.</p>
            </div>
          )}
        </section>
      </section>

      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-indigo-400/70 bg-indigo-500/20 text-3xl font-semibold text-white shadow-[0_20px_45px_rgba(79,70,229,0.45)] transition hover:-translate-y-0.5 hover:bg-indigo-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        aria-label="Create a new note"
      >
        +
      </button>

      {isFormOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur"
          onClick={handleOverlayClick}
        >
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/95 p-8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.55)]"
          >
            <h2 className="text-2xl font-semibold">New note</h2>
            <p className="mt-2 text-sm text-slate-300/80">
              Outline the headline, capture the insight, and drop an optional visual to keep the format consistent.
            </p>
            {formError ? (
              <p className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
                {formError}
              </p>
            ) : null}

            <label className="mt-6 block text-sm font-semibold tracking-[0.2em] text-indigo-200/80">
              Heading
              <input
                name="title"
                required
                placeholder="Give this note a sharp headline"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white outline-none transition focus:border-indigo-300/60 focus:bg-slate-900/60"
              />
            </label>

            <label className="mt-6 block text-sm font-semibold tracking-[0.2em] text-indigo-200/80">
              Body
              <textarea
                name="body"
                required
                rows={6}
                placeholder="Share the story, framework, or lesson worth remembering."
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white outline-none transition focus:border-indigo-300/60 focus:bg-slate-900/60"
              />
            </label>

            <label className="mt-6 block text-sm font-semibold tracking-[0.2em] text-indigo-200/80">
              Optional image
              <input
                name="image"
                type="file"
                accept="image/*"
                className="mt-2 w-full rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-300/80 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-indigo-300/40"
              />
            </label>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-slate-200/80 transition hover:border-white/30 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Posting...' : 'Post note'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  )
}
