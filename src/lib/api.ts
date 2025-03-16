/**
 * API client for interacting with the inventory service
 */

/**
 * Fetches all inventory items from the API
 * @returns {Promise<any[]>} The list of inventory items
 */
export async function fetchItems() {
  const response = await fetch("http://localhost:3001/items", {
    headers: {
      Authorization: "Basic " + btoa("test_user:wrong_password"),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches a single inventory item by ID
 * @param {number} id - The ID of the item to fetch
 * @returns {Promise<any>} The inventory item
 */
export async function fetchItemById(id: number | string) {
  const response = await fetch(`http://localhost:3001/items/${id}`, {
    headers: {
      Authorization: "Basic " + btoa("test_user:wrong_password"),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
