import { create } from "zustand";

type OverlayStore = {
  isAnyOverlayOpen: boolean;
  open: () => void;
  closeAll: () => void;
};

export const useOverlayStore = create<OverlayStore>((set) => ({
  isAnyOverlayOpen: false,
  open: () => set({ isAnyOverlayOpen: true }),
  closeAll: () => set({ isAnyOverlayOpen: false }),
}));
