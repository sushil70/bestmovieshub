import { create } from "zustand";

interface searchState {
  search: string;
  setSearch: (value: string) => void;
}

const useSearch = create<searchState>()((set) => ({
  search: "",
  setSearch: (value) => set(() => ({ search: value })),
}));

const useMoviesTableData = create<any>()((set) => ({
  moviesData: [],
  setMoviesData: (value: any) => set(() => ({ moviesData: value })),
}));

export { useSearch, useMoviesTableData };
