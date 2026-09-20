import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDirectory() {
  const { data: users, loading, error } = useFetch<User[]>(USERS_URL);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);

  // `users` is User[] | null: the `?? []` is the null check TypeScript demands
  const visibleUsers = (users ?? []).filter((u) =>
    u.name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
  );

  return (
    <section>
      <h1 className="mb-4 text-3xl! font-semibold">Users</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search users"
        placeholder="Search by name"
        className="mb-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
      <p className="mb-4 text-xs text-slate-500">
        Raw: “{query}” · Debounced: “{debouncedQuery}”
      </p>

      {loading && (
        <ul aria-label="Loading users" className="space-y-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n} className="h-14 animate-pulse rounded-lg bg-slate-200" />
          ))}
        </ul>
      )}

      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          Couldn't load users: {error}
        </p>
      )}

      {!loading && !error && visibleUsers.length === 0 && (
        <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No users found.
        </p>
      )}

      {!loading && !error && visibleUsers.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
          {visibleUsers.map((u) => (
            <li key={u.id}>
              <Link
                to={`/users/${u.id}`}
                className="block px-3 py-3 hover:bg-slate-50"
              >
                <span className="font-medium">{u.name}</span>
                <span className="block text-sm text-slate-500">{u.email}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}