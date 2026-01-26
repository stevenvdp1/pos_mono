import React from "react"

export const QuoteFormRow = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`grid grid-cols-${React.Children.count(children)} gap-8`}>
            {children}
        </div>
    )
}