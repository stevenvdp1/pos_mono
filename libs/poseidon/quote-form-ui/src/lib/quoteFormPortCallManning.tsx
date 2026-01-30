import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getOverrideFieldValue, IQuoteOverrideField, QuoteOverrideField } from "./quoteOverrideField";
import { QuoteOverrideEditNumber, QuoteOverrideEditText } from "./quoteOverrideEdit";
import { InputNumber } from "primereact/inputnumber";

export const QuoteFormPortCallManning: React.FC<{ index: number }> = ({ index }) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const { update } = useFieldArray({
        control,
        name: `portCalls.${index}.teamConfiguration`,
        keyName: "_key"
    });
    const teamConfiguration = useWatch({ control, name: `portCalls.${index}.teamConfiguration` })

    const updateRow = (e: any) => {
        let newData = { ...e.newData }
        if (newData.role.quoteValue === "") delete newData.role.quoteValue
        if (newData.count.quoteValue === null) delete newData.count.quoteValue
        if (newData.external > getOverrideFieldValue(newData.count as IQuoteOverrideField<number>)) {
            newData.external = getOverrideFieldValue(newData.count as IQuoteOverrideField<number>)
        }
        update(e.index, newData)
    }

    return <DataTable
        value={teamConfiguration}
        editMode="row"
        onRowEditComplete={updateRow}
        dataKey='id'
    >
        <Column field="role" header={t("role")} editor={(options) => <QuoteOverrideEditText  {...options} />} body={(rowData) => <QuoteOverrideField field={rowData.role} />} />
        <Column field="count" header={t("amount")} editor={(options) => <QuoteOverrideEditNumber  {...options} />} body={(rowData) => <QuoteOverrideField field={rowData.count} />} />
        <Column field="external" header={t("external")} editor={(options) => <InputNumber className="w-full" value={options.rowData.external} onValueChange={e => options.editorCallback?.(e.value ?? 0)} />} />
        <Column field="local" header={t("local")} body={(rowData) => <span>{getOverrideFieldValue(rowData.count as IQuoteOverrideField<number>) - rowData.external}</span>} />
        <Column rowEditor />
    </DataTable>
}