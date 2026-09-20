import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-3xl! font-semibold">404</h1>
      <p className="mt-2 text-slate-600">That page doesn't exist.</p>
      <Link
        to="/todos"
        className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Back to todos
      </Link>
    </section>
  );
}