import { create } from "zustand";

import { ProblemWithStatus } from "~/lib/types";

interface ProblemState {
  problem: ProblemWithStatus | null;
  setProblem: (problem: ProblemWithStatus | null) => void;
}

export const useProblemStore = create<ProblemState>()((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),
}));
