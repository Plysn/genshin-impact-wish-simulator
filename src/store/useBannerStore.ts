import { type Banner as DbBanner, type Item } from '@/db';
import { create } from 'zustand';
import { useItemStore } from './useItemStore';

export interface Banner extends DbBanner {
  items: Item[];
}

type State = {
  banners: Banner[];
  selectedIndex: number;
  setBanners: (banners: DbBanner[]) => void;
  // 1 when moving left, -1 when moving right
  direction: number;
  selectBanner: (index: number) => void;
};

export const useBannerStore = create<State>((set) => ({
  selectedIndex: 0,
  direction: 1,
  banners: [],
  setBanners: (banners: DbBanner[]) => {
    const items = useItemStore.getState().items;

    set({ banners: banners.map((banner) => mapBannerItems(banner, items)) });
  },
  selectBanner: (index) => {
    set((state) => ({
      direction: index > state.selectedIndex ? 1 : -1
    }));
    // Delay the state update to allow the animation to play
    setTimeout(() => {
      set({ selectedIndex: index });
    }, 10);
  }
}));

const mapBannerItems = (banner: DbBanner, items: Item[]): Banner => {
  const itemIds = banner.itemIds.split(',').map(Number);
  const bannerItems = items.filter((item) => itemIds.includes(item.id));

  return {
    ...banner,
    items: bannerItems
  };
};
