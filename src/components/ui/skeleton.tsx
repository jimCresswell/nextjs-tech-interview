import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
}) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
      aria-hidden="true"
      data-testid="skeleton-loader"
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
      <Skeleton className="mb-2" height="h-6" width="w-3/4" />
      <Skeleton className="mb-1" />
      <Skeleton className="mb-1" width="w-2/3" />
      <Skeleton className="mb-1" width="w-1/2" />
    </div>
  );
}; 