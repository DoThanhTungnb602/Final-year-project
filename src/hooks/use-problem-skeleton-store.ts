import { create } from "zustand";
import { Language } from "@prisma/client";

interface ProblemSkeletonStore {
  languages: Language[] | null;
  setLanguages: (languages: Language[]) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  codeMap: Map<Language["name"], string>;
  setCodeMap: ({
    language,
    code,
  }: {
    language: Language["name"];
    code: string;
  }) => void;
}

export const useProblemSkeletonStore = create<ProblemSkeletonStore>((set) => ({
  languages: null,
  setLanguages: (languages) => set({ languages }),
  selectedLanguage: { id: "76", name: "C++", editorValue: "cpp" },
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  codeMap: new Map(),
  setCodeMap: ({
    language,
    code,
  }: {
    language: Language["name"];
    code: string;
  }) => {
    set((state) => {
      state.codeMap.set(language, code);
      return { ...state };
    });
  },
}));
