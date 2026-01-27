import React from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { JobDto, useJobs } from "@pos-mono/poseidon-api";

export interface IQuoteScopeItem extends Partial<JobDto> {
    count: number
    isMainJob?: boolean
}

export const QuoteFormScope: React.FC = () => {
    const { t } = useTranslation();
    const { control } = useFormContext<{scope:IQuoteScopeItem[]}>();
    const { fields, append, remove, update, replace } = useFieldArray({
        control,
        name: "scope",
        keyName: "_key"
    })
    const { data: jobs, isPending } = useJobs();
    const options = jobs?.map(job => ({ id: job.id, name: job.name }))

    const onChange = (e: MultiSelectChangeEvent) => {
        const index = fields.findIndex(field => field.id === e.selectedOption.id)
        if (index >= 0) remove(index)
        else {
            const newItem = { ...e.selectedOption, count: 1, isMainJob: fields.length === 0 }
            delete newItem._key
            append(newItem)
        }
    }

    const SelectedItemTemplate = (option: string) => {
        const field = fields.find(field => field.id === option)
        if (!option || !field) return <div className='p-multiselect-label p-multiselect-label-empty'></div>
        return (
            <div className="p-multiselect-token flex flex-row align-items-center gap-3">
                <i className={`pi ${field.isMainJob ? 'pi-star-fill text-yellow-400' : 'pi-star'} hover:cursor-pointer`} onClick={(e) => handleMainClicked(e, field)}></i>
                <span>{field.name}</span>
                <i className="pi pi-minus-circle hover:cursor-pointer" onClick={(e) => handleItemCountClicked(e, field, -1)}></i>
                <span>{field.count}</span>
                <i className="pi pi-plus-circle hover:cursor-pointer" onClick={(e) => handleItemCountClicked(e, field, 1)}></i>
            </div>
        )
    }

    const handleMainClicked = (e: React.MouseEvent<HTMLElement>, field: any) => {
        e.stopPropagation();
        const updatedFields = fields.map(f => ({
            ...f,
            isMainJob: f.id === field.id
        }));
        replace(updatedFields);
    }

    const handleItemCountClicked = (e: React.MouseEvent<HTMLElement>, field: any, delta: number) => {
        e.stopPropagation();
        const index = fields.findIndex(f => f.id === field.id);
        if (index >= 0) {
            const newCount = (fields[index].count || 0) + delta;
            if (newCount <= 0) {
                remove(index);
            } else {
                update(index, { ...fields[index], count: newCount });
            }
        }
    }

    return (
        <FloatLabel>
            <Controller
                name="scope"
                control={control}
                render={({ field }) => (
                    <MultiSelect
                        {...field}
                        value={field.value?.map((item: any) => item.id)}
                        options={options || []}
                        optionValue="id"
                        optionLabel="name"
                        display="chip"
                        loading={isPending}
                        showSelectAll={false}
                        panelHeaderTemplate={() => <></>}
                        onChange={onChange}
                        selectedItemTemplate={SelectedItemTemplate}
                        className="w-full [&_.p-multiselect-label]:!flex [&_.p-multiselect-label]:!flex-wrap [&_.p-multiselect-label]:!h-auto [&_.p-multiselect-label]:!overflow-visible"
                        pt={{
                            label: { className: "flex flex-wrap gap-2", style: { whiteSpace: "normal", overflow: "visible", height: "auto" } },
                            token: { className: "m-0" }
                        }}
                    />
                )} />
            <label htmlFor="scope">{t("scope")}</label>
        </FloatLabel>
    )
}