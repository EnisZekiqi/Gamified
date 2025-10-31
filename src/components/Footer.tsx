export default function Footer() {
  return (
    <footer className="w-full border-t border-black/40 bg-[#fff] text-black py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start">
       <div className="flex items-center gap-3">
         <span className="font-semibold text-lg tracking-wide">Gamified</span>
        <span className="text-black/50 text-xs mt-1">© {new Date().getFullYear()}</span>
       </div>
        <p className="text-sm text-black/60">Level up your knowledge — one quiz at a time!</p>
        
        </div>


      <div className="flex items-center gap-6 text-sm text-white/60">
        <a href="#features" className="hover:text-white transition">Features</a>
        <a href="#categories" className="hover:text-white transition">Categories</a>
        <a href="#faq" className="hover:text-white transition">FAQ</a>
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="hover:text-[#0251EF] transition">Features</a>
        <a href="#" className="hover:text-[#0251EF] transition">FAQ</a>
        <a href="#" className="hover:text-[#0251EF] transition">Categories</a>
      </div>
    </footer>
  )
}
