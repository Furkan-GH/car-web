import { create } from "zustand";

type CurrentTabStore = {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  toggle: () => void;
  id: string|null;
  setId:(id:string)=>void;
};

export const useCurrentTab = create<CurrentTabStore>((set, get) => ({
  isOpen: false,
  onOpen: (id) => {
    if (id) {
      set({ isOpen: true, id:id });
    } else {
      set({ isOpen: true });
    }
  },
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
  setId:(id)=>{set({id:id})},
  id:null
}));
