import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function SignOut() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [done, setDone] = useState<boolean>(false);

  function handleConfirm() {
    signOut();
    setDone(true);
  }

  return (
    <section className="max-w-sm">
      <h1 className="mb-4 text-3xl! font-semibold">Sign out</h1>

      {done ? (
        <div>
          <p className="mb-3 rounded-md bg-green-50 p-3 text-sm text-green-800">
            You've been signed out.
          </p>
          <Link
            to="/signin"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Sign in again
          </Link>
        </div>
      ) : user ? (
        <div>
          <p className="mb-4 text-sm">
            Sign out of <span className="font-medium">{user.email}</span>?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm">
          You're not signed in.{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </p>
      )}
    </section>
  );
}