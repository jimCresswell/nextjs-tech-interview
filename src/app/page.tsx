"use client";

import { useState, useEffect } from 'react';
import { fetchItems } from '@/lib/api';
import { Card } from '@/components/ui/card';
import styled from 'styled-components';

import type { Items } from '@/lib/types';

const PageContainer = styled.main`
  padding: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 1rem;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0;
`;

const ItemText = styled.p`
  margin: 0.25rem 0;
`;

const ItemDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const ErrorBox = styled.div`
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  width: 100%;
  max-width: 42rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: #b91c1c;
`;

const ErrorMessage = styled.p`
  color: #b91c1c;
`;

const ErrorHint = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #ef4444;
`;

export default function Dashboard() {
  const [items, setItems] = useState<Items>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          const message = err.message;
          if (message.includes('401')) {
            setError(`Unauthorized: Please check your credentials: ${message}`);
          } else {
            setError(`Failed to load items: ${err.message}`);
          }
        } else {
          setError('Failed to load items: Unknown error');
        }
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading inventory items...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorBox role="alert">
          <div>
            <ErrorTitle>Error</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <ErrorHint>
              <code>{JSON.stringify(error, null, 2)}</code>
            </ErrorHint>
          </div>
        </ErrorBox>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Inventory Dashboard</PageTitle>
      
      <FilterContainer>
        {/* Filter controls would go here */}
      </FilterContainer>

      <ItemsGrid>
        {items.map((item) => (
          <Card key={item.id}>
            <CardTitle>{item.name || 'Unnamed Item'}</CardTitle>
            <ItemText>ID: {item.id}</ItemText>
            <ItemText>Status: {item.status || 'Unknown'}</ItemText>
            <ItemText>Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</ItemText>
            {item.inventory !== undefined && <ItemText>Inventory: {item.inventory}</ItemText>}
            {item.description && <ItemDescription>{item.description}</ItemDescription>}
          </Card>
        ))}
      </ItemsGrid>
    </PageContainer>
  );
} 