import type { Todo } from "..";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
      {todos.map((t) => (
        <li key={t.id} className="flex items-center gap-3 px-3 py-2">
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => onToggle(t.id)}
            className="h-4 w-4"
          />
          <span
            className={
              t.completed ? "flex-1 text-slate-400 line-through" : "flex-1"
            }
          >
            {t.text}
          </span>
          <button
            type="button"
            onClick={() => onDelete(t.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
      {todos.length === 0 && (
        <li className="px-3 py-4 text-sm text-slate-500">Nothing here.</li>
      )}
    </ul>
  );
}