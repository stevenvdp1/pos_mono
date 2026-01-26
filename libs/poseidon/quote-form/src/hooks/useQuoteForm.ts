import { useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"

export interface IQuoteForm{
    shipName:string
    imoNumber:string
    clientName:string
    clientNote?:string
    quoteReference:string
    clientReference:string
    creationDate: Date
    revisionDate: Date
    loa:number | null   
    beam:number | null
    draft:number | null
    totalPortCalls:number | null
    jobDate?:Date
    generalNotes?:string
    portCalls:Array<{
        portName:string
    }>
}

const QuoteFormDefaultValues: IQuoteForm = {
    shipName: '',
    imoNumber: '',
    quoteReference: '',
    clientName:'',
    clientReference: '',
    creationDate: new Date(),
    revisionDate: new Date(),
    loa: null,
    beam: null,
    draft: null,
    totalPortCalls: null,
    jobDate: new Date(),
    generalNotes: '',
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