import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDirectory from "./UserDirectory";
import type { User } from "../types";

const makeUser = (id: number, name: string): User => ({
  id,
  name,
  username: name.toLowerCase().replace(" ", ""),
  email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
  phone: "555-0100",
  website: "example.com",
  company: { name: "Acme" },
  address: { street: "1 Main St", suite: "Apt 1", city: "Testville", zipcode: "00000" },
});

function renderDirectory() {
  return render(
    <MemoryRouter>
      <UserDirectory />
    </MemoryRouter>
  );
}

describe("UserDirectory", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a skeleton, then the users once the fetch resolves", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [makeUser(1, "Ada Lovelace"), makeUser(2, "Alan Turing")],
      })
    );

    renderDirectory();

    expect(screen.getByRole("list", { name: /loading users/i })).toBeInTheDocument();

    // findBy* waits for the async data to appear
    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Alan Turing")).toBeInTheDocument();

    // ...and the skeleton is gone
    expect(screen.queryByRole("list", { name: /loading users/i })).toBeNull();
  });

  it("shows an error message when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    renderDirectory();

    expect(await screen.findByText(/couldn't load users/i)).toBeInTheDocument();
    expect(screen.queryByText("Ada Lovelace")).toBeNull();
  });
});