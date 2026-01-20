import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuotationReferenceField } from './QuotationReferenceField';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('QuotationReferenceField', () => {
  it('should render with default props', () => {
    render(<QuotationReferenceField />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('should render with initial value', () => {
    render(<QuotationReferenceField value="REF-123" />);
    
    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('REF-123');
  });

  it('should display translated label', () => {
    render(<QuotationReferenceField />);
    
    const label = screen.getByText('quote.fields.quotationReference');
    expect(label).toBeTruthy();
  });

  it('should call onChange when value changes', () => {
    const handleChange = vi.fn();
    
    render(<QuotationReferenceField onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Q' } });
    
    expect(handleChange).toHaveBeenCalledWith('Q');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<QuotationReferenceField disabled={true} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should not be disabled by default', () => {
    render(<QuotationReferenceField />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  it('should have required attribute when required prop is true', () => {
    render(<QuotationReferenceField required={true} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('should apply custom className', () => {
    render(<QuotationReferenceField className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('custom-class');
  });

  it('should use custom id when provided', () => {
    render(<QuotationReferenceField id="custom-id" />);
    
    const input = screen.getByRole('textbox');
    expect(input.id).toBe('custom-id');
  });

  it('should use default id when not provided', () => {
    render(<QuotationReferenceField />);
    
    const input = screen.getByRole('textbox');
    expect(input.id).toBe('quotation-reference');
  });

  it('should render with float-label wrapper', () => {
    const { container } = render(<QuotationReferenceField />);
    
    const floatLabel = container.querySelector('.p-float-label');
    expect(floatLabel).toBeTruthy();
  });

  it('should link label to input via htmlFor', () => {
    render(<QuotationReferenceField id="test-id" />);
    
    const label = screen.getByText('quote.fields.quotationReference') as HTMLLabelElement;
    expect(label.htmlFor).toBe('test-id');
  });

  it('should handle multiple onChange calls', () => {
    const handleChange = vi.fn();
    
    render(<QuotationReferenceField onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.change(input, { target: { value: 'AB' } });
    fireEvent.change(input, { target: { value: 'ABC' } });
    
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenNthCalledWith(1, 'A');
    expect(handleChange).toHaveBeenNthCalledWith(2, 'AB');
    expect(handleChange).toHaveBeenNthCalledWith(3, 'ABC');
  });

  it('should not call onChange when undefined', () => {
    render(<QuotationReferenceField />);
    
    const input = screen.getByRole('textbox');
    // Should not throw when onChange is undefined
    expect(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    }).not.toThrow();
  });

  it('should handle empty string value', () => {
    render(<QuotationReferenceField value="" />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should update when controlled value changes', () => {
    const { rerender } = render(<QuotationReferenceField value="initial" />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');
    
    rerender(<QuotationReferenceField value="updated" />);
    expect(input.value).toBe('updated');
  });
});
