import { create } from "zustand";

import { Test, Exercise } from "@prisma/client";
import { PublicProblems } from "~/server/api/client";

interface SidebarState {
  title: string;
  setTitle: (title: string) => void;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  problems?: PublicProblems[] | null;
  setProblems: (problems: PublicProblems[] | null) => void;
  test?: Test | null;
  setTest: (test: Test | null) => void;
  exercise?: Exercise | null;
  setExercise: (exercise: Exercise | null) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
  isShow: false,
  setIsShow: (isShow) => set({ isShow }),
  problems: [],
  setProblems: (problems) => set({ problems }),
  test: null,
  setTest: (test) => set({ test }),
  exercise: null,
  setExercise: (exercise) => set({ exercise }),
}));
