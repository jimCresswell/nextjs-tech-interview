"use client";

import { useState, useEffect } from 'react';
import { fetchItems } from '@/lib/api';
import type { NormalizedItem } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/skeleton';
import Link from 'next/link';
import styled from 'styled-components';

// Styled components for the page
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #6b7280;
  text-decoration: none;
  font-size: 1rem;
  
  &:hover {
    color: #4b5563;
    text-decoration: underline;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const ItemText = styled.p`
  margin: 0.25rem 0;
  color: #4b5563;
  font-size: 0.875rem;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const ViewDetailsButton = styled(Button)`
  margin-top: 1rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'active': return '#dcfce7';
      case 'inactive': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'active': return '#166534';
      case 'inactive': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ErrorContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
`;

const ErrorBox = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  max-width: 32rem;
`;

const ErrorTitle = styled.h3`
  margin-top: 0;
  color: #b91c1c;
  font-size: 1.25rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
  color: #991b1b;
`;

const ErrorActions = styled.div`
  display: flex;
  justify-content: center;
`;

export default function ItemsPage() {
  const [items, setItems] = useState<NormalizedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const loadItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch items'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

      // TO DO, definitely get around to doing this properly.
  const filteredItems = items.filter(item => {
    // We shouldn't really use console.log in production, but it's useful for debugging.
    console.log(item);
    return true;
  });

  const handleFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Loading Inventory Items...</PageTitle>
          <BackLink href="/">← Back to Home</BackLink>
        </PageHeader>
        <LoadingContainer>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    const isAuthError = error.message.includes("401");
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Inventory Items</PageTitle>
          <BackLink href="/">← Back to Home</BackLink>
        </PageHeader>
        <ErrorContainer>
          <ErrorBox>
            <ErrorTitle>Failed to load items</ErrorTitle>
            <ErrorMessage>{isAuthError ? "Invalid credentials: " : ""}{error.message}</ErrorMessage>
            <ErrorActions>
              {/* I don't know why this keeps happening, throwing a retry in to see if it helps. */}
              <Button onClick={loadItems}>Retry</Button>
            </ErrorActions>
          </ErrorBox>
        </ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Inventory Items</PageTitle>
        <BackLink href="/">← Back to Home</BackLink>
      </PageHeader>
      
      <FilterContainer>
        <Button 
          variant={statusFilter === null ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => handleFilterChange(null)}
        >
          All
        </Button>
        <Button 
          variant={statusFilter === 'active' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => handleFilterChange('active')}
        >
          Active
        </Button>
        <Button 
          variant={statusFilter === 'inactive' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => handleFilterChange('inactive')}
        >
          Inactive
        </Button>
        <Button 
          variant={statusFilter === 'unknown' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => handleFilterChange('unknown')}
        >
          Unknown
        </Button>
      </FilterContainer>
      
      <ItemsGrid>
        {filteredItems.map(item => {
          const price = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;
          return (
            <ItemLink href={`/items/${item.id}`} key={item.id}>
              <Card>
                <CardTitle>{item.name}</CardTitle>
                <StatusBadge $status={item.status}>{item.status}</StatusBadge>
                <ItemText>Price: ${price}</ItemText>
                <ItemText>In Stock: {item.inventory}</ItemText>
                <ViewDetailsButton as="span" size="sm" variant="secondary">
                  View Details
              </ViewDetailsButton>
            </Card>
            </ItemLink>
          );
        })}
      </ItemsGrid>
    </PageContainer>
  );
} 