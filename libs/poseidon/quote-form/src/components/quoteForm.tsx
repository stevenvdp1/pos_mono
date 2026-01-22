import { useQuoteForm } from "../hooks/useQuoteForm"
import { FormProvider } from "react-hook-form"
import { QuoteNumberField, QuoteTextField } from "@pos-mono/quote-fields"
import { QuoteFormSection } from "./quoteFormSection"

export const QuoteForm = () => {
    const { methods, onSubmit } = useQuoteForm()

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <QuoteFormSection label="general">
                    <QuoteTextField fieldName="shipName" />
                    <QuoteTextField fieldName="quoteReference" />
                    <QuoteTextField fieldName="clientReference" />
                    <QuoteNumberField fieldName="loa" />
                    <QuoteNumberField fieldName="beam" />
                    <QuoteNumberField fieldName="draft" />
                </QuoteFormSection>
            </form>
            {JSON.stringify(methods.watch())}
        </FormProvider>
    )
}