import type { Item } from '@/db';
import { useEffect, useRef, useState } from 'react';

interface Props {
  items: Item[];
}

export function Ten({ items }: Props) {
  const itemInfoRef = useRef<HTMLDivElement>(null);
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    const appearTimeoutId = setTimeout(() => {
      itemInfoRef.current?.classList.add('appear');
    }, 1150);

    return () => clearTimeout(appearTimeoutId);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setAppear(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <svg
        viewBox="0 0 151.000000 656.000000"
        height="0"
        width="0"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <clipPath
          id="wishframe"
          transform="scale(0.00066225165562914 0.00015455950540958)"
          clipPathUnits="objectBoundingBox"
        >
          <path
            d="M734 6419 c-25 -29 -100 -76 -199 -127 -125 -64 -165 -117 -165 -217
			0 -22 -3 -50 -6 -63 -9 -33 -83 -72 -155 -82 -68 -10 -79 -19 -79 -67 0 -24
			-7 -37 -32 -54 -18 -12 -43 -34 -55 -48 l-22 -26 -1 -2502 c0 -1542 4 -2503 9
			-2503 5 0 13 -9 16 -20 4 -11 23 -28 43 -38 32 -15 37 -22 40 -57 4 -49 23
			-65 76 -65 47 0 113 -28 140 -58 12 -14 21 -45 26 -90 13 -117 54 -164 215
			-250 55 -28 114 -66 132 -82 18 -17 35 -30 39 -30 4 0 23 15 44 34 21 19 80
			56 131 82 153 79 197 131 210 252 4 39 13 70 25 84 27 30 93 58 140 58 53 0
			72 16 76 65 3 35 8 42 40 57 20 10 39 27 43 38 3 11 11 20 16 20 5 0 9 961 9
			2503 l-1 2502 -22 26 c-12 14 -37 36 -54 48 -26 17 -33 30 -33 54 0 48 -11 57
			-79 67 -72 10 -146 49 -155 82 -3 13 -6 41 -6 63 0 100 -40 153 -165 217 -106
			54 -153 84 -191 119 l-30 29 -20 -21z"
          ></path>
        </clipPath>
      </svg>
      <div className="ten w-full relative">
        <div className="items-container w-full items-center">
          {items.slice(0, 10).map((item, index) => (
            <div
              key={index}
              className={`item-box${appear ? ' appear' : ''} ${item.rarity > 3 ? 'rare' : ''}`}
            >
              <div className="item">
                <div className="zoomist-container item-body">
                  <div className="zoomist-wrapper item-content">
                    <div className="zoomist-image">
                      <img src={item.image} alt={item.name}></img>
                    </div>
                    <div className="info">
                      <div className="icon">
                        <span className="block h-24 w-24 bg-[url('/assets/images/icon/wish-item-icon.svg')] bg-cover bg-center"></span>
                      </div>
                      <div className="star">
                        {[...Array(item.rarity)].map((_, i) => (
                          <i key={i} className="gi gi-star"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
