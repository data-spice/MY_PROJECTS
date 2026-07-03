import { useState } from "react";
import { CalendarDays, CreditCard, ReceiptText, Wallet } from "lucide-react";
import { DashboardCard } from "../components/DashboardCard";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";
import { SearchBar } from "../components/SearchBar";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function Dashboard() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const { expenses, stats, loading, mutating, error, successMessage, addExpense, removeExpense } =
    useExpenses(categoryFilter);

  async function confirmDelete() {
    if (!expenseToDelete) {
      return;
    }

    await removeExpense(expenseToDelete.id);
    setExpenseToDelete(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-700">Overview</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">Dashboard</h2>
        </div>
        <SearchBar value={categoryFilter} onChange={setCategoryFilter} />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}
      {successMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Expenses" value={formatCurrency(stats.total)} icon={Wallet} note="All recorded spending" />
        <DashboardCard title="Today's Expenses" value={formatCurrency(stats.todayTotal)} icon={CalendarDays} note="Current day spending" />
        <DashboardCard title="Monthly Expenses" value={formatCurrency(stats.monthlyTotal)} icon={CreditCard} note="Current month spending" />
        <DashboardCard title="Number of Expenses" value={String(stats.count)} icon={ReceiptText} note="Visible transactions" />
      </div>

      <ExpenseForm onSubmit={addExpense} disabled={mutating} />
      <ExpenseTable expenses={expenses} loading={loading} onDelete={setExpenseToDelete} />
      <DeleteConfirmDialog
        expense={expenseToDelete}
        onCancel={() => setExpenseToDelete(null)}
        onConfirm={confirmDelete}
        loading={mutating}
      />
    </div>
  );
}
