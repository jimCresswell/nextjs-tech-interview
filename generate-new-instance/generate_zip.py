import zipfile

# Define the file structure as a dictionary where keys are file paths and values are the file contents.
files = {
    "README.md": r"""# Technical Interview Exercise: Next.js Dashboard with JSON Server

This exercise is designed to assess your skills in full-stack development, problem-solving, test-driven development (TDD), and code quality. You will work on a small Next.js application that consumes data from a JSON server. The data file contains intentional issues for you to identify and resolve.

## Project Structure

```
technical-interview-exercise/
├── README.md
├── db.json
├── package.json
├── pages/
│   └── index.js
├── components/
│   └── ItemList.js
├── services/
│   └── api.js
└── __tests__/
    └── ItemList.test.js
```

## Requirements

1. **Data Source:**
   - The provided `db.json` file contains a collection of items with properties such as `id`, `name`, `description`, `status`, and `price`.
   - There are intentional issues within the data (e.g., the `id` for one item is a string instead of a number; some items have missing fields or incorrect types). Your task is to identify these issues and propose improvements or fixes.

2. **Data Server:**
   - Use the `json-server` package to serve the JSON data as a RESTful API.
   - Run the server with the following command:
     ```
     npx json-server --watch db.json --port 3001
     ```
   - The API endpoint for items will be available at `http://localhost:3001/items`.

3. **Next.js Application:**
   - Create a Next.js application that fetches the data from the JSON server on the client side.
   - Display the data using a user-friendly UI (e.g., a table, list, or card layout).
   - Optionally, implement features for filtering, sorting, or editing items.

4. **Unit Tests:**
   - Implement unit tests using Jest and React Testing Library.
   - Write tests covering data fetching, data processing, UI rendering, and user interactions.
   - Use TDD practices—start by writing tests before implementing functionality.

5. **Code Quality:**
   - Add clear and concise JSDoc comments throughout the code.
   - Ensure the code is readable, maintainable, and follows best practices.

6. **Interviewee Evaluation:**
   - **Problem-Solving Skills:** Identify and resolve issues in the data and application.
   - **Communication:** Clearly explain your thought process, the issues you encounter, and your solutions.
   - **TDD and Unit Testing:** Write comprehensive tests and use them to guide your development.
   - **Code Commenting:** Use JSDoc to document functions, parameters, and returns.
   - **Overall Approach:** Communicate the rationale behind your design decisions, any trade-offs, and your overall approach.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the JSON Server:**
   In a terminal window, run:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
   The server will be running at `http://localhost:3001`.

3. **Start the Next.js Application:**
   In another terminal window, run:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

4. **Run Unit Tests:**
   To execute the unit tests, run:
   ```bash
   npm run test
   ```

5. **Your Tasks:**
   - Review the intentional issues in `db.json` (e.g., data type mismatches, missing fields, extra fields).
   - Enhance the Next.js application to handle the data gracefully.
   - Optionally add functionality such as filtering or sorting.
   - Write additional tests as needed and refactor the code for better performance and readability.

Good luck with the exercise!
""",
    "db.json": r"""{
  "items": [
    {
      "id": "1",
      "name": "Item One",
      "description": "A sample item",
      "status": "active",
      "price": "10.99"
    },
    {
      "id": 2,
      "name": "Item Two",
      "status": 1,
      "price": 20.5,
      "extraField": "This field is not needed"
    },
    {
      "id": 3,
      "name": "Item Three",
      "description": null,
      "status": "active",
      "price": 15.0
    },
    {
      "id": 4,
      "name": "Item Four",
      "description": "Fourth item",
      "status": "inactive",
      "price": "not available"
    }
  ]
}""",
    "package.json": r"""{
  "name": "technical-interview-exercise",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "json-server": "latest",
    "jest": "latest",
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest"
  }
}""",
    "pages/index.js": r"""import { useEffect, useState } from 'react';
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
""",
    "components/ItemList.js": r"""/**
 * ItemList component to display a list of items in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.items - An array of item objects to display.
 * @returns {JSX.Element} The rendered table of items.
 */
export default function ItemList({ items }) {
  return (
    <div>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
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
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description || 'N/A'}</td>
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
""",
    "services/api.js": r"""/**
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
""",
    "__tests__/ItemList.test.js": r"""import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '../components/ItemList';

describe('ItemList component', () => {
  const sampleItems = [
    { id: '1', name: 'Item One', description: 'A sample item', status: 'active', price: '10.99' },
    { id: 2, name: 'Item Two', description: '', status: 'inactive', price: 20.5 }
  ];

  /**
   * Test to verify that the component displays a message when there are no items.
   */
  test('renders no items message when empty', () => {
    render(<ItemList items={[]} />);
    expect(screen.getByText('No items found.')).toBeInTheDocument();
  });

  /**
   * Test to verify that the component renders a table with item data.
   */
  test('renders a table with item data', () => {
    render(<ItemList items={sampleItems} />);
    expect(screen.getByText('Item One')).toBeInTheDocument();
    expect(screen.getByText('Item Two')).toBeInTheDocument();
  });
});
"""
}

# Create the zip file and write each file with its path.
zip_filename = "technical-interview-exercise.zip"
with zipfile.ZipFile(zip_filename, "w") as zipf:
    for filepath, content in files.items():
        zipf.writestr(filepath, content)

print(f"Created {zip_filename} successfully.")
