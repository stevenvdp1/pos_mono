import React, { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

export interface ShipNameFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The current value of the ship name field
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
   * Error message to display below the field
   */
  error?: string;
}

/**
 * ShipNameField component for entering ship names in quotes.
 * Uses PrimeReact InputText with float label and i18n support.
 */
export const ShipNameField: React.FC<ShipNameFieldProps> = ({
  value = '',
  onChange,
  disabled = false,
  error,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div {...props}>
      <FloatLabel>
        <InputText
          id="shipName"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={error ? 'p-invalid' : ''}
        />
        <label htmlFor="shipName">{t('quote.fields.shipName')}</label>
      </FloatLabel>
      {error && <small className="p-error">{error}</small>}
    </div>
  );
};
