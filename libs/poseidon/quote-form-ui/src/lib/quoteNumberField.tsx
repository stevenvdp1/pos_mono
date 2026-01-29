import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from "react-i18next";

export interface IQuoteNumberFieldProps {
    fieldName: string;
    max?: number;
    min?: number;
}

export const QuoteNumberField: React.FC<IQuoteNumberFieldProps> = ({ fieldName, max, min }) => {
    const id = useId();
    const { t } = useTranslation();
    const {control} = useFormContext();

    return (
        <FloatLabel>
            <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                    <InputNumber
                        id={id}
                        value={field.value}
                        onValueChange={e => field.onChange(e.value)}
                        className="w-full"
                        max={max}
                        min={min}
                    />
                )}
            />
            <label htmlFor={fieldName}>{t(fieldName)}</label>
        </FloatLabel>
    )
}