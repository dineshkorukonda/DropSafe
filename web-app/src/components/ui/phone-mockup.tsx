import React from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
    children: React.ReactNode;
    className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
    return (
        <div
            className={cn(
                "relative mx-auto w-[280px] h-[580px] rounded-[40px] border-[8px] border-neutral-900 bg-white shadow-2xl overflow-hidden shadow-black/20",
                className
            )}
        >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-24 h-6 bg-neutral-900 rounded-b-xl" />
            </div>

            {/* Scrollable Content Area */}
            <div className="h-full w-full overflow-y-auto no-scrollbar relative z-10 bg-neutral-50">
                {children}
            </div>
        </div>
    );
}
