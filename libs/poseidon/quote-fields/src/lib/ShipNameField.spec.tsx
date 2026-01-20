import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShipNameField } from './ShipNameField';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ShipNameField', () => {
  it('should render the component', () => {
    render(<ShipNameField />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDefined();
  });

  it('should display the i18n translated label', () => {
    render(<ShipNameField />);
    const label = screen.getByText('quote.fields.shipName');
    expect(label).toBeDefined();
  });

  it('should render with provided value', () => {
    render(<ShipNameField value="Test Ship" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Test Ship');
  });

  it('should render with empty value by default', () => {
    render(<ShipNameField />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should call onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<ShipNameField onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'New Ship Name' } });
    
    expect(handleChange).toHaveBeenCalledWith('New Ship Name');
  });

  it('should not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<ShipNameField disabled onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveProperty('disabled', true);
  });

  it('should apply p-invalid class when error is provided', () => {
    render(<ShipNameField error="Required field" />);
    const input = screen.getByRole('textbox');
    
    expect(input.className).toContain('p-invalid');
  });

  it('should display error message when error is provided', () => {
    render(<ShipNameField error="Required field" />);
    const errorMessage = screen.getByText('Required field');
    
    expect(errorMessage).toBeDefined();
    expect(errorMessage.className).toContain('p-error');
  });

  it('should not display error message when error is not provided', () => {
    render(<ShipNameField />);
    const errorMessages = document.querySelectorAll('.p-error');
    
    expect(errorMessages.length).toBe(0);
  });

  it('should pass through additional HTML attributes', () => {
    render(<ShipNameField data-testid="custom-field" />);
    const wrapper = screen.getByTestId('custom-field');
    
    expect(wrapper).toBeDefined();
  });

  it('should have an input id', () => {
    render(<ShipNameField />);
    const input = screen.getByRole('textbox');
    
    expect(input.id).toBeTruthy();
    expect(input.id.length).toBeGreaterThan(0);
  });

  it('should associate label with input via htmlFor', () => {
    render(<ShipNameField />);
    const input = screen.getByRole('textbox');
    const label = screen.getByText('quote.fields.shipName');
    
    expect(label.getAttribute('for')).toBe(input.id);
  });
});
