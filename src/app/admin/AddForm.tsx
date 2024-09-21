"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/ui/Input";
import ComboboxForm from "@/components/ui/combobox";
import { addMovie } from "@/app/actions/addMovie";
import { useState } from "react";

// Define the form schema using Zod
const formSchema = z.object({
  title: z.string().min(1, "Required*"),
  profileImage: z.string().min(1, "Required*"),
  type: z.object(
    { id: z.string(), label: z.string() },
    { required_error: "Required*" }
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function AddForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("profileImage", data.profileImage);
    formData.append("type", data.type.id);

    const result = await addMovie(formData);

    if (result.success) {
      setSubmitStatus({ success: true, message: "Movie added successfully!" });
    } else {
      setSubmitStatus({
        success: false,
        message: result.error || "Failed to add movie",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        {/* {console.log("register", register)} */}

        <h2 className="text-2xl font-bold mb-6 text-center">Add Movie</h2>
        <FormInput
          label="Title"
          id="title"
          type="text"
          register={register}
          error={errors.title}
        />
        <FormInput
          label="Profile Image"
          id="profileImage"
          type="text"
          register={register}
          error={errors.profileImage}
        />
        <ComboboxForm
          placeholder="Select type"
          onChange={(e) => {
            setValue("type", e as any, { shouldValidate: true });
          }}
          className="mb-4"
          options={[
            { id: "movie", label: "Movie" },
            { id: "series", label: "Series" },
            { id: "episode", label: "Episode" },
          ]}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          aria-live="polite"
        >
          {isSubmitting ? "Adding..." : "Add Movie"}
        </button>
        {submitStatus && (
          <p
            className={`mt-4 text-center ${
              submitStatus.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {submitStatus.message}
          </p>
        )}
      </form>
    </div>
  );
}
