export interface IQuoteOverrideField<T> {
    baseValue: T,
    configValue?: T,
    quoteValue?: T
}

export interface IQuoteOverrideFieldProps {
    field: IQuoteOverrideField<any>
}

export const QuoteOverrideField: React.FC<IQuoteOverrideFieldProps> = ({ field }) => {
    return <span>{field.quoteValue || field.configValue || field.baseValue}</span>
}