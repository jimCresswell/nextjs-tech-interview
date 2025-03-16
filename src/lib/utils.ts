import { NormalizedItem } from "./types";

/**
 * Normalizes a single inventory item to handle data inconsistencies
 *
 * TODO: This function needs to be implemented by the candidate to handle:
 * - Converting string IDs to numbers
 * - Handling null or undefined names
 * - Normalizing status values to lowercase and valid options
 * - Converting string prices to numbers
 * - Handling negative prices
 * - Converting string inventory values to numbers
 *
 * @param item The raw item data from the API
 * @returns A normalized item with consistent types and values
 */
export function normalizeItem(item: unknown): NormalizedItem {
  // This is just a placeholder implementation
  // The candidate should implement proper validation and normalization
  if (!item || typeof item !== "object") {
    throw new Error("Invalid item data");
  }

  return {
    id: 0,
    name: "Placeholder",
    status: "unknown",
    price: 0,
    inventory: 0,
  };
}

/**
 * Normalizes an array of inventory items
 *
 * @param items The raw items data from the API
 * @returns An array of normalized items
 */
export function normalizeItems(items: unknown[]): NormalizedItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => {
    try {
      return normalizeItem(item);
    } catch (error) {
      console.error("Error normalizing item:", error);
      // Return a fallback item
      return {
        id: 0,
        name: "Error: Invalid Item",
        status: "unknown",
        price: 0,
        inventory: 0,
      };
    }
  });
}
