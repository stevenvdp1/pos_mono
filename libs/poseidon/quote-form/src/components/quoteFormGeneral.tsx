import { QuoteDateField, QuoteDescriptionField, QuoteFormClientName, QuoteFormRow, QuoteFormSection, QuoteNumberField, QuoteTextField } from "@pos-mono/quote-form-ui"
export const QuoteFormGeneral = () => {
    return (
        <QuoteFormSection label="general">
            <QuoteFormRow>
                <QuoteTextField fieldName="shipName" />
                <QuoteTextField fieldName="imoNumber" />
            </QuoteFormRow>
            <QuoteFormClientName />
            <QuoteFormRow>
                <QuoteDateField fieldName="creationDate" />
                <QuoteDateField fieldName="revisionDate" />
            </QuoteFormRow>
            <QuoteFormRow>
                <QuoteTextField fieldName="quoteReference" />
                <QuoteTextField fieldName="clientReference" />
            </QuoteFormRow>
            <QuoteFormRow>
                <QuoteNumberField fieldName="loa" />
                <QuoteNumberField fieldName="beam" />
                <QuoteNumberField fieldName="draft" />
            </QuoteFormRow>
            <QuoteFormRow>
                <QuoteNumberField fieldName="totalPortCalls" />
                <QuoteDateField fieldName="jobDate" />
            </QuoteFormRow>
            <QuoteDescriptionField fieldName="generalNotes" />
        </QuoteFormSection>
    )
}