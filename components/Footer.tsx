export default function Footer() {
  return (
    <footer className="bg-[#0a0b0d] border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
          <span className="text-white font-black text-base sm:text-lg tracking-wider uppercase font-sans">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright & Tagline */}
        <p className="text-slate-500 text-[11px] sm:text-xs font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}