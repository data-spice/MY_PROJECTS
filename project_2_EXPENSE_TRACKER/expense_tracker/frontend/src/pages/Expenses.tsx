import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { ExpenseTable } from "../components/ExpenseTable";
import { SearchBar } from "../components/SearchBar";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

export function Expenses() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const { expenses, loading, mutating, error, successMessage, removeExpense, refresh } = useExpenses(categoryFilter);

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
          <p className="text-sm font-medium text-blue-700">Transactions</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">Expenses</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchBar value={categoryFilter} onChange={setCategoryFilter} />
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}
      {successMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

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
