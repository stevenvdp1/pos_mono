import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import { getOverrideFieldValue, IQuoteOverrideField, IWorkerExpense, QuoteOverrideField } from "./quoteOverrideField";
import { QuoteOverrideEditNumber, QuoteOverrideEditText } from "./quoteOverrideEdit";

interface RoleExpensesTableProps {
    portCallIndex: number
    roleIndex: number
    expenseType: 'local' | 'external'
}

export const RoleExpensesTable: React.FC<RoleExpensesTableProps> = ({ portCallIndex, roleIndex, expenseType }) => {
    const { t } = useTranslation()
    const fieldName = `portCalls.${portCallIndex}.teamConfiguration.${roleIndex}.${expenseType}Expenses` as const

    const { control } = useFormContext<{
        portCalls: Array<{
            teamConfiguration: Array<{
                localExpenses: IWorkerExpense[]
                externalExpenses: IWorkerExpense[]
            }>
        }>
    }>()

    const expenses = useWatch({ control, name: fieldName })
    const { update, append, remove } = useFieldArray({
        control,
        name: fieldName,
        keyName: "_key"
    })

    const updateRow = (e: any) => {
        const newData = { ...e.newData }
        if (newData.description.quoteValue === "") delete newData.description.quoteValue
        if (newData.amount.quoteValue === null) delete newData.amount.quoteValue
        update(e.index, newData)
    }

    const addExpense = () => {
        append({
            id: crypto.randomUUID(),
            description: { baseValue: "" },
            amount: { baseValue: 0 }
        })
    }

    const deleteExpense = (index: number) => {
        remove(index)
    }

    const totalAmount = expenses?.reduce((sum, expense) => {
        return sum + (getOverrideFieldValue(expense?.amount as IQuoteOverrideField<number>) || 0)
    }, 0) ?? 0

    const footerGroup = (
        <div className="flex justify-end gap-4 p-2 font-bold">
            <span>{t("total")}:</span>
            <span>€ {totalAmount.toFixed(2)}</span>
        </div>
    )

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end">
                <Button 
                    icon="pi pi-plus" 
                    rounded 
                    size="small"
                    onClick={addExpense} 
                    type="button" 
                    tooltip={t("addExpense")}
                    tooltipOptions={{ position: 'left' }}
                />
            </div>
            {expenses && expenses.length > 0 ? (
                <DataTable
                    value={expenses}
                    className="w-full"
                    size="small"
                    editMode="row"
                    onRowEditComplete={updateRow}
                    dataKey="id"
                    footer={footerGroup}
                >
                    <Column 
                        header={t("description")} 
                        field="description" 
                        editor={(e) => <QuoteOverrideEditText {...e} />} 
                        body={(rowData) => <QuoteOverrideField field={rowData.description} />} 
                    />
                    <Column 
                        header={t("amount")} 
                        field="amount" 
                        editor={(e) => <QuoteOverrideEditNumber {...e} />} 
                        body={(rowData) => <QuoteOverrideField field={rowData.amount} prefix="€ " />} 
                    />
                    <Column rowEditor style={{ width: '7rem' }} />
                    <Column 
                        body={(_, options) => (
                            <Button 
                                icon="pi pi-trash" 
                                rounded 
                                text 
                                severity="danger" 
                                size="small"
                                onClick={() => deleteExpense(options.rowIndex)} 
                                type="button"
                            />
                        )} 
                        style={{ width: '3rem' }} 
                    />
                </DataTable>
            ) : (
                <div className="text-center text-gray-500 py-4">
                    {t("noExpenses")}
                </div>
            )}
        </div>
    )
}
