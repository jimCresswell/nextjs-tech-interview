/**
 * Fetches items from the JSON server.
 * @returns {Promise<Array>} A promise that resolves to an array of items.
 */
export async function fetchItems() {
  const response = await fetch('http://localhost:3001/items');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
