import { create } from "zustand";

export type RentModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
