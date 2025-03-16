import React from "react";
import type { Items } from "@/lib/types";


type ItemListProps = {
  items: Items;
};
/**
 * ItemList component to display a list of items in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.items - An array of item objects to display.
 * @returns The rendered table of items.
 */
export default function ItemList({ items }: ItemListProps): JSX.Element { 
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
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description || "N/A"}</td>
                <td>{item.status}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
