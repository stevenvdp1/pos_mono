import { FloatLabel } from "primereact/floatlabel";
import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputTextarea } from 'primereact/inputtextarea';

export interface IQuoteDescriptionFieldProps {
    fieldName: string;
}

export const QuoteDescriptionField: React.FC<IQuoteDescriptionFieldProps> = ({ fieldName }) => {
    const id = useId();
    const { t } = useTranslation();
    const formContext = useFormContext();

    return (
        <FloatLabel>
            <Controller
                name={fieldName}
                control={formContext.control}
                render={({ field }) => (
                    <InputTextarea
                        id={id}
                        className="w-full"
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        rows={5}
                    />
                )}
            />
            <label htmlFor={fieldName}>{t(fieldName)}</label>
        </FloatLabel>
    )
}