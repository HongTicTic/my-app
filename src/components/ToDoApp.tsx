import { useState } from "react";
import type { Todo, TodoFilter } from "..";
import AddTodo from "./AddTodo";
import FilterBar from "./ui/FilterList";
import TodoList from "./ToDoList";

const seedTodos: Todo[] = [
  { id: 1, text: "Read the React Router docs", completed: false },
  { id: 2, text: "Lift state into TodoApp", completed: true },
  { id: 3, text: "Write the effect cleanup", completed: false },
];

// The ONE owner of todo state. Children get props down, callbacks up.
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(seedTodos);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const visibleTodos =
    filter === "all"
      ? todos
      : todos.filter((t) => (filter === "completed" ? t.completed : !t.completed));
  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.length - completedCount;

  function addTodo(text: string) {
    const nextId = Math.max(0, ...todos.map((t) => t.id)) + 1;
    setTodos([...todos, { id: nextId, text, completed: false }]);
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed));
  }

  return (
    <section>
      <h1 className="mb-4 text-3xl! font-semibold">Todos</h1>
      <AddTodo onAdd={addTodo} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        completedCount={completedCount}
        remainingCount={remainingCount}
      />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </section>
  );
}