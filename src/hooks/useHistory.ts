import {
  addHistory,
  deleteAllHistory,
  getAllHistory,
  deleteHistoryByBannerType,
  type History,
  type Item
} from '@/db';
import { useEffect, useState } from 'react';

export const useHistory = () => {
  const [historyList, setHistoryList] = useState<History[]>([]);
  const [needUpdate, setNeedUpdate] = useState<null | number>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getAllHistory();
        setHistoryList(history);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, [needUpdate]);

  const refreshHistory = () => {
    setNeedUpdate(new Date().getTime());
  };

  const addToHistory = (
    item: Item,
    bannerType: 'character' | 'weapon' | 'standard' | 'beginner' | 'normal'
  ) => {
    addHistory({
      type: item.type,
      date: new Date().toISOString(),
      name: item.name,
      pity: item.pity,
      bannerType,
      rarity: item.rarity
    });

    refreshHistory();
  };

  const clearHistory = () => {
    deleteAllHistory();

    refreshHistory();
  };

  const deleteHistoryByBanner = (bannerType: string) => {
    deleteHistoryByBannerType(bannerType);

    refreshHistory();
  };

  return {
    historyList,
    addToHistory,
    clearHistory,
    deleteHistoryByBanner
  };
};
