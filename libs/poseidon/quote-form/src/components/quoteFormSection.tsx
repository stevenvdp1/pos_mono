import { PropsWithChildren, useId, useState } from "react";
import { useTranslation } from "react-i18next";

interface IQuoteFormSectionProps extends PropsWithChildren {
    label: string
}

export const QuoteFormSection: React.FC<IQuoteFormSectionProps> = ({ label, children }) => {

    const id = useId();
    const { t } = useTranslation();
    const [open, setOpen] = useState(true);

    return (
        <div id={id}>
            <div className="cursor-pointer bg-red-500 p-2" onClick={() => setOpen(!open)}>{t(label)}</div>
            <div className={open ? 'block' : 'hidden'}>
                {children}
            </div>
        </div>
    )
}