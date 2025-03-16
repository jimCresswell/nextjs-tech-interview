import { describe, it, expect } from "vitest";
import { normalizeItem } from "@/lib/utils";

describe("Data Normalization", () => {
  it("should convert string IDs to numbers", () => {
    const item = {
      id: "123",
      name: "Test Item",
      status: "active",
      price: 19.99,
    };
    const normalized = normalizeItem(item);

    // These assertions will fail until the candidate implements the normalizeItem function
    expect(normalized.id).toBe(123);
    expect(typeof normalized.id).toBe("number");
  });

  // The candidate should implement and add more tests
  it.todo("should handle missing names");
  it.todo("should normalize status values to lowercase");
  it.todo("should handle missing status");
  it.todo("should convert string prices to numbers");
  it.todo("should handle negative prices");
  it.todo("should handle missing prices");

  // Example of a more complete test the candidate might write
  it.skip("should handle all data inconsistencies", () => {
    const item = {
      id: "456",
      name: null,
      status: "ACTIVE",
      price: "-10.50",
      inventory: "0",
    };

    const normalized = normalizeItem(item);

    expect(normalized.id).toBe(456);
    expect(normalized.name).toBe("Unnamed Item");
    expect(normalized.status).toBe("active");
    expect(normalized.price).toBe(0); // Negative prices should be set to 0
    expect(normalized.inventory).toBe(0);
  });
});
