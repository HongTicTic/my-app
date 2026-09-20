import { useState } from "react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function SignIn() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    signIn(trimmed);
    navigate("/shop");
  }

  return (
    <section className="max-w-sm">
      <h1 className="mb-4 text-3xl! font-semibold">Sign in</h1>

      {user && (
        <p className="mb-4 rounded-md bg-slate-100 p-3 text-sm">
          You're already signed in as {user.email}.{" "}
          <Link to="/signout" className="underline">
            Sign out
          </Link>
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-3 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          {user ? "Switch account" : "Sign in"}
        </button>
      </form>
    </section>
  );
}