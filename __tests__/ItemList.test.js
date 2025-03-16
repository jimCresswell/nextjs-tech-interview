import { render, screen } from '@testing-library/react';
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
