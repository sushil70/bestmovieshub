"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/ui/Input";
import ComboboxForm from "@/components/ui/combobox";
import { addMovie, updateMovie } from "@/app/actions/addMovie";
import { useEffect, useState } from "react";
import CustomDatePicker from "@/components/ui/DatePicker";
import getActors from "../actions/getActors";
import { getDirector } from "../actions/addDirector";
import { convertToMinutes } from "@/lib/constant";
import { getTableMovieList } from "../actions/getMovies";
import { useMoviesTableData } from "../actions/store/globalStore";

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
  releaseDate: z.string().optional(),
  genre: z.array(z.object({ id: z.string(), label: z.string() })).min(0),
  languages: z
    .object({ id: z.string(), label: z.string() })
    .nullable()
    .optional(),
  actors: z
    .array(z.object({ id: z.string(), label: z.string() }))
    .min(0)
    .optional(),
  director: z
    .array(z.object({ id: z.string(), label: z.string() }))
    .min(0)
    .optional(),
  writer: z
    .array(z.object({ id: z.string(), label: z.string() }))
    .min(0)
    .optional(),
  producer: z
    .array(z.object({ id: z.string(), label: z.string() }))
    .min(0)
    .optional(),

  trailerLink: z.string().optional(),
  reviews: z
    .array(
      z.object({ user: z.string(), comment: z.string(), rating: z.string() })
    )
    .min(0)
    .optional(),
  tags: z.string().optional().optional(),
  ageRating: z.string().optional().optional(),
  awards: z.array(z.string()).min(0).optional(),
  soundtrack: z
    .array(z.object({ title: z.string(), artist: z.string() }))
    .min(0)
    .optional(),
  funFacts: z.array(z.string()).min(0).optional(),
  downloadLinks: z
    .array(
      z.object({
        id: z.string().url("Must be a valid URL"),
        label: z.string(),
      })
    )
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddForm({
  setIsOpen,
  initialState,
  setInitialState,
}: any) {
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [downloadLinks, setDownloadLinks] = useState<
    { id: string; label: string }[]
  >(initialState?.downloadLinks || []);

  const { setMoviesData } = useMoviesTableData();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState
      ? {
          ...initialState,
          runtime:
            initialState?.type?.id === "series"
              ? parseInt(initialState?.runtime)
              : convertToMinutes(initialState.runtime).toString(),
          tags: initialState.tags.join("#"),
        }
      : {
          title: "",
          type: { id: "movie", label: "Movie" },
          noOfImages: "8",
        },
  });

  const [actors, setActors] = useState<any[]>([]);
  const [director, setDirector] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { actors, error: actorsError } = await getActors();
      if (actors) {
        setActors(actors);
      } else {
        console.error(actorsError);
      }

      const { director, error: directorError } = await getDirector();
      if (director) {
        setDirector(director);
      } else {
        console.error(directorError);
      }
    })();
  }, []);

  const onSubmit = async (data: any) => {
    const tagsData =
      data.tags
        ?.replace(/\s+/g, "")
        ?.replace(/\n/g, "")
        ?.replace(/,/g, "")
        ?.split("#")
        .filter((tag: string) => tag !== "") || [];

    tagsData.push(...data.genre.map((g: any) => g.label));
    tagsData.push(...data.actors.map((actor: any) => actor.label));
    tagsData.push(...data.director.map((d: any) => d.label));

    const formData = {
      ...data,
      profileImage: `${data.title}p`,
      images: Array.from({ length: parseInt(data?.noOfImages) }).map(
        (n: any, index: number) => (data.title + (index + 1)).toString()
      ),
      backdropImage: `${data.title}b`,
      year: data.releaseDate?.split("-")?.[0] || "",
      details: `${data.title} (${data.releaseDate?.split("-")?.[0] || ""}) ${
        data.languages?.label ? data.languages?.label : ""
      }`,
      runtime:
        data.type.id === "movie"
          ? `${Math.floor(parseInt(data.runtime) / 60)}h ${
              parseInt(data.runtime) % 60
            }min`
          : data.type.id === "series"
          ? `${data.runtime} Episodes`
          : "",
      tags: tagsData,
    };

    let result: any = "";

    if (initialState) {
      result = await updateMovie(formData, initialState.id);
    } else {
      result = await addMovie(formData);
    }

    if (result.success) {
      setSubmitStatus({ success: true, message: "Movie added successfully!" });
      setInitialState("");
      setIsOpen(false);
      const { movies } = await getTableMovieList();
      setMoviesData(movies);
    } else {
      setSubmitStatus({
        success: false,
        message: result.error || "Failed to add movie",
      });
    }
  };

  const addDownloadLink = () => {
    setDownloadLinks([...downloadLinks, { id: "", label: "480p" }]);
  };

  const removeDownloadLink = (index: number) => {
    const newLinks = [...downloadLinks];
    newLinks.splice(index, 1);
    setDownloadLinks(newLinks);
  };

  const updateDownloadLink = (
    index: number,
    field: "id" | "label",
    value: string
  ) => {
    const newLinks = [...downloadLinks];
    newLinks[index][field] = value;
    setDownloadLinks(newLinks);
    setValue("downloadLinks", newLinks);
  };

  return (
    <div className="container mx-auto px-4 md:px-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full overflow-y-auto  h-[calc(100vh-140px)] mx-auto  bg-white rounded-lg flex  flex-wrap "
      >
        <FormInput
          label="Title"
          id="title"
          type="text"
          register={register}
          error={errors.title}
          className="w-1/2 mb-4 pr-2"
        />
        <ComboboxForm
          placeholder="Select type"
          onChange={(e) => {
            setValue("type", e as any, { shouldValidate: true });
          }}
          className=" w-1/2 mb-4 pr-2"
          options={[
            { id: "movie", label: "Movie" },
            { id: "series", label: "Series" },
            { id: "episode", label: "Episode" },
          ]}
          initialSelectedOption={getValues("type") || []}
        />
        <FormInput
          label="Number of Image"
          id="noOfImages"
          type="number"
          register={register}
          min={0}
          className="w-1/2 mb-4 pr-2"
        />

        <FormInput
          label="Rating"
          id="rating"
          type="text"
          register={register}
          className="w-1/2 mb-4 pr-2"
        />

        <ComboboxForm
          placeholder="Genre"
          onChange={(e) => {
            setValue("genre", e as any);
          }}
          className=" w-1/2 mb-4 pr-2"
          options={[
            { id: "18+", label: "18+" },
            { id: "action", label: "Action" },
            { id: "adventure", label: "Adventure" },
            { id: "animation", label: "Animation" },
            { id: "comedy", label: "Comedy" },
            { id: "crime", label: "Crime" },
            { id: "documentary", label: "Documentary" },
            { id: "drama", label: "Drama" },
            { id: "fantasy", label: "Fantasy" },
            { id: "horror", label: "Horror" },
            { id: "musical", label: "Musical" },
            { id: "mystery", label: "Mystery" },
            { id: "romance", label: "Romance" },
            { id: "scienceFiction", label: "Science Fiction" },
            { id: "thriller", label: "Thriller" },
            { id: "war", label: "War" },
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
          className="w-1/2 mb-4 pr-2"
        />

        <ComboboxForm
          placeholder="Languages"
          onChange={(e) => {
            setValue("languages", e as any);
          }}
          className=" w-1/2 mb-4 pr-2"
          options={[
            { id: "hindi", label: "Hindi" },
            {
              id: "DualAudio[Hindi+English]",
              label: "Dual Audio [Hindi + English]",
            },
            {
              id: "DualAudio[Hindi+Tamil]",
              label: "Dual Audio [Hindi + Tamil]",
            },
            { id: "hindiDubbed", label: "Hindi Dubbed" },
            { id: "english", label: "English" },
            { id: "tamil", label: "Tamil" },
            { id: "telugu", label: "Telugu" },
          ]}
          initialSelectedOption={getValues("languages") || null}
        />

        <ComboboxForm
          placeholder="Actors"
          onChange={(e) => {
            setValue("actors", e as any);
          }}
          className=" w-1/2 mb-4 pr-2"
          options={actors}
          initialSelectedOption={getValues("actors") || []}
          multiSelect={true}
        />

        <ComboboxForm
          placeholder="Director"
          onChange={(e) => {
            setValue("director", e as any);
          }}
          className=" w-1/2 mb-4 pr-2"
          options={director}
          initialSelectedOption={getValues("director") || []}
          multiSelect={true}
        />

        <CustomDatePicker
          control={control}
          name="releaseDate"
          placeholder="Release Date"
          error={errors.releaseDate}
          className="col-span-1"
        />

        <FormInput
          label="Description"
          id="description"
          textArea={true}
          register={register}
          className="w-1/2 mb-4 pr-2"
        />

        <FormInput
          label="StorySummary"
          id="storySummary"
          textArea={true}
          register={register}
          className="w-1/2 mb-4 pr-2"
        />

        <ComboboxForm
          placeholder="Writer"
          onChange={(e) => {
            setValue("writer", e as any);
          }}
          className=" w-1/2 mb-4 pr-2"
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
          className=" w-1/2 mb-4 pr-2"
          options={[
            { id: "producer 1", label: "producer 1" },
            { id: "producer 2", label: "producer 2" },
          ]}
          initialSelectedOption={getValues("producer") || []}
          multiSelect={true}
        />

        <FormInput
          label="Trailer Link"
          id="trailerLink"
          type="text"
          register={register}
          className="w-1/2 mb-4 pr-2"
        />

        <FormInput
          label="Age Rating"
          id="ageRating"
          type="text"
          register={register}
          className="w-1/2 mb-4 pr-2"
        />

        <FormInput
          label="Tags"
          id="tags"
          textArea={true}
          register={register}
          className="w-1/2 mb-4 pr-2"
        />

        <div className="w-full mb-4">
          <h3 className="text-lg font-semibold mb-2">Download Links</h3>
          {downloadLinks.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="url"
                placeholder="Download URL"
                value={link.id}
                onChange={(e) =>
                  updateDownloadLink(index, "id", e.target.value)
                }
                className="flex-grow mr-2 p-2 border rounded"
              />
              <select
                value={link.label}
                onChange={(e) =>
                  updateDownloadLink(index, "label", e.target.value)
                }
                className="mr-2 p-2 border rounded"
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="2K">2K</option>
                <option value="4K">4K</option>
              </select>
              <button
                type="button"
                onClick={() => removeDownloadLink(index)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDownloadLink}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Add Download Link
          </button>
        </div>

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
