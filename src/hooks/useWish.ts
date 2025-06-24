import HistoryContext from '@/components/history/HistoryContext';
import { useBalanceStore } from '@/store/useBalanceStore';
import { useItemStore } from '@/store/useItemStore';
import { useContext } from 'react';

const WISH_ONCE_COST = 1;
const WISH_TEN_COST = 10;

export const useWish = () => {
  const { balance, deductBalance } = useBalanceStore();
  const { addHistory } = useContext(HistoryContext);

  const wishOnce = async (
    bannerType: 'character' | 'weapon' | 'standard' | 'beginner' | 'normal'
  ) => {
    if (balance < WISH_ONCE_COST) {
      throw new Error('Not enough balance for a single wish');
    }

    const items = useItemStore.getState().items;

    const filteredItems = items.filter((item) => item.type === bannerType);

    const randomIndex = Math.floor(Math.random() * filteredItems.length);

    const wishedItem = filteredItems[randomIndex];

    await addHistory(wishedItem, bannerType);

    deductBalance(WISH_ONCE_COST);

    return filteredItems[randomIndex];
  };

  const wishTen = async (
    bannerType: 'character' | 'weapon' | 'standard' | 'beginner' | 'normal'
  ) => {
    const items = useItemStore.getState().items;

    const filteredItems = items.filter((item) => item.type === bannerType);

    const randomItems = [];

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * filteredItems.length);
      randomItems.push(filteredItems[randomIndex]);
    }

    const sortedItems = randomItems.sort((a, b) => b.rarity - a.rarity);

    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];

      await addHistory(item, bannerType);
    }

    deductBalance(WISH_TEN_COST);

    return sortedItems;
  };

  return {
    wishOnce,
    wishTen,
    canAffordOnce: () => balance >= WISH_ONCE_COST,
    canAffordTen: () => balance >= WISH_TEN_COST
  };
};
