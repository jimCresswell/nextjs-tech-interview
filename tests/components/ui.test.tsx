import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

// Example component tests
describe('UI Components', () => {
  describe('Button', () => {
    it('renders correctly', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Card', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <div data-testid="card-content">Card content</div>
        </Card>
      );
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('Select', () => {
    it('renders options correctly', () => {
      const options = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ];
      
      render(
        <Select 
          label="Status" 
          options={options} 
          value="active" 
          onChange={() => {}}
        />
      );
      
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Inactive' })).toBeInTheDocument();
    });

    it('calls onChange when an option is selected', async () => {
      const options = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ];
      
      const handleChange = vi.fn();
      
      render(
        <Select 
          label="Status" 
          options={options} 
          value="active" 
          onChange={handleChange}
        />
      );
      
      // Note: This test would need to be expanded by the candidate
      // userEvent.selectOptions is complex with controlled components
      // This is a placeholder for them to complete
    });
  });
}); 