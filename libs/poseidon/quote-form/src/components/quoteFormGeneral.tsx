import { QuoteDateField, QuoteDescriptionField, QuoteFormClientName, QuoteFormRow, QuoteFormSection, QuoteNumberField, QuoteTextField, QuoteFormScope, QuoteFormConfig } from "@pos-mono/quote-form-ui"
export const QuoteFormGeneral = () => {
    return (
        <QuoteFormSection label="general">
            <QuoteFormRow>
                <QuoteTextField fieldName="shipName" />
                <QuoteTextField fieldName="imoNumber" />
            </QuoteFormRow>
                <QuoteFormClientName />
                <QuoteFormConfig />
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
            <QuoteFormScope />
            <QuoteFormRow>
                <QuoteNumberField fieldName="totalPortCalls" max={15} />
                <QuoteDateField fieldName="jobDate" />
            </QuoteFormRow>
            <QuoteDescriptionField fieldName="generalNotes" />
        </QuoteFormSection>
    )
}