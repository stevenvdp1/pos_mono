import { QuoteFormSection } from "./quoteFormSection"
import { QuoteTextField } from "@pos-mono/quote-form-ui"

export const QuoteFormPortCall = ({index}: {index:number}) => {

    return(
        <QuoteFormSection label={`portCall ${index + 1}`}>
            <QuoteTextField fieldName={`portCalls.${index}.portName`} />
            </QuoteFormSection>
    )
}