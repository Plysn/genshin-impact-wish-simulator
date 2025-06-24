import { getDbInstance, HISTORY_STORE } from '.';

export interface History {
  id: number;
  type: 'character' | 'weapon' | 'standard' | 'beginner' | 'normal';
  date: string;
  name: string;
  pity: number;
  bannerType: string;
  rarity: number;
}

export const add = async (history: Omit<History, 'id'>): Promise<void> => {
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

export const deleteBy = async (
  bannerType?: string,
  star?: number
): Promise<void> => {
  const canDelete = (history: History): boolean => {
    if (!bannerType && !star) return true;

    if (bannerType && star) {
      return history.bannerType === bannerType && history.rarity === star;
    }

    if (bannerType) {
      return history.bannerType === bannerType;
    }

    if (star) {
      return history.rarity === star;
    }

    return false;
  };

  const db = await getDbInstance();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HISTORY_STORE, 'readwrite');
    const store = transaction.objectStore(HISTORY_STORE);
    const request = store.openCursor();

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;

      if (cursor) {
        const history = cursor.value as History;

        if (canDelete(history)) {
          cursor.delete();
        }

        cursor.continue();
      } else {
        resolve();
      }
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const getAll = async (): Promise<History[]> => {
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
