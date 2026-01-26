import './index.css'
import { FormProvider } from "react-hook-form"
import { QuoteNumberField, QuoteTextField } from "@pos-mono/quote-form-ui"
import { QuoteFormSection, QuoteFormRow, QuoteFormPortCall } from "./components"
import { useQuoteForm } from "./hooks"
import { Button } from 'primereact/button';

const QuoteForm = () => {
    const { methods, onSubmit } = useQuoteForm()

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <QuoteFormSection label="general">
                    <QuoteTextField fieldName="quoteReference" />
                    <QuoteTextField fieldName="clientReference" />
                    <QuoteFormRow>
                        <QuoteNumberField fieldName="loa" />
                        <QuoteNumberField fieldName="beam" />
                        <QuoteNumberField fieldName="draft" />
                    </QuoteFormRow>
                    <QuoteTextField fieldName="shipName" />
                    <QuoteNumberField fieldName="totalPortCalls" />
                </QuoteFormSection>
                <QuoteFormSection label="portCalls">
                {
                    methods.watch('portCalls')?.map((_:any, index:number)=>(
                        <QuoteFormPortCall key={index} index={index} />
                    ))
                }
                </QuoteFormSection>
                <Button type="submit" label="Submit" /> 
            </form>
            {JSON.stringify(methods.watch())}
        </FormProvider>
    )
}

export default QuoteForm