import { useClientConfigs, useRegionConfigs } from "@pos-mono/poseidon-api";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const QuoteFormConfig = () => {
    const { t } = useTranslation();
    const { control } = useFormContext();

    const options: Array<{ name: string, items: Array<{ id: string, name: string }> }> = [
        {
            name: 'region',
            items: [
                {
                    id: 'default',
                    name: 'Global (NL)'
                }
            ]
        },
        {
            name: 'client',
            items: []
        }
    ];

    const { data: regionConfigs } = useRegionConfigs();
    regionConfigs?.forEach(config => {
        if (config.id && config.name) {
            options[0].items.push({ id: config.id, name: config.name })
        }
    });

    const { data: clientConfigs } = useClientConfigs();
    clientConfigs?.forEach(config => {
        if (config.id && config.name) {
            options[1].items.push({ id: config.id, name: config.name })
        }
    });

    const groupedItemTemplate = (option: any) => {
        return <span>{t(option.name).toUpperCase()}</span>
    }

    return (
        <FloatLabel>
            <Controller
                name="configId"
                control={control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        className="w-full"
                        options={options}
                        dataKey="id"
                        optionValue="id"
                        optionLabel="name"
                        optionGroupLabel="name"
                        optionGroupChildren="items"
                        optionGroupTemplate={groupedItemTemplate}
                        scrollHeight="500px"
                    />
                )}
            />
            <label htmlFor={'configId'}>{t("config")}</label>
        </FloatLabel>
    )
}