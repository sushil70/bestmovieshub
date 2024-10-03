"use client";

import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FormInput from "@/components/ui/Input";

interface MovieField {
  id: string;
  label: string;
}

export default function AddActorsForm({ handleAddActors }: any) {
  const [fields, setFields] = useState<MovieField[]>([]);

  const addField = () => {
    setFields([...fields, { id: "", label: "" }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: keyof MovieField, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddActors(fields);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto px-4 md:px-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <FormInput
                id={`id-${index}`}
                value={field.id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateField(index, "id", e.target.value)
                }
                placeholder="Enter ID"
              />
            </div>
            <div className="flex-1">
              <FormInput
                id={`label-${index}`}
                value={field.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateField(index, "label", e.target.value)
                }
                placeholder="Enter Label"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              className=""
              onClick={() => removeField(index)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addField} className="w-full">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Field
        </Button>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
