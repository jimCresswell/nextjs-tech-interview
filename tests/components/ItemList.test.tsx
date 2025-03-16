import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '../../src/components/ItemList';
import type { NormalizedItems, RawItems } from '../../src/lib/types';

describe('ItemList component', () => {
  const goodItems: NormalizedItems = [
    { id: 1, name: 'Item One', description: 'A sample item', status: 'active', price: 10.99, inventory: 10 },
    { id: 2, name: 'Item Two', description: '', status: 'inactive', price: 20.5, inventory: 20 }
  ];

  const badItems: unknown = [
    { id: "1", name: 'Item One', description: 'A sample item', status: 'active', price: 10.99 },
    { id: "two", name: 'Item Two', description: '', status: 'hoopy', price: "fiver", inventory: 20 }
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
    render(<ItemList items={goodItems} />);
    expect(screen.getByText('Item One')).toBeInTheDocument();
    expect(screen.getByText('Item Two')).toBeInTheDocument();
  });

  test('Deals with bad data', () => {
    expect(() => render(<ItemList items={badItems as NormalizedItems} />)).toThrow();
  });
});
