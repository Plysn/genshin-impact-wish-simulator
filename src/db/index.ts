import { hydrateBannerFromDB, hydrateItemsFromDB } from '@/hydrate';
import { seedBanners } from './banner';
import { seedItems } from './item';

const DATABASE_NAME = 'genshin-impact-history-simiulator';
const DATABASE_VERSION = 1;

export const ITEM_STORE = 'item';
export const BANNER_STORE = 'banner';
export const HISTORY_STORE = 'history';

export * from './banner';
export * from './history';
export * from './item';

let dbInstance: IDBDatabase | null = null;

export const getDbInstance = async (): Promise<IDBDatabase> => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await initDb();
  return dbInstance;
};

export const initDb = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(ITEM_STORE)) {
        db.createObjectStore(ITEM_STORE, {
          keyPath: 'id',
          autoIncrement: true
        });
      }

      if (!db.objectStoreNames.contains(BANNER_STORE)) {
        db.createObjectStore(BANNER_STORE, {
          keyPath: 'id',
          autoIncrement: true
        });
      }

      if (!db.objectStoreNames.contains(HISTORY_STORE)) {
        db.createObjectStore(HISTORY_STORE, {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const initializeData = async (): Promise<void> => {
  const db = await getDbInstance();

  // Seed items
  await seedItems(db);
  await seedBanners(db);

  // Seed banners
  await hydrateItemsFromDB(db);
  await hydrateBannerFromDB(db);
};
