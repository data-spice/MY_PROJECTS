import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import type { ExpensePayload } from "../types/expense";

const categories = ["Food", "Transport", "Utilities", "Housing", "Health", "Entertainment", "Shopping", "Other"];

interface ExpenseFormProps {
  onSubmit: (payload: ExpensePayload) => Promise<void>;
  disabled: boolean;
}

const today = new Date().toISOString().slice(0, 10);

export function ExpenseForm({ onSubmit, disabled }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(today);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit({
      description: description.trim(),
      category,
      amount: Number(amount),
      expense_date: expenseDate,
    });

    setDescription("");
    setCategory(categories[0]);
    setAmount("");
    setExpenseDate(today);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">Add Expense</h2>
        <p className="mt-1 text-sm text-slate-500">Record a new transaction.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="xl:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            maxLength={255}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Lunch with client"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Amount</span>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
            min="0.01"
            step="0.01"
            type="number"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="125.50"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Date</span>
          <input
            value={expenseDate}
            onChange={(event) => setExpenseDate(event.target.value)}
            required
            type="date"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 md:self-end"
        >
          <Plus className="h-4 w-4" />
          {disabled ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </section>
  );
}
