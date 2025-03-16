import { describe, it, expect } from "vitest";
import { normalizeItem } from "@/lib/utils";

describe("Data Normalization", () => {
  it("should handle missing names", () => {
    const item = {
      id: 123,
      name: null,
      status: "active",
      price: 19.99,
    };
    expect(() => normalizeItem(item)).toThrow("Invalid name: null");
  });

  // The candidate should implement and add more tests
  it.todo("should detect incorrect IDs", () => {});
});
