import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-blue-700">404</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">Page not found</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
