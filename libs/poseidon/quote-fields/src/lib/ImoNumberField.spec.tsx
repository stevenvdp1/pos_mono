import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImoNumberField } from './ImoNumberField';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ImoNumberField', () => {
  describe('Rendering', () => {
    it('should render the component', () => {
      render(<ImoNumberField />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render with default name attribute', () => {
      render(<ImoNumberField />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'imoNumber');
    });

    it('should render with custom name attribute', () => {
      render(<ImoNumberField name="customImoNumber" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'customImoNumber');
    });

    it('should render with custom className', () => {
      render(<ImoNumberField className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('should render as disabled when disabled prop is true', () => {
      render(<ImoNumberField disabled={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should render with invalid styling when invalid prop is true', () => {
      render(<ImoNumberField invalid={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('p-invalid');
    });
  });

  describe('Float Label', () => {
    it('should render with default i18n label key', () => {
      render(<ImoNumberField />);
      const label = screen.getByText('quote.fields.imoNumber');
      expect(label).toBeInTheDocument();
    });

    it('should render with custom label key', () => {
      render(<ImoNumberField labelKey="custom.label.key" />);
      const label = screen.getByText('custom.label.key');
      expect(label).toBeInTheDocument();
    });

    it('should associate label with input using htmlFor', () => {
      render(<ImoNumberField name="testImo" />);
      const label = screen.getByText('quote.fields.imoNumber');
      expect(label).toHaveAttribute('for', 'testImo');
    });
  });

  describe('Value Management', () => {
    it('should render with empty value by default', () => {
      render(<ImoNumberField />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should render with provided value', () => {
      render(<ImoNumberField value="1234567" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('1234567');
    });

    it('should call onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '1234567' } });
      
      expect(handleChange).toHaveBeenCalledWith('1234567');
    });

    it('should handle onChange callback not being provided', () => {
      render(<ImoNumberField disabled={false} />);
      const input = screen.getByRole('textbox');
      
      // Should not throw error when onChange is not provided
      expect(() => {
        fireEvent.change(input, { target: { value: '1234567' } });
      }).not.toThrow();
    });
  });

  describe('IMO Number Validation', () => {
    it('should only allow numeric input', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'abc123def' } });
      
      expect(handleChange).toHaveBeenCalledWith('123');
    });

    it('should limit input to 7 digits', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123456789' } });
      
      expect(handleChange).toHaveBeenCalledWith('1234567');
    });

    it('should strip non-numeric characters before limiting length', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '12-34-56-78-90' } });
      
      expect(handleChange).toHaveBeenCalledWith('1234567');
    });

    it('should handle empty input', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} value="123" />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '' } });
      
      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should have maxLength attribute set to 7', () => {
      render(<ImoNumberField />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('maxLength', '7');
    });
  });

  describe('User Interaction', () => {
    it('should allow typing valid 7-digit IMO number', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      // Simulate typing each digit
      fireEvent.change(input, { target: { value: '9' } });
      expect(handleChange).toHaveBeenCalledWith('9');
      
      fireEvent.change(input, { target: { value: '93' } });
      expect(handleChange).toHaveBeenCalledWith('93');
      
      fireEvent.change(input, { target: { value: '937' } });
      expect(handleChange).toHaveBeenCalledWith('937');
      
      fireEvent.change(input, { target: { value: '9376' } });
      expect(handleChange).toHaveBeenCalledWith('9376');
      
      fireEvent.change(input, { target: { value: '93768' } });
      expect(handleChange).toHaveBeenCalledWith('93768');
      
      fireEvent.change(input, { target: { value: '937680' } });
      expect(handleChange).toHaveBeenCalledWith('937680');
      
      fireEvent.change(input, { target: { value: '9376801' } });
      expect(handleChange).toHaveBeenCalledWith('9376801');
    });

    it('should prevent entering more than 7 digits', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '93768012' } });
      
      expect(handleChange).toHaveBeenCalledWith('9376801');
      expect(handleChange).not.toHaveBeenCalledWith('93768012');
    });

    it('should allow clearing the field', () => {
      const handleChange = vi.fn();
      render(<ImoNumberField onChange={handleChange} value="1234567" />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '' } });
      
      expect(handleChange).toHaveBeenCalledWith('');
    });
  });

  describe('Accessibility', () => {
    it('should have proper id attribute', () => {
      render(<ImoNumberField name="testImo" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'testImo');
    });

    it('should be keyboard accessible', () => {
      render(<ImoNumberField />);
      const input = screen.getByRole('textbox');
      // Input should be focusable and accessible via keyboard
      expect(input.tagName).toBe('INPUT');
    });
  });
});
