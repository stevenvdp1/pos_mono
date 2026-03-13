import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { QuoteOverrideField } from "./quoteOverrideField";
import { QuoteOverrideEditNumber, QuoteOverrideEditRateType, QuoteOverrideEditText } from "./quoteOverrideEdit";
import { useState } from "react";

export const QuoteFormRatesEquipment = () => {
    const { t } = useTranslation()
    const [expandedRows, setExpandedRows] = useState<any>(null);

    const { control } = useFormContext<{ equipments: Array<Partial<{ id: string }>> }>()
    const equipment = useWatch({ control, name: "equipments" })
    const { update } = useFieldArray({
        control,
        name: "equipments",
        keyName: "_key"
    })

    const updateRow = (e: any) => {
        const newData = { ...e.newData }
        if (newData.name.quoteValue === "") delete newData.name.quoteValue
        if (newData.rate.quoteValue === null) delete newData.rate.quoteValue
        update(e.index, newData)
    }

    return (<DataTable
        value={equipment}
        className="w-full"
        size="small"
        editMode="row"
        onRowEditComplete={updateRow}
        sortField="equipmentGroup"
        rowGroupMode="subheader"
        groupRowsBy="equipmentGroup"
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowGroupHeaderTemplate={(data) => <span className="font-bold">{data.equipmentGroup || "Other"}</span>}
    >
        <Column header={t("name")} field="name" editor={(e) => <QuoteOverrideEditText  {...e} />} body={(rowData) => <QuoteOverrideField field={rowData.name} />} />
        <Column header={t("rate")} field="rate" editor={(e) => <QuoteOverrideEditNumber  {...e} />} body={rowData => <QuoteOverrideField field={rowData.rate} prefix="€ " />} />
        <Column header={t("rateType")} field="rateType" editor={(e) => <QuoteOverrideEditRateType  {...e} />} body={rowData => <QuoteOverrideField field={rowData.rateType} />} />
        <Column rowEditor/>
    </DataTable>)
}
