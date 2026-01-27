import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { QuoteOverrideField } from "./quoteOverrideField";
import { QuoteOverrideEditText } from "./quoteOverrideEdit";

export const QuoteFormRatesEquipment = () => {
    const { t } = useTranslation()
    const { control } = useFormContext<{ equipments: Array<Partial<{ id: string }>> }>()
    const equipment = useWatch({ control, name: "equipments" })
    const { fields, update } = useFieldArray({
        control,
        name: "equipments",
        keyName: "_key"
    })

    const updateRow = (e:any) => {
        update(e.index, e.newData)
    }

    return (<DataTable value={equipment} className="w-full" editMode="row" onRowEditComplete={updateRow}>
        <Column header={t("name")} field="name" editor={(e)=><QuoteOverrideEditText  {...e}/>} body={(rowData) => <QuoteOverrideField field={rowData.name} />} />
        <Column header={t("rate")} field="rate" body={rowData => <QuoteOverrideField field={rowData.rate} />} />
        <Column header={t("rateType")} field="rateType" body={rowData => <QuoteOverrideField field={rowData.rateType} />} />
        <Column rowEditor />
    </DataTable>)
}
