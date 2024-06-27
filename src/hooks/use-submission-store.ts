import { create } from "zustand";

import { RunSubmissionResult } from "~/server/api/client";

interface RunResultState {
  result: RunSubmissionResult | null;
  setResult: (result: RunSubmissionResult) => void;
}

export const useRunResultStore = create<RunResultState>()((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));
