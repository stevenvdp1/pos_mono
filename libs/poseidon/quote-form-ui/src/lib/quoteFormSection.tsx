import { PropsWithChildren, useId, useState } from "react";
import { useTranslation } from "react-i18next";

interface IQuoteFormSectionProps extends PropsWithChildren {
    label: string
    defaultOpen?: boolean
}

export const QuoteFormSection: React.FC<IQuoteFormSectionProps> = ({ label, children, defaultOpen=false }) => {
    const id = useId();
    const { t } = useTranslation();
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div id={id}>
            <div className="cursor-pointer p-2" onClick={() => setOpen(!open)}>{t(label)}</div>
            <div className={`${open ? 'block' : 'hidden'} grid gap-8 py-8 px-4`}>
                {children}
            </div>
        </div>
    )
}