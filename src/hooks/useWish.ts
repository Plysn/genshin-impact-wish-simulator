import { useBalanceStore } from '@/store/useBalanceStore';
import { useItemStore } from '@/store/useItemStore';
import { useHistory } from './useHistory';

const WISH_ONCE_COST = 1;
const WISH_TEN_COST = 10;

export const useWish = () => {
  const { balance, deductBalance } = useBalanceStore();
  const { addToHistory } = useHistory();

  const wishOnce = (
    bannerType: 'character' | 'weapon' | 'standard' | 'beginner'
  ) => {
    if (balance < WISH_ONCE_COST) {
      throw new Error('Not enough balance for a single wish');
    }

    const items = useItemStore.getState().items;

    const filteredItems = items.filter((item) => item.type === bannerType);

    const randomIndex = Math.floor(Math.random() * filteredItems.length);

    const wishedItem = filteredItems[randomIndex];

    addToHistory(wishedItem, bannerType);

    deductBalance(WISH_ONCE_COST);

    return filteredItems[randomIndex];
  };

  const wishTen = (
    bannerType: 'character' | 'weapon' | 'standard' | 'beginner'
  ) => {
    const items = useItemStore.getState().items;

    const filteredItems = items.filter((item) => item.type === bannerType);

    const randomItems = [];

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * filteredItems.length);
      randomItems.push(filteredItems[randomIndex]);
    }

    randomItems.forEach((item) => {
      addToHistory(item, bannerType);
    });

    deductBalance(WISH_TEN_COST);

    return randomItems;
  };

  return {
    wishOnce,
    wishTen,
    canAffordOnce: () => balance >= WISH_ONCE_COST,
    canAffordTen: () => balance >= WISH_TEN_COST
  };
};
