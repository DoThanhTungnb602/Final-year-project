import { create } from "zustand";

import { SubmissionResponse } from "~/lib/types";

interface SubmissionState {
  submission: SubmissionResponse | null;
  setSubmission: (submission: SubmissionResponse | null) => void;
}

export const useSubmissionStore = create<SubmissionState>()((set) => ({
  submission: null,
  setSubmission: (submission) => set({ submission }),
}));
