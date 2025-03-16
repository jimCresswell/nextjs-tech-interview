'use client';

import { useState, useEffect } from 'react';
import { fetchItems } from '@/lib/api';
import { Item } from '@/lib/types';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load items: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading inventory items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 w-full max-w-2xl" role="alert">
          <div className="flex">
            <div>
              <h2 className="text-lg font-medium text-red-700">Error</h2>
              <p className="text-red-700">{error}</p>
              <p className="mt-2 text-sm text-red-600">
                Hint: Check your API authentication settings in lib/api.ts
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>
      
      <div className="mb-4">
        {/* Filter controls would go here */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <h2 className="text-lg font-semibold">{item.name || 'Unnamed Item'}</h2>
            <p>ID: {item.id}</p>
            <p>Status: {item.status || 'Unknown'}</p>
            <p>Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
            {item.inventory !== undefined && <p>Inventory: {item.inventory}</p>}
            {item.description && <p className="mt-2 text-sm text-gray-600">{item.description}</p>}
          </Card>
        ))}
      </div>
    </main>
  );
} 