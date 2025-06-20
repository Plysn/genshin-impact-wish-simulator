import type { Item } from '@/db';
import { useEffect, useRef, useState } from 'react';

interface Props {
  item: Item;
}

export function Single({ item }: Props) {
  const itemInfoRef = useRef<HTMLDivElement>(null);
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    const appearTimeoutId = setTimeout(() => {
      itemInfoRef.current?.classList.add('appear');
    }, 1150);

    return () => clearTimeout(appearTimeoutId);
  }, []);

  useEffect(() => {
    const itemTimeout = setTimeout(() => setShowItem(true), 650);

    return () => clearTimeout(itemTimeout);
  }, []);

  return (
    <div className="single w-full px-16 pt-40">
      <div className="hero flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="hero-bg">
          <img
            src="/assets/images/backgrounds/sword.webp"
            width={840}
            height={840}
            alt="item-hero-bg"
            className="background max-w-none"
          ></img>
        </div>
        <div className={`hero-item${showItem ? ' appear' : ''}`}>
          <img
            src={item.image}
            alt={item.name}
            className="item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div
        className="wish-item-info px-64 flex w-full justify-between"
        ref={itemInfoRef}
      >
        <div className="part left flex items-center gap-4">
          <div className="icon">
            <span className="block w-24 h-24 bg-[url('/assets/images/icon/wish-item-icon.svg')] bg-cover bg-center"></span>
          </div>
          <div className="name">
            <p className="text">{item.name}</p>
            {[...Array(item.rarity)].map((_, i) => (
              <i key={i} className="gi gi-star"></i>
            ))}
          </div>
        </div>
        <div className="part right">
          <div className="bonus flex items-center py-1 px-6">
            <div className="icon">
              <span className="block w-16 h-16 bg-[url('/assets/images/icon/masterless-stardust.webp')] bg-cover bg-center"></span>
            </div>
            <div className="text block -ml-6 pl-6">
              <div className="main">Tinh Trần Vô Chủ</div>
              <div className="extra">x15</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
