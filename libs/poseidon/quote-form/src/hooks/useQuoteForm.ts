import { useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"

export interface IQuoteForm{
    shipName:string
    quoteReference:string
    clientReference:string
    loa:number | null   
    beam:number | null
    draft:number | null
    totalPortCalls:number | null
    portCalls:Array<{
        portName:string
    }>
}

const QuoteFormDefaultValues: IQuoteForm = {
    shipName: '',
    quoteReference: '',
    clientReference: '',
    loa: null,
    beam: null,
    draft: null,
    totalPortCalls: null,
    portCalls: []
}

export const useQuoteForm = () =>{
    const methods = useForm<IQuoteForm>({
        defaultValues: QuoteFormDefaultValues
    })

    const totalPortCalls = useWatch({ name: "totalPortCalls", control: methods.control });
    useEffect(() => {
        const currentPortCalls = methods.getValues("portCalls") || [];
        const portCallsToAdd = (totalPortCalls || 0) - currentPortCalls.length;

        if (portCallsToAdd > 0) {
            const newPortCalls = Array.from({ length: portCallsToAdd }, () => ({ portName: '' }));
            methods.setValue("portCalls", [...currentPortCalls, ...newPortCalls]);
        } else if (portCallsToAdd < 0) {
            methods.setValue("portCalls", currentPortCalls.slice(0, totalPortCalls || 0));
        }
    },[totalPortCalls])

    const portCalls = useWatch({ name: "portCalls", control: methods.control });
    useEffect(() => {
        console.log('portCalls changed:', portCalls);
    }, [portCalls])

    const onSubmit = methods.handleSubmit((e)=>console.log(e))
    return {
        methods,
        onSubmit
    }
}