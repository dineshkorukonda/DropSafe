"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

export function PasswordInput({
  label,
  name,
  id,
  autoComplete,
  placeholder,
  minLength,
}: {
  label: string;
  name: string;
  id?: string;
  autoComplete?: string;
  placeholder?: string;
  minLength?: number;
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          minLength={minLength}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-sm outline-none transition focus:border-emerald-600 focus:bg-white"
          placeholder={placeholder}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((value) => !value)}
          className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition hover:text-zinc-900"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}
