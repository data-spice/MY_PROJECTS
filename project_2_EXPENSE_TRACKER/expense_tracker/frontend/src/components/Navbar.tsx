import { Menu, WalletCards } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-soft">
            <WalletCards className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Finance Dashboard</p>
            <h1 className="text-lg font-semibold text-slate-950">Expense Tracker</h1>
          </div>
        </div>
        <div className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 sm:block">
          Personal budget overview
        </div>
      </div>
    </header>
  );
}
