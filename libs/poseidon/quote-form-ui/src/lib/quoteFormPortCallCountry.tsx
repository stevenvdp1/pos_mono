import { useCountries } from "@pos-mono/poseidon-api";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel"
import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";

export const QuoteFormPortCallCountry: React.FC<{ index: number }> = ({ index }) => {
    const id = useId()
    const { t } = useTranslation();
    const { control } = useFormContext();
    const { data: countries, isPending } = useCountries();
    const options = countries?.map(country=>{
        if(country.regions && country.regions.length > 0){
            return country.regions.map(region=>({id: region.id, name: `${country.name} - ${region.name}`}))
        }
        return { id: country.id, name: country.name }
    }).flatMap(x => x)

    return (
        <FloatLabel>
            <Controller
                name={`portCalls.${index}.country`}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        id={id}
                        className="w-full"
                        options={options}
                        loading={isPending}
                        dataKey="id"
                        optionLabel="name"
                    />
                )}
            />
            <label htmlFor={`portCalls.${index}.country`}>{t("country")}</label>
        </FloatLabel>
    )
} 