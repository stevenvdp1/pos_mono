import { Tooltip } from "primereact/tooltip"
import { useId } from "react"
import { useTranslation } from "react-i18next"

export interface IQuoteOverrideField<T> {
    baseValue: T,
    configValue?: T,
    quoteValue?: T
}

export interface IQuoteOverrideFieldProps {
    field: IQuoteOverrideField<any>
    prefix?: string
}

export const getOverrideFieldValue = <T,>(field: IQuoteOverrideField<T>): T => {
    return field.quoteValue ?? field.configValue ?? field.baseValue
}

export const QuoteOverrideField: React.FC<IQuoteOverrideFieldProps> = ({ field, prefix }) => {
    const id = useId()
    const { t } = useTranslation()
    const showIcon = field.quoteValue !== undefined
    const hasTooltip = field.configValue !== undefined || field.quoteValue !== undefined
    return (
        <div className={`override-tooltip-${id} inline-flex items-center gap-2`}>
            {showIcon && <i className="pi pi-exclamation-circle text-orange-500"></i>}
            <span>{prefix} {getOverrideFieldValue(field)}</span>
            {
                hasTooltip &&
                <Tooltip target={`.override-tooltip-${id}`}>
                    <div className="flex flex-col gap-1">
                        <span>{t("baseValue")}: {field.baseValue}</span>
                        {field.configValue !== undefined && <span>{t("configValue")}: {field.configValue}</span>}
                        {field.quoteValue !== undefined && <span>{t("quoteValue")}: {field.quoteValue}</span>}
                    </div>
                </Tooltip>
            }
        </div>
    )
}