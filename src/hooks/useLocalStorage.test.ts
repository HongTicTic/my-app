import { beforeEach, describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("k", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("reads an existing value from storage", () => {
    window.localStorage.setItem("k", JSON.stringify("saved"));
    const { result } = renderHook(() => useLocalStorage("k", "fallback"));
    expect(result.current[0]).toBe("saved");
  });

  it("writes updates to storage", () => {
    const { result } = renderHook(() => useLocalStorage<number[]>("k", []));

    act(() => {
      result.current[1]([1, 2, 3]);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);
    expect(JSON.parse(window.localStorage.getItem("k") ?? "null")).toEqual([1, 2, 3]);
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));

    act(() => {
      result.current[1]((n) => n + 1);
      result.current[1]((n) => n + 1);
    });

    expect(result.current[0]).toBe(3);
  });

  it("falls back to the initial value when stored JSON is corrupted", () => {
    window.localStorage.setItem("k", "{not valid json");
    const { result } = renderHook(() => useLocalStorage("k", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("persists across a remount (simulated refresh)", () => {
    const first = renderHook(() => useLocalStorage("k", "start"));
    act(() => {
      first.result.current[1]("changed");
    });
    first.unmount();

    const second = renderHook(() => useLocalStorage("k", "start"));
    expect(second.result.current[0]).toBe("changed");
  });
});