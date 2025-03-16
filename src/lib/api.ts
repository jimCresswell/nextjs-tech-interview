/**
 * API client for interacting with the inventory service
 */

import type {
  NormalizedItem,
  NormalizedItems,
  RawItem,
  RawItems,
} from "./types";
import { normalizeItem, normalizeItems } from "./utils";

/**
 * Hard coded user details for early development
 *
 * @returns The user details
 */
function getUserDetails() {
  return {
    username: "test_user",
    // DEBUG: Just for testing, don't let this get to production.
    password:
      "definitely_the_wrong_password-what_is_the_server_auth_middleware_expecting?",
  };
}

/**
 * Get the authorization header
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {string} The authorization header
 */
function getAuthorizationHeader(username: string, password: string) {
  return "Basic " + btoa(`${username}:${password}`);
}

/**
 * Fetches all inventory items from the API
 *
 * TODO: The authentication is currently failing with a 401 Unauthorized error.
 * The candidate needs to identify the issue with the credentials below.
 *
 * @returns The list of inventory items
 */
export async function fetchItems(): Promise<NormalizedItems> {
  const { username, password } = getUserDetails();
  const response = await fetch("http://localhost:3001/items", {
    headers: {
      Authorization: getAuthorizationHeader(username, password),
    },
  });

  if (!response.ok) {
    throw new Error(`API error on /items: ${response.status}`);
  }

  const rawItems: RawItems = await response.json();
  return normalizeItems(rawItems);
}

/**
 * Fetches a single inventory item by ID
 * @param id - The ID of the item to fetch
 * @returns The inventory item
 */
export async function fetchItemById(id: number): Promise<NormalizedItem> {
  const { username, password } = getUserDetails();
  const response = await fetch(`http://localhost:3001/items/${id}`, {
    headers: {
      Authorization: getAuthorizationHeader(username, password),
    },
  });

  if (!response.ok) {
    throw new Error(`API error on /items/${id}: ${response.status}`);
  }

  const rawItem: RawItem = await response.json();
  return normalizeItem(rawItem);
}
