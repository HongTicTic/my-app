import type { TodoFilter } from "../..";

interface FilterBarProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
  completedCount: number;
  remainingCount: number;
}

const filters: TodoFilter[] = ["all", "active", "completed"];

export default function FilterBar({
  filter,
  onFilterChange,
  onClearCompleted,
  completedCount,
  remainingCount,
}: FilterBarProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="text-sm text-slate-600">{remainingCount} left</span>
      <div className="ml-auto flex gap-1">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => onFilterChange(f)}
            className={
              filter === f
                ? "rounded-md bg-slate-900 px-3 py-1 text-sm capitalize text-white"
                : "rounded-md border border-slate-300 px-3 py-1 text-sm capitalize hover:bg-slate-50"
            }
          >
            {f}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear completed
      </button>
    </div>
  );
}