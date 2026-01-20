import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { PortNameField } from './PortNameField';

// Create a test i18n instance
const createTestI18n = () => {
  const testI18n = i18n.createInstance();
  testI18n.init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['quote-fields'],
    defaultNS: 'quote-fields',
    resources: {
      en: {
        'quote-fields': {
          portName: 'Port Name',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
  return testI18n;
};

const renderWithI18n = (component: React.ReactElement) => {
  const testI18n = createTestI18n();
  return render(
    <I18nextProvider i18n={testI18n}>
      {component}
    </I18nextProvider>
  );
};

describe('PortNameField', () => {
  it('should render with default props', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDefined();
  });

  it('should display the translated label', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} />);
    
    const label = screen.getByText('Port Name');
    expect(label).toBeDefined();
  });

  it('should render with the provided value', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="Hamburg" onChange={onChange} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Hamburg');
  });

  it('should call onChange when value changes', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rotterdam' } });
    
    expect(onChange).toHaveBeenCalledWith('Rotterdam');
  });

  it('should use custom id when provided', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} id="custom-id" />);
    
    const input = screen.getByRole('textbox');
    expect(input.id).toBe('custom-id');
  });

  it('should use custom name when provided', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} name="custom-name" />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.name).toBe('custom-name');
  });

  it('should be disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} disabled={true} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should be required when required prop is true', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} required={true} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('should display asterisk in label when required', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} required={true} />);
    
    const label = screen.getByText(/Port Name \*/);
    expect(label).toBeDefined();
  });

  it('should apply custom className', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('custom-class');
  });

  it('should update input value on multiple changes', () => {
    const onChange = vi.fn();
    renderWithI18n(<PortNameField value="" onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Singapore' } });
    
    expect(onChange).toHaveBeenCalledWith('Singapore');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
