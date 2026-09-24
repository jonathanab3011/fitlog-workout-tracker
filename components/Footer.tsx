export default function Footer() {
  return (
    <footer className="bg-[#0a0b0d] border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-white font-black text-lg tracking-wider uppercase">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright & Tagline */}
        <p className="text-slate-500 text-xs font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}