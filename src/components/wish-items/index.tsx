import { type Item } from '@/db';
import './wish.css';
import { Single } from './Single';
import { Ten } from './Ten';
import { useEffect, useRef } from 'react';

interface Props {
  items: Item[];
  onClose: () => void;
}

export function WishItems({ items, onClose }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const brightTimeoutId = setTimeout(() => {
      heroRef.current?.classList.add('bright');
    }, 500);

    const appearTimeoutId = setTimeout(() => {
      heroRef.current?.classList.add('appear');
    }, 1000);

    return () => {
      clearTimeout(brightTimeoutId);
      clearTimeout(appearTimeoutId);
    };
  }, []);

  if (!items || items.length === 0) {
    return <></>;
  }

  return (
    <div
      className="wish-screen fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center gap-4 z-30 bg-[url('/assets/images/backgrounds/wish-splash.webp')] bg-cover bg-center"
      ref={heroRef}
    >
      <div className="close-wish" onClick={onClose}>
        <i className="gi gi-close"></i>
      </div>

      {items.length > 1 ? (
        <Ten items={items}></Ten>
      ) : (
        <Single item={items[0]} />
      )}
    </div>
  );
}
