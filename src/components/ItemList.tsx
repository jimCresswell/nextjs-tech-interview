import React from "react";
import type { NormalizedItem, NormalizedItems } from "@/lib/types";

type ItemListProps = {
  items: NormalizedItems;
};

/**
 * Validates that an item has the correct structure
 * @param item The item to validate
 * @returns True if the item is valid, false otherwise
 */
function isValidItem(item: unknown): item is NormalizedItem {
  if (!item || typeof item !== 'object') return false;
  
  const typedItem = item as Record<string, unknown>;
  
  return (
    typeof typedItem.id === 'number' &&
    typeof typedItem.name === 'string' &&
    ['active', 'inactive', 'unknown'].includes(typedItem.status as string) &&
    typeof typedItem.price === 'number' &&
    typeof typedItem.inventory === 'number'
  );
}

/**
 * ItemList component to display a list of items in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.items - An array of item objects to display.
 * @returns The rendered table of items.
 * @throws {Error} If any item in the array is not a valid NormalizedItem
 */
export default function ItemList({ items }: ItemListProps): React.JSX.Element {
  // Validate all items before rendering
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  for (const item of items) {
    if (!isValidItem(item)) {
      throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
    }
  }
  
  return (
    <div>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Price</th>
              <th>Inventory</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description || "N/A"}</td>
                  <td>{item.status}</td>
                  <td>${price}</td>
                  <td>{item.inventory}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
