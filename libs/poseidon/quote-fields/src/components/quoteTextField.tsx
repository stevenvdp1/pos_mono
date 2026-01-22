import { useId } from "react";
import { Controller } from "react-hook-form";
import { useQuoteFormContext } from "@pos-mono/quote-form";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useTranslation } from "react-i18next";

export interface IQuoteTextFieldProps {
    fieldName: string;
}

export const QuoteTextField: React.FC<IQuoteTextFieldProps> = ({ fieldName }) => {
    const id = useId();
    const { t } = useTranslation();
    const formContext = useQuoteFormContext();

    return (
        <div>
            <FloatLabel>
                <Controller
                    name={fieldName}
                    control={formContext.control}
                    render={({ field }) => (
                        <InputText
                            id={id}
                            {...field}
                        />
                    )}
                />
                <label htmlFor={fieldName}>{t(fieldName)}</label>
            </FloatLabel>
        </div>
    )
}