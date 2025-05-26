import { useBannerStore } from '@store/useBannerStore';
import { motion } from 'framer-motion';
import './bannerCarousel.css';

export default function BannerCarousel() {
  const { banners, selectedIndex, selectBanner } = useBannerStore();

  return (
    <div>
      <div className="w-full flex gap-12 items-center">
      <div className="w-1/3 flex justify-center items-center">
        <img
          src="/assets/images/logo/brand.png"
          alt="Logo"
        />
        Cầu Nguyện
        <span className="gi gi-help"></span>
      </div>
        {banners.map((banner, index) => (
          <motion.img
            key={banner.id}
            src={banner.thumbImage}
            alt={banner.name}
            onClick={() => selectBanner(index)}
            className={`object-cover rounded-lg w-32 h-12 border-2 ${
              index === selectedIndex
                ? 'border-yellow-400'
                : 'border-transparent'
            } transition-all`}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </div>
  );
}
