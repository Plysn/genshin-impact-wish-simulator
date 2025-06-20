import { getDbInstance, ITEM_STORE } from '.';

export interface Item {
  id: number;
  name: string;
  description: string;
  rarity: number;
  pity: number;
  image: string;
  type: 'character' | 'weapon' | 'standard' | 'beginner' | 'normal';
}

export const checkIfItemsExist = async (db: IDBDatabase): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ITEM_STORE, 'readonly');
    const store = transaction.objectStore(ITEM_STORE);
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

export const getAllItems = async (): Promise<Item[]> => {
  const db = await getDbInstance();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ITEM_STORE, 'readonly');
    const store = transaction.objectStore(ITEM_STORE);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as Item[]);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

export const seedItems = async (db: IDBDatabase): Promise<void> => {
  if (await checkIfItemsExist(db)) {
    console.log('Items loaded successfully.');
    return;
  }

  const items: Omit<Item, 'id'>[] = [
    {
      name: 'Noelle',
      description: 'A Geo character with healing abilities.',
      rarity: 3,
      pity: 0,
      image: '/assets/images/wish-items/black-tassel.webp',
      type: 'character'
    },
    {
      name: 'Escoffier',
      description: 'A powerful Pyro weapon.',
      rarity: 5,
      pity: 0,
      image: '/assets/images/wish-items/bloodtained-greatsword.webp',
      type: 'weapon'
    },
    {
      name: 'Navia',
      description: 'A Hydro character with support skills.',
      rarity: 3,
      pity: 0,
      image: '/assets/images/wish-items/cool-steel.webp',
      type: 'character'
    },
    {
      name: 'Symphonist of Scents',
      description: 'A Dendro weapon with unique abilities.',
      rarity: 5,
      pity: 0,
      image: '/assets/images/wish-items/raven-bow.webp',
      type: 'weapon'
    },
    {
      name: 'Black Tassel',
      description: 'A polearm weapon with a focus on crit damage.',
      rarity: 3,
      pity: 0,
      image: '/assets/images/wish-items/slingshot.webp',
      type: 'weapon'
    },
    {
      name: 'Qiqi',
      description: 'A Cryo character with healing powers.',
      rarity: 5,
      pity: 0,
      image: '/assets/images/wish-items/black-tassel.webp',
      type: 'character'
    },
    {
      name: 'Amber',
      description: 'A Pyro character skilled with a bow.',
      rarity: 4,
      pity: 0,
      image: '/assets/images/wish-items/bloodtained-greatsword.webp',
      type: 'character'
    },
    {
      name: 'Favonius Sword',
      description: 'A sword that channels the power of the wind.',
      rarity: 4,
      pity: 0,
      image: '/assets/images/wish-items/raven-bow.webp',
      type: 'weapon'
    },
    {
      name: 'Barbara',
      description: 'A Hydro character who excels at healing.',
      rarity: 4,
      pity: 0,
      image: '/assets/images/wish-items/slingshot.webp',
      type: 'character'
    },
    {
      name: 'Sacrificial Bow',
      description: 'A bow that grants a chance to end skill cooldowns.',
      rarity: 4,
      pity: 0,
      image: '/assets/images/wish-items/raven-bow.webp',
      type: 'weapon'
    }
  ];

  const transaction = db.transaction(ITEM_STORE, 'readwrite');
  const store = transaction.objectStore(ITEM_STORE);
  const promises = items.map((item) => {
    return new Promise<void>((resolve, reject) => {
      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  });

  try {
    await Promise.all(promises);
    console.log('Items seeded successfully.');
  } catch (error) {
    console.error('Error seeding items:', error);
  }
};
