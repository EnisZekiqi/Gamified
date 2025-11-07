export default function Footer() {
  return (
    <footer className="w-full border-t border-black/40 bg-[#2563eb]/50 text-black py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col items-center md:items-start">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg tracking-wide">Gamified</span>
          <span className="text-black/50 text-xs mt-1">
            © {new Date().getFullYear()}
          </span>
        </div>
        <p className="text-sm text-black/60">
          Level up your knowledge — one quiz at a time!
        </p>
      </div>

      <div className="flex items-center gap-3 text-black/60">
        <a href="#" className="hover:text-[#2563eb] transition duration-200">
          Features
        </a>
        <a href="#" className="hover:text-[#2563eb] transition duration-200">
          FAQ
        </a>
        <a href="#" className="hover:text-[#2563eb] transition duration-200">
          Categories
        </a>
      </div>
    </footer>
  )
}
