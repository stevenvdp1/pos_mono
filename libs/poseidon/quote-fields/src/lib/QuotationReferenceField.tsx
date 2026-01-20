import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

export interface QuotationReferenceFieldProps {
  /**
   * The current value of the quotation reference field
   */
  value?: string;
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Optional input id
   */
  id?: string;
}

/**
 * QuotationReferenceField component for entering quotation references
 * Uses PrimeReact InputText with float-label implementation
 */
export const QuotationReferenceField: React.FC<QuotationReferenceFieldProps> = ({
  value = '',
  onChange,
  disabled = false,
  required = false,
  className = '',
  id = 'quotation-reference',
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <span className="p-float-label">
      <InputText
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={className}
      />
      <label htmlFor={id}>
        {t('quote.fields.quotationReference')}
      </label>
    </span>
  );
};
