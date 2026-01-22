import { useFormContext } from "react-hook-form"

export const useQuoteFormContext = () => {
    const quoteFormContext = useFormContext()
    return quoteFormContext
}