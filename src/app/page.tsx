"use client";

import { Button } from '@/components/ui/button';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2563eb;
`;

const Description = styled.p`
  font-size: 1.25rem;
  max-width: 32rem;
  margin-bottom: 2rem;
  color: #4b5563;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 32rem;
`;

const Features = styled.ul`
  text-align: left;
  margin: 0;
  padding: 0 0 0 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

export default function LandingPage() {
  return (
    <Container>
      <Card>
        <Title>Inventory Management Dashboard</Title>
        <Description>
          Welcome to the Inventory Management Dashboard, where you can view, filter, and explore your inventory items.
        </Description>
        
        <Features>
          <li>Browse a complete list of inventory items</li>
          <li>Filter items by status</li>
          <li>View detailed information for each item</li>
          <li>Accessible interface with keyboard navigation</li>
        </Features>
        
        <ButtonsContainer>
          <Link href="/items" passHref>
            <Button as="a" variant="primary" size="lg">
              View Inventory
            </Button>
          </Link>
        </ButtonsContainer>
      </Card>
    </Container>
  );
} 