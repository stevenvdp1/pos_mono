import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import { TimeLineItemDtoDurationType, TimeLineItemDtoTimeLineItemType } from "@pos-mono/poseidon-api";
import { getOverrideFieldValue, IQuoteOverrideField, QuoteOverrideField } from "./quoteOverrideField";
import { QuoteOverrideEditDurationType, QuoteOverrideEditNumber, QuoteOverrideEditText, QuoteOverrideEditTimeLineItemType } from "./quoteOverrideEdit";

export const QuoteFormTimelineItems = () => {
    const { t } = useTranslation()

    const { control } = useFormContext<{ timelineItems: Array<Partial<{ id: number, description: IQuoteOverrideField<string>, duration: IQuoteOverrideField<number>, durationType: IQuoteOverrideField<TimeLineItemDtoDurationType>, timeLineItemType: IQuoteOverrideField<TimeLineItemDtoTimeLineItemType> }>> }>()
    const timelineItems = useWatch({ control, name: "timelineItems" })
    const { update, append } = useFieldArray({
        control,
        name: "timelineItems",
        keyName: "_key"
    })

    const updateRow = (e: any) => {
        const newData = { ...e.newData }
        if (newData.description.quoteValue === "") delete newData.description.quoteValue
        if (newData.duration.quoteValue === null) delete newData.duration.quoteValue
        update(e.index, newData)
    }

    const addItem = () => {
        append({
            description: { baseValue: "New item" },
            duration: { baseValue: 0 },
            durationType: { baseValue: TimeLineItemDtoDurationType.Day },
            timeLineItemType: { baseValue: TimeLineItemDtoTimeLineItemType.Work }
        })
    }

    const totalDuration = timelineItems?.reduce((sum, item) => {
        return sum + (getOverrideFieldValue(item?.duration as IQuoteOverrideField<number>) || 0)
    }, 0) ?? 0

    const footerGroup = (
        <div className="flex justify-end gap-4 p-2 font-bold">
            <span>{t("totalDuration")}:</span>
            <span>{totalDuration}</span>
        </div>
    )

    return (<>
        <div className="flex justify-end mb-2">
            <Button icon="pi pi-plus" rounded onClick={addItem} type="button" />
        </div>
        <DataTable
            value={timelineItems}
            className="w-full"
            size="small"
            editMode="row"
            onRowEditComplete={updateRow}
            footer={footerGroup}
        >
            <Column header={t("description")} field="description" editor={(e) => <QuoteOverrideEditText  {...e} />} body={(rowData) => <QuoteOverrideField field={rowData.description} />} />
            <Column header={t("duration")} field="duration" editor={(e) => <QuoteOverrideEditNumber  {...e} />} body={rowData => <QuoteOverrideField field={rowData.duration} />} />
            <Column header={t("durationType")} field="durationType" editor={(e) => <QuoteOverrideEditDurationType  {...e} />} body={rowData => <QuoteOverrideField field={rowData.durationType} />} />
            <Column header={t("type")} field="timeLineItemType" editor={(e) => <QuoteOverrideEditTimeLineItemType  {...e} />} body={rowData => <QuoteOverrideField field={rowData.timeLineItemType} />} />
            <Column rowEditor/>
        </DataTable>
    </>)
}
