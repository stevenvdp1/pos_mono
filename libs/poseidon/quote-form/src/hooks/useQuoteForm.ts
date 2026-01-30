import { DeepPartial, useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"
import { ClientConfigDto, JobRateDtoPersonnelRole, useJobs } from "@pos-mono/poseidon-api"
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
        },
        teamType: 'OneDiverInWater' | 'TwoDiversInWater',
        teamConfiguration:Array<{
            id:JobRateDtoPersonnelRole,
            role:IQuoteOverrideField<string>
            count:IQuoteOverrideField<number>
            external:number
        }>
    }>
    equipments: Array<{
        id: string,
        name: IQuoteOverrideField<string>,
        rate: IQuoteOverrideField<number>,
        rateType: IQuoteOverrideField<string>
        equipmentGroup: string
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

    const mainScope = useWatch({ name: "scope", control: methods.control, compute: (scope) => scope?.find(item => item?.isMainJob) });
    const mainJob = jobs?.find(job => job.id === mainScope?.id)

    const totalPortCalls = useWatch({ name: "totalPortCalls", control: methods.control });
    useEffect(() => {
        const currentPortCalls = methods.getValues("portCalls") || [];
        const portCallsToAdd = (totalPortCalls || 0) - currentPortCalls.length;
        if (portCallsToAdd > 0) {
            const newPortCalls = Array.from({ length: portCallsToAdd }, () => ({
                teamConfiguration: Object.values(JobRateDtoPersonnelRole).reduce((acc, role) => {{
                    acc.push({
                        id: role as JobRateDtoPersonnelRole,
                        external: 0,
                        role: { baseValue: role },
                        count: { baseValue: 0 }
                    });
                    return acc;
                }}, [] as Array<{ id: JobRateDtoPersonnelRole, role: IQuoteOverrideField<string>, count: IQuoteOverrideField<number>, external:number}>),
            }));
            methods.setValue("portCalls", [...currentPortCalls, ...newPortCalls]);
        } else if (portCallsToAdd < 0) {
            methods.setValue("portCalls", currentPortCalls.slice(0, totalPortCalls || 0));
        }
    }, [totalPortCalls])

    const portCalls = useWatch({ name: "portCalls", control: methods.control })??[];
    const portCallsTeamSizes = useWatch({ name: "portCalls", control: methods.control, compute: (portCalls) => portCalls?.map(portCall => portCall?.teamType) });
    useEffect(() => {
        if(mainJob && portCalls?.length > 0){
            const updatedPortCalls = portCalls.map((portCall)=>{
                const teamType = portCall?.teamType
                if(!teamType) return portCall;
                const jobTeamConfig = mainJob.teamConfigurations?.[teamType] ?? {};
                const updatedTeamConfiguration = Object.entries(jobTeamConfig).map(([role, count])=>{
                    const existingRole = portCall.teamConfiguration?.find(tc => tc?.id === role);
                    return {
                        ...existingRole,
                        role: { ...existingRole?.role, baseValue: role },
                        count: { ...existingRole?.count, baseValue: count },
                        external: existingRole?.external ?? 0
                    };
                })
                return {...portCall, teamConfiguration: updatedTeamConfiguration}
            })
            methods.setValue("portCalls", updatedPortCalls);
        }
    }, [portCallsTeamSizes, mainJob])

    //rates based on main job scope and config
    const configId = useWatch({ name: "configId", control: methods.control });
    useEffect(() => {
        if (!mainJob) return;
        const equipments = mainJob.equipments?.map(equipment => {
            return {
                id: equipment.id,
                equipmentGroup: equipment.equipmentGroup,
                name: { baseValue: equipment.name },
                rate: {
                    baseValue: equipment.rate ?? 0,
                    configValue: configId !== "default" ? equipment.rateOverrides?.[configId!] : undefined,
                },
                rateType: { baseValue: equipment.rateType }
            }
        })
        methods.setValue("equipments", equipments)
    }, [mainJob, configId])


    const onSubmit = methods.handleSubmit((e) => console.log(e))
    return {
        methods,
        onSubmit,
    }
}

