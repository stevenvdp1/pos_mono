import { ColumnEditorOptions } from "primereact/column"
import { InputText } from "primereact/inputtext"

export const QuoteOverrideEditText = (options:ColumnEditorOptions) =>{
    const field = options.rowData[options.field]
    const value = field.quoteValue ?? field.configValue ?? field.baseValue
    return <InputText className="w-full p-inputtext-sm" type="text" value={value} onChange={e=>options.editorCallback?.({...field, quoteValue: e.target.value})} />
}   