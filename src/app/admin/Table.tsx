"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import manageAccess from "@/app/actions/AccessManage";
import { Modal } from "../../components/ui/Model";
import AddForm from "@/app/admin/AddForm";
import { Input } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";
import AddActorsForm from "./AddActorsForm";
import { addActors } from "../actions/addActors";
import { TOCAMELCASE } from "@/lib/constant";
import { addDirector } from "../actions/addDirector";
import { Switch } from "@/components/ui/switch";
import { switchShow } from "../actions/addMovie";
import { getTableMovieList } from "../actions/getMovies";
import { useMoviesTableData } from "../actions/store/globalStore";

const UserTable: React.FC<any> = ({ data }) => {
  const router = useRouter();
  const idSearchParams: string | null = useSearchParams().get("id");
  const { setMoviesData } = useMoviesTableData();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActors, setIsOpenActors] = useState(false);
  const [isOpenDirector, setIsOpenDirector] = useState(false);
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      manageAccess(idSearchParams, router);
    } else {
      router.push("/");
    }
    setCheckingAccess(false);
  }, [idSearchParams]);

  if (checkingAccess) {
    return <div></div>;
  }

  const handleAddActors = async (data: []) => {
    const formData = data.map((item: any) => ({
      ...item,
      id: TOCAMELCASE(item.id),
    }));

    const result = await addActors(formData);

    if (result.success) {
      // setSubmitStatus({ success: true, message: "Movie added successfully!" });
      setIsOpenActors(false);
    } else {
      // setSubmitStatus({
      //   success: false,
      //   message: result.error || "Failed to add movie",
      // });
    }
  };

  const handleAddDirector = async (data: []) => {
    const formData = data.map((item: any) => ({
      ...item,
      id: TOCAMELCASE(item.id),
    }));

    const result = await addDirector(formData);

    if (result.success) {
      // setSubmitStatus({ success: true, message: "Movie added successfully!" });
      setIsOpenDirector(false);
    } else {
      // setSubmitStatus({
      //   success: false,
      //   message: result.error || "Failed to add movie",
      // });
    }
  };

  const switchVisibility = async ({
    id,
    show,
  }: {
    id: string;
    show: boolean;
  }) => {
    const result = await switchShow(id, show);

    if (result.success) {
      const { movies } = await getTableMovieList();
      setMoviesData(movies);
    } else {
      // setSubmitStatus({
      //   success: false,
      //   message: result.error || "Failed to add movie",
      // });
    }
  };

  return (
    <>
      <div className="flex flex-col"></div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <header className="max-w-7xl mx-auto py-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Movie Collection
          </h1>
          <div className="flex flex-wrap justify-between w-full">
            <Input
              type="search"
              placeholder="Search movies or directors..."
              className="max-w-md mb-4"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex">
              <Button
                variant="default"
                className="mb-8 w-fit flex mr-8 "
                onClick={() => setIsOpenDirector(true)}
              >
                Add Director
              </Button>

              <Button
                variant="default"
                className="mb-8 w-fit flex mr-8 "
                onClick={() => setIsOpenActors(true)}
              >
                Add Actors
              </Button>

              <Button
                variant="default"
                className="mb-8 w-fit flex mr-8 "
                onClick={() => setIsOpen(true)}
              >
                Add Movie
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((movie: any) => (
                <TableRow key={movie.id}>
                  <TableCell className="font-medium">{movie.title}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>
                    {movie.genre?.map((genre: any, index: number) => (
                      <Badge key={index} variant="default">
                        {genre?.label}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>{movie.languages?.label}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {movie.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      // defaultChecked={movie.show}
                      onClick={() => {
                        switchVisibility({ id: movie.id, show: !movie.show });
                      }}
                      checked={movie.show}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="link" size="sm">
                      Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setIsOpen(true);
                        setInitialState(movie);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Movies"
      >
        <AddForm
          setIsOpen={setIsOpen}
          initialState={initialState}
          setInitialState={setInitialState}
        />
      </Modal>

      <Modal
        isOpen={isOpenActors}
        onClose={() => setIsOpenActors(false)}
        title="Add Actors"
      >
        <AddActorsForm handleAddActors={handleAddActors} />
      </Modal>

      <Modal
        isOpen={isOpenDirector}
        onClose={() => setIsOpenDirector(false)}
        title="Add Director"
      >
        <AddActorsForm handleAddActors={handleAddDirector} />
      </Modal>
    </>
  );
};

export default UserTable;
