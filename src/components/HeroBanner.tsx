import { useBannerStore } from '@store/useBannerStore';
import { AnimatePresence, motion } from 'framer-motion';
import './homePage.css';

export default function HeroBanner() {
  const { banners, selectedIndex, direction, selectBanner } = useBannerStore();
  const banner = banners[selectedIndex];

  if (!banners.length) {
    return (
      <div className="hero-banner">
        <div className="relative w-full max-w-4xl h-96 overflow-hidden rounded-2xl shadow-xl mx-auto my-44">
          <p className="text-center text-gray-500">No banners available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-banner">
      <div className="relative w-full max-w-4xl h-96 overflow-hidden rounded-2xl shadow-xl mx-auto my-44">
        <AnimatePresence mode="wait">
          <>
            <motion.img
              key={banner.id}
              src={banner.heroImage}
              alt={banner.name}
              initial={{ x: 100 * direction, opacity: 0, scale: 1.05 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100 * direction, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 p-4 text-white w-full">
              <h2 className="text-xl font-bold">{banner.name}</h2>
              <p className="text-sm">{banner.description}</p>
            </div>
          </>
        </AnimatePresence>
      </div>
      <div className="navigate z-20">
        <button className="left">
          {selectedIndex > 0 && (
            <i
              className="gi gi-arrow-left"
              onClick={() =>
                selectBanner(
                  (selectedIndex - 1 + banners.length) % banners.length
                )
              }
            ></i>
          )}
        </button>
        <button className="right">
          {selectedIndex < banners.length - 1 && (
            <i
              className="gi gi-arrow-right"
              onClick={() => selectBanner((selectedIndex + 1) % banners.length)}
            ></i>
          )}
        </button>
      </div>
    </div>
  );
}
