import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from 'react-i18next';

export interface PortNameFieldProps {
  /**
   * The current value of the port name field
   */
  value: string;
  
  /**
   * Callback fired when the value changes
   */
  onChange: (value: string) => void;
  
  /**
   * Optional ID for the input element
   */
  id?: string;
  
  /**
   * Optional name for the input element
   */
  name?: string;
  
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * PortNameField component for inputting port names
 * 
 * @example
 * ```tsx
 * <PortNameField
 *   value={portName}
 *   onChange={setPortName}
 * />
 * ```
 */
export const PortNameField: React.FC<PortNameFieldProps> = ({
  value,
  onChange,
  id = 'portName',
  name = 'portName',
  disabled = false,
  required = false,
  className = '',
}) => {
  const { t } = useTranslation('quote-fields');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <FloatLabel>
      <InputText
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={className}
      />
      <label htmlFor={id}>
        {t('portName')}
        {required && ' *'}
      </label>
    </FloatLabel>
  );
};
