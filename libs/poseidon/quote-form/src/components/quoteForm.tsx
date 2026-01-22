import { useQuoteForm } from "../hooks/useQuoteForm"
import { FormProvider } from "react-hook-form"
import { QuoteNumberField, QuoteTextField } from "@pos-mono/quote-fields"

export const QuoteForm = () => {
    const {methods, onSubmit} = useQuoteForm()

    return(
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <QuoteTextField fieldName="shipName" />
                <QuoteNumberField fieldName="loa" />
                <QuoteNumberField fieldName="beam" />
                <QuoteNumberField fieldName="draft" />
            </form>
            {JSON.stringify(methods.watch())}
        </FormProvider>
    )
}