import { create } from "zustand";

export type RegisterModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
