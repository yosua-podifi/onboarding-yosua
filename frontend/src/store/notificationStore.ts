import { create } from "zustand";

interface NotificationStore {
  type: string;
  setType: (type: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  type: "",
  setType: (type: string) => set({ type }),
}));
