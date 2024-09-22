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
  type: z.object(
    { id: z.string(), label: z.string() },
    { required_error: "Required*" }
  ),
  noOfImages: z.string(),
  rating: z.string(),
  runtime: z.string(),
  description: z.string(),
  storySummary: z.string(),
  releaseDate: z.string(),
  genre: z.array(z.object({ id: z.string(), label: z.string() })).min(0),
  languages: z.object({ id: z.string(), label: z.string() }).nullable(),
  actors: z.array(z.object({ id: z.string(), label: z.string() })).min(0),
  director: z.array(z.object({ id: z.string(), label: z.string() })).min(0),
  writer: z.array(z.object({ id: z.string(), label: z.string() })).min(0),
  producer: z.array(z.object({ id: z.string(), label: z.string() })).min(0),
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
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);

    const formData = {
      ...data,
      profileImage: `${data.title}p`,
      images: Array.from({ length: parseInt(data?.noOfImages) }).map(
        (n: any, index: number) => (data.title + (index + 1)).toString()
      ),
      year: data.releaseDate?.split("/")?.[2] || "",
      details: `${data.title} (${data?.releaseDate?.split("/")?.[2] || ""}) ${
        data.languages?.label && ""
      }`,
    };

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
        className="w-full overflow-y-auto  h-[calc(100vh-140px)] mx-auto  bg-white rounded-lg flex flex-col "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Movie</h2>
        <FormInput
          label="Title"
          id="title"
          type="text"
          register={register}
          error={errors.title}
          className="w-1/3 mb-4"
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
        <FormInput
          label="Number of Image"
          id="noOfImages"
          type="number"
          register={register}
          min={0}
        />

        <FormInput label="Rating" id="rating" type="text" register={register} />

        <ComboboxForm
          placeholder="Genre"
          onChange={(e) => {
            setValue("genre", e as any);
          }}
          className="mb-4"
          options={[
            { id: "action", label: "Action" },
            { id: "comedy", label: "Comedy" },
            { id: "documentary", label: "Documentary" },
            { id: "drama", label: "Drama" },
            { id: "fantasy", label: "Fantasy" },
            { id: "horror", label: "Horror" },
            { id: "musical", label: "Musical" },
            { id: "mystery", label: "Mystery" },
            { id: "romance", label: "Romance" },
            { id: "scienceFiction", label: "Science Fiction" },
            { id: "thriller", label: "Thriller" },
            { id: "western", label: "Western" },
          ]}
          initialSelectedOption={getValues("genre") || []}
          multiSelect={true}
        />

        <FormInput
          label="Runtime"
          id="runtime"
          type="text"
          register={register}
        />

        <ComboboxForm
          placeholder="Languages"
          onChange={(e) => {
            setValue("languages", e as any);
          }}
          className="mb-4"
          options={[
            { id: "hindi", label: "Hindi" },
            { id: "english", label: "English" },
            { id: "tamil", label: "Tamil" },
            { id: "telugu", label: "Telugu" },
          ]}
          initialSelectedOption={getValues("languages") || null}
        />

        <FormInput
          label="Description"
          id="description"
          type="textbox"
          register={register}
        />

        <FormInput
          label="StorySummary"
          id="storySummary"
          type="textbox"
          register={register}
        />

        <ComboboxForm
          placeholder="Actors"
          onChange={(e) => {
            setValue("actors", e as any);
          }}
          className="mb-4"
          options={[
            { id: "amir", label: "Amir" },
            { id: "salman", label: "Salman" },
            { id: "john", label: "John" },
            { id: "srk", label: "Shahrukh Khan" },
          ]}
          initialSelectedOption={getValues("actors") || []}
          multiSelect={true}
        />

        <ComboboxForm
          placeholder="Director"
          onChange={(e) => {
            setValue("director", e as any);
          }}
          className="mb-4"
          options={[
            { id: "ramesh", label: "Ramesh" },
            { id: "pawan", label: "Pawan" },
          ]}
          initialSelectedOption={getValues("director") || []}
          multiSelect={true}
        />

        <ComboboxForm
          placeholder="Writer"
          onChange={(e) => {
            setValue("writer", e as any);
          }}
          className="mb-4"
          options={[
            { id: "writer 1", label: "Writer 1" },
            { id: "writer 2", label: "Writer 2" },
          ]}
          initialSelectedOption={getValues("writer") || []}
          multiSelect={true}
        />

        <ComboboxForm
          placeholder="Producer"
          onChange={(e) => {
            setValue("producer", e as any);
          }}
          className="mb-4"
          options={[
            { id: "producer 1", label: "producer 1" },
            { id: "producer 2", label: "producer 2" },
          ]}
          initialSelectedOption={getValues("producer") || []}
          multiSelect={true}
        />

        <FormInput
          label="Release Date"
          id="releaseDate"
          type="text"
          register={register}
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
