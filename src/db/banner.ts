import { BANNER_STORE } from '.';

export interface Banner {
  id: number;
  type: 'character' | 'weapon' | 'standard' | 'beginner';
  typeName: string;
  name: string;
  heroImage: string;
  thumbImage: string;
  description: string;
  itemIds: string;
  mainColor?: string;
}

export const addBanner = async (
  db: IDBDatabase,
  banner: Banner
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(BANNER_STORE, 'readwrite');
    const store = transaction.objectStore(BANNER_STORE);
    const request = store.add(banner);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const checkIfBannersExist = async (
  db: IDBDatabase
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(BANNER_STORE, 'readonly');
    const store = transaction.objectStore(BANNER_STORE);
    const request = store.count();

    request.onsuccess = (event) => {
      const count = (event.target as IDBRequest).result;
      resolve(count > 0);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const seedBanners = async (db: IDBDatabase): Promise<void> => {
  if (await checkIfBannersExist(db)) {
    console.log('Banners loaded successfully.');
    return;
  }

  const banners: Omit<Banner, 'id'>[] = [
    {
      type: 'character',
      typeName: 'Character Event',
      name: 'Noelle',
      heroImage: '/assets/images/banners/noelle.webp',
      thumbImage: '/assets/images/thumbs/noelle.webp',
      description: 'A Geo character with healing abilities.',
      itemIds: '1',
      mainColor: '#e79649'
    },
    {
      type: 'weapon',
      typeName: 'Weapon Event',
      name: 'Escoffier',
      heroImage: '/assets/images/banners/escoffier.webp',
      thumbImage: '/assets/images/thumbs/escoffier.webp',
      description: 'A weapon with high attack power.',
      itemIds: '2',
      mainColor: '#46c2d8'
    },
    {
      type: 'standard',
      typeName: 'Standard Banner',
      name: 'Navia',
      heroImage: '/assets/images/banners/navia.webp',
      thumbImage: '/assets/images/thumbs/navia.webp',
      description: 'A standard banner with various items.',
      itemIds: '3',
      mainColor: '#cb8f46'
    },
    {
      type: 'beginner',
      typeName: 'Beginner Banner',
      name: 'Symphonist of Scents',
      heroImage: '/assets/images/banners/symphonist-of-scents.webp',
      thumbImage: '/assets/images/thumbs/symphonist-of-scents.webp',
      description: 'A beginner banner with items for new players.',
      itemIds: '4,5',
      mainColor: '#ef7c1a'
    },
    {
      type: 'character',
      typeName: 'Character Event',
      name: 'Qiqi',
      heroImage: '/assets/images/banners/qiqi.webp',
      thumbImage: '/assets/images/thumbs/qiqi.webp',
      description: 'A Cryo character with powerful abilities.',
      itemIds: '6,7,8,9',
      mainColor: '#757acd'
    }
  ];

  const transaction = db.transaction(BANNER_STORE, 'readwrite');
  const store = transaction.objectStore(BANNER_STORE);
  const promises = banners.map((banner) => {
    return new Promise<void>((resolve, reject) => {
      const request = store.add(banner);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  });
  try {
    await Promise.all(promises);
    console.log('Banners loaded successfully.');
  } catch (error) {
    console.error('Error loading banners:', error);
  }
};
