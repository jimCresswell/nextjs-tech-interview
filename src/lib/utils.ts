import { NormalizedItem } from "./types";

/**
 * Normalizes a single inventory item to handle data inconsistencies
 *
 * TODO: The candidate should improve this function to handle:
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
  // Simple stub implementation that passes tests
  if (!item || typeof item !== "object") {
    throw new Error("Invalid item data");
  }

  const data = item as Record<string, number | string | null | undefined>;

  // Here was are using type assertions to ensure the types look correct to typescript,
  // however, this is not the best practice, we need to implement some kinds of
  // type guards and data normalization functions to ensure the data is really correct.
  // `name` has been handled for you as an example.
  const id = data.id as number;
  const status = data.status as "active" | "inactive" | "unknown";
  const price = data.price as number;
  const inventory = data.inventory as number;
  const description = data.description as string;

  // Get the raw name
  const name = data.name;
  // Define a type guard function to check the type and structure of the variable.
  function isName(name: unknown): name is string {
    return (
      typeof name === "string" &&
      name !== null &&
      name !== undefined &&
      name !== ""
    );
  }
  // Use the type guard function to check variable and throw an error if it's not the right type.
  // If this check passes, then after this point TypeScript will know that the variable is a string.
  // There may be issues with our code, there may be issues with the data.
  if (!isName(name)) {
    throw new TypeError(`Invalid name: ${name}`);
  }

  return {
    id,
    name,
    status,
    price,
    inventory,
    description,
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
