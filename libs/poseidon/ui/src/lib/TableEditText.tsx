import { InputText } from 'primereact/inputtext';
import type { ColumnEditorOptions } from "primereact/column";

export const TableEditText = (options:ColumnEditorOptions) => <InputText className="w-full p-inputtext-sm" type="text" value={options.value} onChange={e=>options.editorCallback?.(e)}/>