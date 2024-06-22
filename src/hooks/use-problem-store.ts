import { create } from "zustand";

import { ProblemWithSkeletonCode } from "~/lib/types";

interface ProblemState {
  problem: ProblemWithSkeletonCode | null;
  setProblem: (problem: ProblemWithSkeletonCode | null) => void;
}

export const useProblemStore = create<ProblemState>()((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),
}));
