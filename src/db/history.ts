import { getDbInstance, HISTORY_STORE } from '.';

export interface History {
  id: number;
  type: 'character' | 'weapon' | 'standard' | 'beginner';
  date: string;
  name: string;
  pity: number;
  bannerType: string;
}

export const addHistory = async (
  history: Omit<History, 'id'>
): Promise<void> => {
  const db = await getDbInstance();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HISTORY_STORE, 'readwrite');
    const store = transaction.objectStore(HISTORY_STORE);
    const request = store.add(history);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const deleteAllHistory = async (): Promise<void> => {
  const db = await getDbInstance();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HISTORY_STORE, 'readwrite');
    const store = transaction.objectStore(HISTORY_STORE);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const getAllHistory = async (): Promise<History[]> => {
  const db = await getDbInstance();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HISTORY_STORE, 'readonly');
    const store = transaction.objectStore(HISTORY_STORE);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as History[]);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};
