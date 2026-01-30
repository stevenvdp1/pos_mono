import { EquipmentDtoRateType } from "@pos-mono/poseidon-api"
import { ColumnEditorOptions } from "primereact/column"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"

export const QuoteOverrideEditText = (options: ColumnEditorOptions) => {
    const field = options.rowData[options.field]
    const value = field.quoteValue ?? field.configValue ?? field.baseValue
    return <InputText className="w-full" type="text" value={value} onChange={e => options.editorCallback?.({ ...field, quoteValue: e.target.value })} />
}

export const QuoteOverrideEditNumber = (options: ColumnEditorOptions) => {
    const field = options.rowData[options.field]
    const value = field.quoteValue ?? field.configValue ?? field.baseValue
    return <InputNumber className="w-full" value={value} onValueChange={e => options.editorCallback?.({ ...field, quoteValue: e.value })} />
}

export const QuoteOverrideEditRateType = (options: ColumnEditorOptions) => {
    const field = options.rowData[options.field]
    const value = field.quoteValue ?? field.configValue ?? field.baseValue
    return (
        <Dropdown
            className="w-full"
            value={value}
            options={Object.values(EquipmentDtoRateType).map(rt => ({ label: rt, value: rt }))}
            onChange={e=>options.editorCallback?.({ ...field, quoteValue: e.value })}
        />
    )
}