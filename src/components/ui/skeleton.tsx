import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const StyledSkeleton = styled.div<{
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}>`
  display: inline-block;
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '1rem'};
  border-radius: ${props => props.$borderRadius || '0.25rem'};
  background-color: #e5e7eb;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const SkeletonCardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const SkeletonItem = styled(StyledSkeleton)`
  margin-bottom: 0.25rem;
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  borderRadius,
}) => {
  return (
    <StyledSkeleton
      className={className}
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <SkeletonCardContainer>
      <SkeletonItem $height="1.5rem" $width="75%" style={{ marginBottom: '0.5rem' }} />
      <SkeletonItem $width="100%" />
      <SkeletonItem $width="66%" />
      <SkeletonItem $width="50%" style={{ marginBottom: 0 }} />
    </SkeletonCardContainer>
  );
}; 