import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  it("renders a labelled input and an Add button", () => {
    render(<AddTodo onAdd={vi.fn()} />);

    expect(screen.getByLabelText(/todo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("submits the trimmed text and clears the input", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);
    const input = screen.getByLabelText(/todo/i);

    await user.type(input, "  Buy milk  ");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith("Buy milk");
    expect(input).toHaveValue("");
  });

  it("shows a validation error when submitted empty", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Todo text is required.")).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("rejects whitespace-only input", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/todo/i), "     ");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Todo text is required.")).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("removes the error once a valid todo is submitted", async () => {
    const user = userEvent.setup();
    render(<AddTodo onAdd={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Todo text is required.")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/todo/i), "Walk the dog");
    await user.click(screen.getByRole("button", { name: /add/i }));

    // queryBy* returns null when the element is gone
    expect(screen.queryByText("Todo text is required.")).toBeNull();
  });

  it("submits with the Enter key", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/todo/i), "Ship it{Enter}");

    expect(onAdd).toHaveBeenCalledWith("Ship it");
  });
});