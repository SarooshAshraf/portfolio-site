export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center sm:text-left">
          Designed to help recruiters feel the craft, not just read the resume.
        </p>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-500 sm:text-right">
          Copyright {year} Saroosh Ashraf
        </p>
      </div>
    </footer>
  )
}
