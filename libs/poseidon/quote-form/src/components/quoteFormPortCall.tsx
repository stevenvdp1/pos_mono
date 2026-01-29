import { QuoteTextField, QuoteFormSection, QuoteFormRow, QuoteFormPortCallCountry, QuoteFormPortCallManning, QuoteDropdownField } from "@pos-mono/quote-form-ui"
import { useFormContext, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"


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
    const { t } = useTranslation()
    const { control } = useFormContext()
    
    const portCallTitle = useWatch({control, name: `portCalls.${index}`, compute:(portCall) => {
        let title = ""
        if(!portCall || !portCall.country) return t("portCall") + " " + (index + 1)
        if(portCall.country) title += portCall.country.name
        if(portCall.portName) title += ` - ${portCall.portName}`
        return title
    }})

    return (
        <QuoteFormSection label={portCallTitle}>
            <QuoteFormRow>
                <QuoteFormPortCallCountry index={index} />
                <QuoteTextField fieldName={`portCalls.${index}.portName`} label={"portName"} />
            </QuoteFormRow>
            <QuoteDropdownField fieldName={`portCalls.${index}.teamType`} label={"teamType"} options={[{label: "oneDiverInWater", value: "OneDiverInWater"}, {label: "twoDiversInWater", value: "TwoDiversInWater"}]} />
            <QuoteFormPortCallManning index={index} />
        </QuoteFormSection>
    )
}