import { FormProvider } from "react-hook-form"
import { QuoteFormGeneral, QuoteFormPortCalls, QuoteFormRates, QuoteFormTimeline } from "./components"
import { useQuoteForm } from "./hooks"
import { Button } from 'primereact/button';

const QuoteForm = () => {
    const { methods, onSubmit } = useQuoteForm()

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <QuoteFormGeneral/>
                <QuoteFormPortCalls/>
                <QuoteFormTimeline/>
                <QuoteFormRates/>
                <Button type="submit" label="Submit" /> 
            </form>
            {JSON.stringify(methods.watch())}
        </FormProvider>
    )
}

export default QuoteForm