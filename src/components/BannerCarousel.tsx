import { useBannerStore } from '../store/useBannerStore';
import { motion } from 'framer-motion';

export default function BannerCarousel() {
  const { banners, selectedIndex, selectBanner } = useBannerStore();

  return (
    <div className="w-full flex gap-12 justify-center items-center">
      {banners.map((banner, index) => (
        <motion.img
          key={banner.id}
          src={banner.thumbImage}
          alt={banner.name}
          onClick={() => selectBanner(index)}
          className={`w-16 h-16 object-cover rounded-lg w-32 h-6 border-2 ${
            index === selectedIndex ? 'border-yellow-400' : 'border-transparent'
          } cursor-pointer transition-all`}
          whileHover={{ scale: 1.1 }}
        />
      ))}
    </div>
  );
}
