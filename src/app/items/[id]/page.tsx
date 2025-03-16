"use client";

import { useState, useEffect } from 'react';
import { fetchItemById } from '@/lib/api';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import styled from 'styled-components';
import type { NormalizedItem } from '@/lib/types';

// Styled components for the page
const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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

const ItemCard = styled(Card)`
  margin-bottom: 2rem;
  padding: 1.5rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-left: 1rem;
  vertical-align: middle;
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

const ItemPropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PropertyGroup = styled.div`
  margin-bottom: 1rem;
`;

const PropertyLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const PropertyValue = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
`;

const ItemDescription = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: #111827;
  }
  
  p {
    color: #4b5563;
    line-height: 1.5;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

// Error state components
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

// Loading state components
const LoadingContainer = styled.div`
  width: 100%;
`;

const SkeletonCard = styled(Card)`
  margin-bottom: 2rem;
  padding: 1.5rem;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SkeletonTitle = styled(Skeleton)`
  display: inline-block;
`;

const SkeletonBadge = styled(Skeleton)`
  display: inline-block;
  border-radius: 9999px;
  margin-left: 1rem;
`;

const SkeletonPropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkeletonProperty = styled.div`
  margin-bottom: 1rem;
`;

const SkeletonPropertyLabel = styled(Skeleton)`
  margin-bottom: 0.5rem;
`;

const SkeletonPropertyValue = styled(Skeleton)``;

const SkeletonDescription = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const SkeletonDescriptionTitle = styled(Skeleton)`
  margin-bottom: 0.75rem;
`;

export default function ItemDetailPage() {
  const params = useParams();
  const id = Number(params.id as string);
  
  const [item, setItem] = useState<NormalizedItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchItemById(id);
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch item'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadItem();
  }, [id]);
  
  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Loading Item Details...</PageTitle>
          <BackLink href="/items">← Back to Items</BackLink>
        </PageHeader>
        
        <LoadingContainer>
          <SkeletonCard>
            <SkeletonHeader>
              <SkeletonTitle width="60%" height="2rem" />
              <SkeletonBadge width="80px" height="1.5rem" />
            </SkeletonHeader>
            
            <SkeletonPropertyGrid>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonProperty key={index}>
                  <SkeletonPropertyLabel width="50%" height="0.875rem" />
                  <SkeletonPropertyValue width="70%" height="1.125rem" />
                </SkeletonProperty>
              ))}
            </SkeletonPropertyGrid>
            
            <SkeletonDescription>
              <SkeletonDescriptionTitle width="30%" height="1.25rem" />
              <Skeleton width="100%" height="0.875rem" />
              <Skeleton width="90%" height="0.875rem" />
              <Skeleton width="95%" height="0.875rem" />
            </SkeletonDescription>
          </SkeletonCard>
        </LoadingContainer>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Item Details</PageTitle>
          <BackLink href="/items">← Back to Items</BackLink>
        </PageHeader>
        
        <ErrorContainer>
          <ErrorBox>
            <ErrorTitle>Failed to load item</ErrorTitle>
            <ErrorMessage>{error.message}</ErrorMessage>
            <ActionButtons>
              <Button onClick={() => window.location.reload()}>Retry</Button>
              <Link href="/items" passHref>
                <Button as="a" variant="outline">Back to Items</Button>
              </Link>
            </ActionButtons>
          </ErrorBox>
        </ErrorContainer>
      </PageContainer>
    );
  }
  
  // TODO: This is a hack to deal with the fact that the price mysteriously causes an error sometimes.
  const price = typeof item?.price === 'number' ? item.price.toFixed(2) : item?.price;
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Item Details</PageTitle>
        <BackLink href="/items">← Back to Items</BackLink>
      </PageHeader>
      
      {item && (
        <ItemCard>
          <PageTitle>
            {item.name}
            <StatusBadge $status={item.status}>{item.status}</StatusBadge>
          </PageTitle>
          
          <ItemPropertyGrid>
            <PropertyGroup>
              <PropertyLabel>ID</PropertyLabel>
              <PropertyValue>{item.id}</PropertyValue>
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Price</PropertyLabel>
              <PropertyValue>${price}</PropertyValue>
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Inventory</PropertyLabel>
              <PropertyValue>{item.inventory} units</PropertyValue>
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Status</PropertyLabel>
              <PropertyValue>{item.status}</PropertyValue>
            </PropertyGroup>
          </ItemPropertyGrid>
          
          {item.description && (
            <ItemDescription>
              <h3>Description</h3>
              <p>{item.description}</p>
            </ItemDescription>
          )}
          
          <ActionButtons>
            <Button variant="primary">Edit Item (not in MVP)</Button>
            <Button variant="outline">Delete Item (not in MVP)</Button>
          </ActionButtons>
        </ItemCard>
      )}
    </PageContainer>
  );
} 