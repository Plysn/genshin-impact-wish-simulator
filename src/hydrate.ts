// hydrate.ts
import { BANNER_STORE, ITEM_STORE, type Banner, type Item } from './db';
import { useBannerStore } from './store/useBannerStore';
import { useItemStore } from './store/useItemStore';

const getAll = (store: IDBObjectStore) =>
  new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

export const hydrateItemsFromDB = async (db: IDBDatabase) => {
  const tx = db.transaction([ITEM_STORE]);
  const itemStore = tx.objectStore(ITEM_STORE);
  const { setItems } = useItemStore.getState();
  const items = (await getAll(itemStore)) as Item[];
  setItems(items);
};

export const hydrateBannerFromDB = async (db: IDBDatabase) => {
  const tx = db.transaction([BANNER_STORE]);
  const bannerStore = tx.objectStore(BANNER_STORE);
  const { setBanners } = useBannerStore.getState();
  const banners = (await getAll(bannerStore)) as Banner[];
  setBanners(banners);
};
