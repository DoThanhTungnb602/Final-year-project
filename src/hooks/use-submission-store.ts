import { create } from "zustand";

import { RunSubmissionResult } from "~/server/api/client";
import { SubmitSubmissionResult } from "~/server/api/client";

interface RunResultState {
  result: RunSubmissionResult | null;
  setResult: (result: RunSubmissionResult) => void;
}

interface SubmitResultState {
  submitResult: SubmitSubmissionResult | null | object;
  setSubmitResult: (submitResult: SubmitSubmissionResult | object) => void;
}

export const useRunResultStore = create<RunResultState>()((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));

export const useSubmitResultStore = create<SubmitResultState>()((set) => ({
  submitResult: null,
  setSubmitResult: (submitResult) => set({ submitResult }),
}));

interface SubmissionPanelState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSubmissionPanelStore = create<SubmissionPanelState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
