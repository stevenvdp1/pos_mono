import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from 'react-i18next';

export interface ImoNumberFieldProps {
  /**
   * The value of the IMO number field
   */
  value?: string;
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: string) => void;
  /**
   * The name attribute for the input
   */
  name?: string;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Custom label translation key (defaults to 'quote.fields.imoNumber')
   */
  labelKey?: string;
  /**
   * Whether to show validation error styling
   */
  invalid?: boolean;
}

/**
 * IMO Number field component with float label and i18n support.
 * IMO numbers are 7-digit identifiers for ships.
 */
export const ImoNumberField: React.FC<ImoNumberFieldProps> = ({
  value = '',
  onChange,
  name = 'imoNumber',
  disabled = false,
  className = '',
  labelKey = 'quote.fields.imoNumber',
  invalid = false,
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Only allow digits and limit to 7 characters
    const sanitized = newValue.replace(/\D/g, '').slice(0, 7);
    onChange?.(sanitized);
  };

  return (
    <FloatLabel>
      <InputText
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={className}
        invalid={invalid}
        maxLength={7}
      />
      <label htmlFor={name}>{t(labelKey)}</label>
    </FloatLabel>
  );
};

export default ImoNumberField;
