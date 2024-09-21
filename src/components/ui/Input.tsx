import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  options?: { value: string; label: string }[];
}

export default function FormInput({
  label,
  id,
  register,
  error,
  options,
  ...props
}: InputProps) {
  const InputComponent = options ? "select" : "input";

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <InputComponent
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register(id)}
        {...props}
      >
        {options && [
          <option key="default" value="">
            Select an option
          </option>,
          ...options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )),
        ]}
      </InputComponent>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
