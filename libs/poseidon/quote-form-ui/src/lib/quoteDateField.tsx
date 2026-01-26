import { FloatLabel } from "primereact/floatlabel";
import { useId } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Calendar } from 'primereact/calendar';
export interface IQuoteDateFieldProps {
    fieldName: string;
}

export const QuoteDateField: React.FC<IQuoteDateFieldProps> = ({ fieldName }) => {
    const id = useId();
    const { t } = useTranslation();

    return (
        <FloatLabel>
            <Controller
                name={fieldName}
                render={({ field }) => (
                    <Calendar
                        id={id}
                        value={field.value}
                        onChange={e=>field.onChange(e.value)}
                        className="w-full"
                        dateFormat="dd/mm/yy"
                        showIcon
                    />
                )}
            />
            <label htmlFor={fieldName}>{t(fieldName)}</label>
        </FloatLabel>
    )
}