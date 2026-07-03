import { Trash2 } from "lucide-react";
import type { Expense } from "../types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (expense: Expense) => void;
}

function formatCurrency(value: string | number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function ExpenseTable({ expenses, loading, onDelete }: ExpenseTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-950">Expenses</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Description</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Category</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  Loading expenses...
                </td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="transition hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">
                    {expense.description}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {expense.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{formatDate(expense.expense_date)}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onDelete(expense)}
                      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${expense.description}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
