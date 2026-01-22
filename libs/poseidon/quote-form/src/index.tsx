import './index.css'
import { FormProvider } from "react-hook-form"
import { QuoteNumberField, QuoteTextField } from "@pos-mono/quote-form-fields"
import { QuoteFormSection } from "./components"
import { useQuoteForm } from "./hooks"

const QuoteForm = () => {
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

export default QuoteForm