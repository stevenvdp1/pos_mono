import { FloatLabel } from "primereact/floatlabel"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { Dropdown } from 'primereact/dropdown';
import { useClientConfigs } from "@pos-mono/poseidon-api"
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

export const QuoteFormClientName = () => {
    const { data: clientConfigs, isPending } = useClientConfigs()
    const { control } = useFormContext();
    const { t } = useTranslation();

    const [clientNote, setClientNote] = useState(undefined)

    return (
        <>
            <FloatLabel>
                <Controller
                    name="clientName"
                    control={control}
                    render={({ field }) => (
                        <Dropdown
                            {...field}
                            editable
                            className="w-full"
                            options={clientConfigs?.map(client => (client)) || []}
                            optionLabel="name"
                            onChange={(e) => {
                                field.onChange(e.value)
                                if (typeof e.value === "string") setClientNote(undefined)
                                else setClientNote(e.value?.note || undefined)
                            }}
                            loading={isPending}
                        />
                    )}
                />
                <label htmlFor="clientName">{t("clientName")}</label>
            </FloatLabel>
            {
                clientNote &&
                <FloatLabel>
                    <InputTextarea
                        className="w-full"
                        value={clientNote}
                        disabled
                        rows={5}
                    />
                    <label htmlFor={"clientNote"}>{t("clientNote")}</label>
                </FloatLabel>
            }
        </>
    )
}