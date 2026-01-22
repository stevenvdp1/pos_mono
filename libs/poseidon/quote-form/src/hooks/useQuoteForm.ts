import { useForm } from "react-hook-form"

export interface IQuoteForm{
    shipName:string
    quoteReference:string
    clientReference:string
    loa:number | null   
    beam:number | null
    draft:number | null
}

const QuoteFormDefaultValues: IQuoteForm = {
    shipName: '',
    quoteReference: '',
    clientReference: '',
    loa: null,
    beam: null,
    draft: null
}

export const useQuoteForm = () =>{
    const methods = useForm<IQuoteForm>({
        defaultValues: QuoteFormDefaultValues
    })

    const onSubmit = methods.handleSubmit(console.log)

    return {
        methods,
        onSubmit
    }
}