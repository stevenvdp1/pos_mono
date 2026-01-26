import { QuoteTextField, QuoteFormSection } from "@pos-mono/quote-form-ui"
import { useFormContext } from "react-hook-form"


export const QuoteFormPortCalls = () => {
    const methods = useFormContext()
    return (
        <QuoteFormSection label="portCalls">
            {
                methods.watch('portCalls')?.map((_: any, index: number) => (
                    <QuoteFormPortCall key={index} index={index} />
                ))
            }
        </QuoteFormSection>
    )

}


const QuoteFormPortCall = ({ index }: { index: number }) => {
    return (
        <QuoteFormSection label={`portCall ${index + 1}`}>
            <QuoteTextField fieldName={`portCalls.${index}.portName`} />
        </QuoteFormSection>
    )
}