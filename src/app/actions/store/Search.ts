import { create } from "zustand";

interface searchState {
  search: string;
  setSearch: (value: string) => void;
}

const useSearch = create<searchState>()((set) => ({
  search: "",
  setSearch: (value) => set(() => ({ search: value })),
}));

export default useSearch;
