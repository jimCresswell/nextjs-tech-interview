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
    const errorRegex = /Invalid name/;
    expect(() => normalizeItem(item)).toThrow(errorRegex);
  });

  // The candidate should implement and add more tests
  it.todo("should detect incorrect IDs", () => {});
});
