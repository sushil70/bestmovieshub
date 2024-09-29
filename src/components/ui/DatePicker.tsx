"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import moment from "moment";

interface DatePickerProps {
  control: any;
  name: string;
  placeholder: string;
  error?: any;
  className?: string;
}

export default function CustomDatePicker({
  control,
  name,
  placeholder,
  error,
  className,
}: DatePickerProps) {
  return (
    <div className={`relative ${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="relative">
            <DatePicker
              onChange={(date: any) =>
                onChange(date ? moment(date).format("YYYY-MM-DD") : "")
              }
              selected={value ? new Date(value) : null}
              dateFormat="MM/dd/yyyy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400"
              placeholderText={placeholder}
            />
            <CalendarIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
