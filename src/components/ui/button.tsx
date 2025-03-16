import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-medium: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px rgb(37, 99, 235);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$variant === 'primary' && css`
    background-color: #2563eb;
    color: white;
    &:hover:not(:disabled) {
      background-color: #1d4ed8;
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background-color: #e5e7eb;
    color: #111827;
    &:hover:not(:disabled) {
      background-color: #d1d5db;
    }
  `}

  ${props => props.$variant === 'outline' && css`
    border: 1px solid #d1d5db;
    background-color: transparent;
    &:hover:not(:disabled) {
      background-color: #f3f4f6;
    }
  `}

  ${props => props.$size === 'sm' && css`
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
  `}

  ${props => props.$size === 'md' && css`
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1rem;
  `}

  ${props => props.$size === 'lg' && css`
    height: 3rem;
    padding: 0 1.5rem;
    font-size: 1.125rem;
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}; 