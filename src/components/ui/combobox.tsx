"use client";

import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown, X } from "lucide-react";

interface Option {
  id: string | number;
  label: string;
}

interface ComboboxFormProps {
  options: Option[];
  placeholder?: string;
  onChange: (selectedOption: Option | Option[] | null) => void;
  initialSelectedOption?: Option | Option[] | null;
  className?: string;
  multiSelect?: boolean;
}

export default function Component({
  options,
  placeholder = "Select an option",
  onChange,
  initialSelectedOption = null,
  className = "",
  multiSelect = false,
}: ComboboxFormProps) {
  const [selected, setSelected] = useState<Option | Option[] | null>(
    initialSelectedOption
  );
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleChange = (newSelected: Option | Option[]) => {
    if (multiSelect) {
      const updatedSelected = Array.isArray(selected) ? [...selected] : [];
      if (Array.isArray(newSelected)) {
        newSelected.forEach((option) => {
          if (!updatedSelected.some((item) => item.id === option.id)) {
            updatedSelected.push(option);
          }
        });
      } else if (!updatedSelected.some((item) => item.id === newSelected.id)) {
        updatedSelected.push(newSelected);
      }
      setSelected(updatedSelected);
      onChange(updatedSelected);
    } else {
      setSelected(newSelected);
      onChange(newSelected);
    }
  };

  const removeOption = (optionToRemove: Option) => {
    if (Array.isArray(selected)) {
      const newSelected = selected.filter(
        (option) => option.id !== optionToRemove.id
      );
      setSelected(newSelected);
      onChange(newSelected);
    }
  };

  return (
    <div className={`${className}`}>
      <Combobox value={selected} onChange={handleChange} multiple={multiSelect}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
            <div className="flex flex-wrap gap-1 p-1">
              {multiSelect &&
                Array.isArray(selected) &&
                selected.length > 0 &&
                selected.map((option) => (
                  <span
                    key={option.id}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground"
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeOption(option);
                      }}
                      className="ml-1 inline-flex items-center p-0.5 rounded-sm hover:bg-primary-foreground hover:text-primary"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(option: Option | Option[] | null) =>
                  Array.isArray(option) ? query : option?.label ?? ""
                }
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
              />
            </div>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-primary-foreground"
                                : "text-primary"
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
