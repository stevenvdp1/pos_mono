import React from "react"

const colClasses = [
    "",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
]

export const QuoteFormRow = ({ children }: { children: React.ReactNode }) => {
    const count = React.Children.count(children);
    return (
        <div className={`grid ${colClasses[count]} gap-8`}>
            {children}
        </div>
    )
}