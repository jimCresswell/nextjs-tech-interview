import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const StyledCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 1rem;
`;

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <StyledCard className={className} data-testid="card">
      {children}
    </StyledCard>
  );
}; 