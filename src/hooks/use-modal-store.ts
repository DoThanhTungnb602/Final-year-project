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
  inviteCode?: string;
  inviteLink?: string;
  classId?: string;
}

interface ModalState {
  type?: ModalType;
  data?: ModalData;
  isOpen: boolean;
  onOpen: ({ type, data }: { type: ModalType; data?: ModalData }) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  type: undefined,
  data: undefined,
  isOpen: false,
  onOpen: ({ type, data }) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: undefined, isOpen: false }),
}));
