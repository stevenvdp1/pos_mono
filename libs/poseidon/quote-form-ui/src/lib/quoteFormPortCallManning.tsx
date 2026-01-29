import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IQuoteOverrideField, QuoteOverrideField } from "./quoteOverrideField";
import { QuoteOverrideEditNumber, QuoteOverrideEditText } from "./quoteOverrideEdit";
import { QuoteFormRow } from "./quoteFormRow";
import { QuoteNumberField } from "./quoteNumberField";

export const QuoteFormPortCallManning: React.FC<{ index: number }> = ({ index }) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const { update } = useFieldArray({
        control,
        name: `portCalls.${index}.teamConfiguration`,
        keyName: "_key"
    });
    const teamConfiguration = useWatch({ control, name: `portCalls.${index}.teamConfiguration` })

    const [expandedRows, setExpandedRows] = useState<any>(null);

    const updateRow = (e: any) => {
        let newData = { ...e.newData }
        if (newData.role.quoteValue === "") delete newData.role.quoteValue
        if (newData.count.quoteValue === null) delete newData.count.quoteValue
        update(e.index, newData)
    }

    return <DataTable
        value={teamConfiguration}
        editMode="row"
        onRowEditComplete={updateRow}
        onRowToggle={(e) => setExpandedRows(e.data)}
        expandedRows={expandedRows}
        dataKey='role.baseValue'

        rowExpansionTemplate={(data: { count: IQuoteOverrideField<number>, role: IQuoteOverrideField<string> }, options) => <QuoteFormPortCallManningExpansionTemplate {...data} {...options} portCallIndex={index} />}
    >
        <Column expander style={{ width: '5rem' }} />
        <Column field="role" header={t("role")} editor={(e) => <QuoteOverrideEditText  {...e} />} body={(rowData) => <QuoteOverrideField field={rowData.role} />} />
        <Column field="count" header={t("amount")} editor={(e) => <QuoteOverrideEditNumber  {...e} />} body={(rowData) => <QuoteOverrideField field={rowData.count} />} />
        <Column rowEditor />
    </DataTable>
}

export const QuoteFormPortCallManningExpansionTemplate: React.FC<{ count: IQuoteOverrideField<number>, role: IQuoteOverrideField<string>, portCallIndex: number, index:number }> = (props) => {
    // const { t } = useTranslation();
    // const repeat = props.count.quoteValue || props.count.configValue || props.count.baseValue || 0;
    return <div className="p-3">
        {/* <h5 className="mb-2">{t("roleDetails")}: {props.role.quoteValue || props.role.configValue || props.role.baseValue}</h5>
        {[...Array(repeat)].map((_, i) => (
            <QuoteFormRow key={i}>
                <QuoteNumberField fieldName={`portCalls.${props.portCallIndex}.teamConfiguration.${props.index}.workers.${i}.visa`} />
            </QuoteFormRow>
        ))} */}
    </div>
};
