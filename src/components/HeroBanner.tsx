import { useBannerStore } from '@store/useBannerStore';
import { AnimatePresence, motion } from 'framer-motion';

export default function HeroBanner() {
  const { banners, selectedIndex } = useBannerStore();
  const banner = banners[selectedIndex];

  return (
    <div className="relative w-full max-w-4xl h-96 overflow-hidden rounded-2xl shadow-xl mx-auto mt-24">
      <AnimatePresence mode="wait">
        <motion.img
          key={banner.id}
          src={banner.heroImage}
          alt={banner.name}
          initial={{ x: 100, opacity: 0, scale: 1.05 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 object-cover w-full h-full"
        />
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 text-white w-full">
        <h2 className="text-xl font-bold">{banner.name}</h2>
        <p className="text-sm">{banner.description}</p>
      </div>
    </div>
  );
}
