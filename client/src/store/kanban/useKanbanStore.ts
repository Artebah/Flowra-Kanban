import { create } from "zustand";
import type { IKanbanStore } from "./types";
import { createColumnSlice } from "./slices/columnSlice";
import { createTaskSlice } from "./slices/taskSlice";
import { createUISlice } from "./slices/uiSlice";

export const useKanbanStore = create<IKanbanStore>()((...storeArgs) => ({
  ...createColumnSlice(...storeArgs),
  ...createTaskSlice(...storeArgs),
  ...createUISlice(...storeArgs),
}));
