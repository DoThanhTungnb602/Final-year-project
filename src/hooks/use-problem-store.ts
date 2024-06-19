import { create } from "zustand";

import { Problem } from "@prisma/client";

interface ProblemState {
  problem: Problem | null;
  setProblem: (problem: Problem) => void;
}

export const useProblemStore = create<ProblemState>()((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),
}));
