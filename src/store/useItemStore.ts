import type { Item } from '@/db';
import { create } from 'zustand';

type State = {
  items: Item[];
  setItems: (items: Item[]) => void;
};

export const useItemStore = create<State>((set) => ({
  items: [],
  setItems: (items: Item[]) => set({ items })
}));
