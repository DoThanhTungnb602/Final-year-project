import { create } from "zustand";

import { Test, Exercise } from "@prisma/client";
import { ProblemWithStatus } from "~/lib/types";

interface SidebarState {
  problems?: ProblemWithStatus[];
  setProblems: (problems: ProblemWithStatus[]) => void;
  test?: Test | null;
  setTest: (test: Test) => void;
  exercise?: Exercise | null;
  setExercise: (exercise: Exercise) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  problems: [],
  setProblems: (problems) => set({ problems }),
  test: null,
  setTest: (test) => set({ test }),
  exercise: null,
  setExercise: (exercise) => set({ exercise }),
}));
