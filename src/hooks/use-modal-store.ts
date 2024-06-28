import { create } from "zustand";

import { ClassroomById } from "~/server/api/client";

export type ModalType =
  | "invite"
  | "deleteClass"
  | "joinClass"
  | "leaveClass"
  | "saveChanges";

interface ModalData {
  classroom?: ClassroomById;
  classId?: string;
}

interface ModalState {
  type: ModalType | null;
  data: ModalData | null;
  isOpen: boolean;
  onOpen: ({ type, data }: { type: ModalType; data?: ModalData }) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: ({ type, data = null }) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
