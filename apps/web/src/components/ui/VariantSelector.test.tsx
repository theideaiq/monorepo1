import { render, screen, fireEvent } from '@testing-library/react';
import { VariantSelector } from './VariantSelector';
import { describe, it, expect, vi } from 'vitest';

describe('VariantSelector', () => {
  const defaultProps = {
    label: 'Color',
    options: ['Red', 'Blue', 'Green'],
    selected: 'Red',
    onChange: vi.fn(),
  };

  it('renders the label correctly', () => {
    render(<VariantSelector {...defaultProps} />);
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<VariantSelector {...defaultProps} />);
    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('indicates the selected option with aria-checked', () => {
    render(<VariantSelector {...defaultProps} />);

    // Once updated, these should have role="radio"
    // For now, checking if they exist is a start, but I'll write the test expecting the improvement
    const redOption = screen.getByRole('radio', { name: 'Red' });
    const blueOption = screen.getByRole('radio', { name: 'Blue' });

    expect(redOption).toHaveAttribute('aria-checked', 'true');
    expect(blueOption).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when an option is clicked', () => {
    render(<VariantSelector {...defaultProps} />);
    const blueOption = screen.getByText('Blue');

    fireEvent.click(blueOption);
    expect(defaultProps.onChange).toHaveBeenCalledWith('Blue');
  });

  it('has accessible radiogroup role', () => {
    render(<VariantSelector {...defaultProps} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});
