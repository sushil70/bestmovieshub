"use client";
import UserTable from "./Table";
import { Suspense, useEffect } from "react";
import { useMoviesTableData } from "../actions/store/globalStore";
import { getTableMovieList } from "../actions/getMovies";

export default function Admin() {
  const { moviesData, setMoviesData } = useMoviesTableData();
  useEffect(() => {
    (async () => {
      const { movies } = await getTableMovieList();
      setMoviesData(movies);
    })();
  }, []);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable data={moviesData} />
      </Suspense>
    </main>
  );
}
