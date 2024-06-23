import { create } from "zustand";

import { PublicProblem } from "~/server/api/client";

interface ProblemState {
  problem: PublicProblem | null;
  setProblem: (problem: PublicProblem | null) => void;
}

export const useProblemStore = create<ProblemState>()((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),
}));
