import { useWish } from '@/hooks/useWish';
import { useBannerStore } from '@/store/useBannerStore';
import './homePage.css';
import type { Item } from '@/db';

interface Props {
  setIsHistoryOpen: (open: boolean) => void;
  doWishItems: (item: Item[]) => void;
}

export default function Footer({ setIsHistoryOpen, doWishItems }: Props) {
  const { wishOnce, wishTen, canAffordOnce, canAffordTen } = useWish();
  const { banners, selectedIndex } = useBannerStore();

  const handleSingleWish = async () => {
    const item = await wishOnce(banners[selectedIndex].type);

    doWishItems([item]);
  };

  const handleTenWishes = async () => {
    const items = await wishTen(banners[selectedIndex].type);

    doWishItems(items);
  };

  return (
    <div className="footer relative z-10 w-full flex gap-12 items-center">
      <button className="svelte-btn" onClick={() => setIsHistoryOpen(true)}>
        Lịch sử
      </button>
      <div className="right">
        <button
          className={`wish-btn single ${!canAffordOnce() ? 'disabled' : ''}`}
          onClick={handleSingleWish}
          disabled={!canAffordOnce()}
        >
          <div className="top">Cầu Nguyện ×1</div>
          <div className="bottom">
            <img src="/assets/images/icon/intertwined-fate.webp" alt="" />
            <span>x 1</span>
          </div>
        </button>
        <button
          className={`wish-btn ten ${!canAffordTen() ? 'disabled' : ''}`}
          onClick={handleTenWishes}
          disabled={!canAffordTen()}
        >
          <div className="top">Cầu Nguyện ×10</div>
          <div className="bottom">
            <img src="/assets/images/icon/intertwined-fate.webp" alt="" />
            <span>x 10</span>
          </div>
        </button>
      </div>
    </div>
  );
}
