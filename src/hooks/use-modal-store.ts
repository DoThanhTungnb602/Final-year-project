import { create } from "zustand";

import { Class } from "@prisma/client";

export type ModalType = "invite";

interface ModalData {
  classroom?: Class;
}

interface ModalState {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: ({ type, data }: { type: ModalType; data?: ModalData }) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: ({ type, data = {} }) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
