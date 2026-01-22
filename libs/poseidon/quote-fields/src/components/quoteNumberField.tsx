import { useId } from "react";
import { Controller } from "react-hook-form";
import { useQuoteFormContext } from "@pos-mono/quote-form";
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from "react-i18next";

export interface IQuoteNumberFieldProps {
    fieldName: string;
}

export const QuoteNumberField: React.FC<IQuoteNumberFieldProps> = ({ fieldName }) => {
    const id = useId();
    const { t } = useTranslation();
    const formContext = useQuoteFormContext();

    return (
        <FloatLabel>
            <Controller
                name={fieldName}
                control={formContext.control}
                render={({ field }) => (
                    <InputNumber
                        id={id}
                        value={field.value}
                        onValueChange={e => field.onChange(e.value)}
                    />
                )}
            />
            <label htmlFor={fieldName}>{t(fieldName)}</label>
        </FloatLabel>
    )
}