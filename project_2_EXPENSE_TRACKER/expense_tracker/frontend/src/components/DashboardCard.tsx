import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  note: string;
}

export function DashboardCard({ title, value, icon: Icon, note }: DashboardCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{note}</p>
    </article>
  );
}
