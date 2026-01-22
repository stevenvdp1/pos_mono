import { useForm } from "react-hook-form"

export interface IQuoteForm{
    shipName:string
    loa:number
    beam:number
    draft:number
}

const QuoteFormDefaultValues: IQuoteForm = {
    shipName: '',
    loa: 0,
    beam: 0,
    draft: 0
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