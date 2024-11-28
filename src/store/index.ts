import { create } from "zustand";

type State = {
  result: number;
  setResult: (newResult: number) => void;
};

const useStore = create<State>((set) => ({
  result: 0,
  setResult: (newResult) => set({ result: newResult }),
}));

export default useStore;
