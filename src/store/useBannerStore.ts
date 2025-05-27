import { create } from 'zustand';

type Banner = {
  id: number;
  name: string;
  heroImage: string;
  thumbImage: string;
  description: string;
};

type State = {
  banners: Banner[];
  selectedIndex: number;
  // 1 when moving left, -1 when moving right
  direction: number;
  selectBanner: (index: number) => void;
};

const BANNER_KEYS = [
  'noelle',
  'escoffier',
  'navia',
  'symphonist-of-scents',
  'qiqi'
];

export const useBannerStore = create<State>((set) => ({
  selectedIndex: 0,
  direction: 1,
  banners: BANNER_KEYS.map(
    (key, index) =>
      ({
        id: index,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        heroImage: `/assets/images/banners/${key}.webp`,
        thumbImage: `/assets/images/thumbs/${key}.webp`,
        description: `Description for ${key.charAt(0).toUpperCase() + key.slice(1)}`
      }) as Banner
  ),
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
