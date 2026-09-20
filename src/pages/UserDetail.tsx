import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { User } from "..";
import { fetchJson, HttpError } from "../lib/fetchJson";

interface UserResult {
  id: string;
  user: User | null;
  error: string | null;
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<UserResult | null>(null);

  useEffect(() => {
    if (id === undefined) return;
    let cancelled = false;

    fetchJson<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((user) => {
        if (!cancelled) setResult({ id, user, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof HttpError && err.status === 404
            ? "User not found."
            : err instanceof Error
              ? err.message
              : "Something went wrong.";
        setResult({ id, user: null, error: message });
      });

    // Cleanup: navigating /users/1 -> /users/2 can't let user 1's late
    // response overwrite user 2's page
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Loading is derived: we have no result for the id currently in the URL
  const loading = result?.id !== id;
  const user = loading ? null : result?.user ?? null;
  const error = loading ? null : result?.error ?? null;

  return (
    <section>
      <Link to="/users" className="text-sm text-slate-600 hover:underline">
        ← Back to users
      </Link>

      {loading && (
        <div aria-label="Loading user" className="mt-4 space-y-3">
          <div className="h-8 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {user && (
        <div className="mt-4">
          <h1 className="text-3xl! font-semibold">{user.name}</h1>
          <p className="text-slate-500">@{user.username}</p>
          <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
            <dt className="text-slate-500">Email</dt>
            <dd>{user.email}</dd>
            <dt className="text-slate-500">Phone</dt>
            <dd>{user.phone}</dd>
            <dt className="text-slate-500">Website</dt>
            <dd>{user.website}</dd>
            <dt className="text-slate-500">Company</dt>
            <dd>{user.company.name}</dd>
            <dt className="text-slate-500">Address</dt>
            <dd>
              {user.address.street}, {user.address.suite}, {user.address.city}{" "}
              {user.address.zipcode}
            </dd>
          </dl>
        </div>
      )}
    </section>
  );
}