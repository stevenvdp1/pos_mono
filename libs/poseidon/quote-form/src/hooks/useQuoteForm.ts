import { DeepPartial, useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"
import { ClientConfigDto, useJobs } from "@pos-mono/poseidon-api"
import { IQuoteScopeItem, IQuoteOverrideField } from "@pos-mono/quote-form-ui"

export interface IQuoteForm {
    configId: string
    shipName: string
    imoNumber: string
    clientName: string | ClientConfigDto
    clientNote?: string
    quoteReference: string
    clientReference: string
    creationDate: Date
    revisionDate: Date
    loa: number | null
    beam: number | null
    draft: number | null
    totalPortCalls: number | null
    jobDate?: Date
    generalNotes?: string
    scope: IQuoteScopeItem[]
    portCalls: Array<{
        portName: string
        country: {
            id: string
            name: string
        }
    }>
    equipments: Array<{
        id: string,
        name: IQuoteOverrideField<string>,
        rate: IQuoteOverrideField<number>,
        rateType: IQuoteOverrideField<string>
    }>
}



const QuoteFormDefaultValues: DeepPartial<IQuoteForm> = {
    configId: 'default',
    creationDate: new Date(),
    revisionDate: new Date(),
    jobDate: new Date(),
}

export const useQuoteForm = () => {
    const { data: jobs } = useJobs()

    const methods = useForm<DeepPartial<IQuoteForm>>({
        defaultValues: QuoteFormDefaultValues
    })

    const totalPortCalls = useWatch({ name: "totalPortCalls", control: methods.control });
    useEffect(() => {
        const currentPortCalls = methods.getValues("portCalls") || [];
        const portCallsToAdd = (totalPortCalls || 0) - currentPortCalls.length;
        if (portCallsToAdd > 0) {
            const newPortCalls = Array.from({ length: portCallsToAdd }, () => ({}));
            methods.setValue("portCalls", [...currentPortCalls, ...newPortCalls]);
        } else if (portCallsToAdd < 0) {
            methods.setValue("portCalls", currentPortCalls.slice(0, totalPortCalls || 0));
        }
    }, [totalPortCalls])

    const portCalls = useWatch({ name: "portCalls", control: methods.control });
    useEffect(() => {
        console.log('portCalls changed:', portCalls);
    }, [portCalls])


    //rates based on main job scope and config
    const mainScope = useWatch({ name: "scope", control: methods.control, compute: (scope) => scope?.find(item => item?.isMainJob) });
    const configId = useWatch({ name: "configId", control: methods.control });
    useEffect(() => {
        const mainJob = jobs?.find(job => job.id === mainScope?.id)
        if (!mainJob) return;
        const equipments = mainJob.equipments?.map(equipment => {
            return {
                id: equipment.id,
                name: { baseValue: equipment.name },
                rate: {
                    baseValue: equipment.rate ?? 0,
                    configValue: configId !== "default" ? equipment.rateOverrides?.[configId!] : undefined,
                },
                rateType: { baseValue: equipment.rateType }
            }
        })
        methods.setValue("equipments", equipments)
    }, [mainScope, jobs, configId])


    const onSubmit = methods.handleSubmit((e) => console.log(e))
    return {
        methods,
        onSubmit,
    }
}

