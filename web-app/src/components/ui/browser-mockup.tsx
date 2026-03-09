import React from "react";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
    children: React.ReactNode;
    className?: string;
}

export function BrowserMockup({ children, className }: BrowserMockupProps) {
    return (
        <div
            className={cn(
                "relative mx-auto rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden",
                className
            )}
        >
            <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-amber-400" />
                <div className="size-3 rounded-full bg-green-400" />
            </div>
            <div className="p-4 bg-white h-full relative">{children}</div>
        </div>
    );
}
