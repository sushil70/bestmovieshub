import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
  type?: string;
  min?: number;
  textArea?: boolean;
}

export default function FormInput({
  label,
  id,
  register,
  error,
  className = "mb-4",
  type,
  min = 0,
  textArea = false,
  ...props
}: InputProps) {
  return (
    <div className={className}>
      {textArea ? (
        <textarea
          id={id}
          placeholder={label}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...register(id)}
          // {...props}
        />
      ) : (
        <input
          id={id}
          placeholder={label}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          type={type}
          min={min}
          {...register(id)}
          {...props}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
