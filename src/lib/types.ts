/**
 * Type definitions for the inventory application
 * NOTE: These types are incomplete and will need to be improved by the candidate
 */

/**
 * Basic inventory item structure
 * ISSUE: This doesn't properly handle all the edge cases in the data
 */
export interface RawItem {
  id: number;
  name: string;
  status?: string;
  price?: number | string;
  inventory?: number | string;
  description?: string;
}
export function isRawItem(item: unknown): item is RawItem {
  return typeof item === "object" && item !== null && "id" in item;
}
export type RawItems = RawItem[];
export function isRawItems(items: unknown): items is RawItems {
  return Array.isArray(items) && items.every(isRawItem);
}

/**
 * Example of a more robust normalized item type that the candidate might create
 */
export interface NormalizedItem {
  id: number;
  name: string;
  status: "active" | "inactive" | "unknown";
  price: number;
  inventory: number;
  description?: string;
}
export type NormalizedItems = NormalizedItem[];
