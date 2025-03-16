/**
 * API client for interacting with the inventory service
 */

function getUserDetails() {
  return {
    username: "test_user",
    password:
      "definitely_the_wrong_password-what_is_the_server_auth_middleware_expecting?",
  };
}

function getAuthorizationHeader(username: string, password: string) {
  return "Basic " + btoa(`${username}:${password}`);
}

/**
 * Fetches all inventory items from the API
 *
 * TODO: The authentication is currently failing with a 401 Unauthorized error.
 * The candidate needs to identify the issue with the credentials below.
 *
 * @returns {Promise<unknown[]>} The list of inventory items
 */
export async function fetchItems() {
  const { username, password } = getUserDetails();
  const response = await fetch("http://localhost:3001/items", {
    headers: {
      Authorization: getAuthorizationHeader(username, password),
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
 * @returns {Promise<unknown>} The inventory item
 */
export async function fetchItemById(id: number | string) {
  const { username, password } = getUserDetails();
  const response = await fetch(`http://localhost:3001/items/${id}`, {
    headers: {
      Authorization: getAuthorizationHeader(username, password),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
