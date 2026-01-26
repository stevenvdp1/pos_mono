import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from "react-i18next";

export interface IQuoteTextFieldProps {
    fieldName: string;
}

export const QuoteTextField: React.FC<IQuoteTextFieldProps> = ({ fieldName }) => {
    const id = useId();
    const { t } = useTranslation();
    const formContext = useFormContext();

    return (
        <FloatLabel>
            <Controller
                name={fieldName}
                control={formContext.control}
                render={({ field }) => (
                    <InputText
                    id={id}
                    {...field}
                    className="w-full"
                    />
                )}
                />
            <label htmlFor={fieldName}>{t(fieldName)}</label>
        </FloatLabel>
    )
}