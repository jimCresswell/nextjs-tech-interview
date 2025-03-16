/**
 * Type definitions for the inventory application
 * NOTE: These types are incomplete and will need to be improved by the candidate
 */

/**
 * The current status of an inventory item
 * ISSUE: Doesn't handle inconsistent case formats or unknown values
 */
export type ItemStatus = "active" | "inactive" | string;

/**
 * Basic inventory item structure
 * ISSUE: This doesn't properly handle all the edge cases in the data
 */
export interface Item {
  id: number | string;
  name: string | null;
  status?: ItemStatus;
  price?: number | string;
  inventory?: number | string;
  description?: string;
}
export type Items = Item[];

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
