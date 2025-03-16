import { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';

/**
 * Home page component.
 * Fetches items from the JSON server and displays them using the ItemList component.
 *
 * @component
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Fetch items from the JSON server.
   */
  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => {
        console.error('Error fetching items:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Item Dashboard</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
}
