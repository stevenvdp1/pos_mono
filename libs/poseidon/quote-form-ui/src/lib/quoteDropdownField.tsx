import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel"
import { SelectItem } from "primereact/selectitem";
import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";

export interface IQuoteDropdownFieldProps {
    fieldName: string;
    label?: string;
    options: SelectItem[]   
}

export const QuoteDropdownField: React.FC<IQuoteDropdownFieldProps> = ({ fieldName, label, options }) => {
    const id = useId();
    const { t } = useTranslation();
    const { control } = useFormContext();
    return (
        <FloatLabel>
            <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        id={id}
                        className="w-full"
                        options={options}
                    />
                )}
            />
            <label htmlFor={fieldName}>{t(label ?? fieldName)}</label>
        </FloatLabel>
    )
}