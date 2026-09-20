import { useState } from "react";
import type React from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() === "") {
      setError("Todo text is required.");
      return;
    }
    setError("");
    onAdd(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mb-4">
      <label htmlFor="todo-text" className="sr-only">
        Todo
      </label>
      <div className="flex gap-2">
        <input
          id="todo-text"
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="What needs doing?"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </form>
  );
}