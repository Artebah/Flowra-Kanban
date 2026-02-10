import type { StateCreator } from "zustand";
import type { IKanbanStore, IUISlice } from "../types";

export const createUISlice: StateCreator<IKanbanStore, [], [], IUISlice> = (
  set
) => ({
  modalDetailsData: {
    isOpen: false,
    columnId: null,
  },
  updateModalDetailsData: (data) => set({ modalDetailsData: data }),
});
