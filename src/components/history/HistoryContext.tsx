import {
  add as addToDb,
  deleteBy,
  getAll,
  type History,
  type Item
} from '@/db';
import React, { createContext, useEffect, useState } from 'react';

interface HistoryContextType {
  historyList: History[];
  addHistory: (item: Item, bannerType: string) => Promise<boolean>;
  deleteHistoryBy: (bannerType?: string, star?: number) => Promise<boolean>;
}

const HistoryContext = createContext<HistoryContextType>({
  historyList: [],
  addHistory: async () => false,
  deleteHistoryBy: async () => false
});

interface Props {
  children: React.ReactNode;
}

export const HistoryProvider = ({ children }: Props) => {
  const [historyList, setHistoryList] = useState<History[]>([]);

  const fetchHistory = async () => {
    try {
      const history = await getAll();

      setHistoryList(history);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const addHistory = async (item: Item, bannerType: string) => {
    await addToDb({
      type: item.type,
      date: new Date().toISOString(),
      name: item.name,
      pity: item.pity,
      bannerType,
      rarity: item.rarity
    });

    await fetchHistory();
    return Promise.resolve(true);
  };

  const deleteHistoryBy = async (bannerType?: string, star?: number) => {
    await deleteBy(bannerType, star);
    await fetchHistory();
    return Promise.resolve(true);
  };

  return (
    <HistoryContext.Provider
      value={{ historyList, addHistory, deleteHistoryBy }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
