import { useBannerStore } from '@store/useBannerStore';
import { motion } from 'framer-motion';
import './homePage.css';

export default function BannerCarousel() {
  const { banners, selectedIndex, selectBanner } = useBannerStore();

  return (
    <div className="w-full flex items-center justify-center gap-50">
      <div className="wish-title flex justify-center items-center">
        <img src="/assets/images/logo/brand.png" alt="Logo" />
        <span className="title">Cầu Nguyện</span>
        <button className="btn-help">
          <span className="gi gi-help"></span>
        </button>
        <button className="gi gi-chat"></button>
        <button className="gi gi-fullscreen"></button>
      </div>
      <div className="flex gap-12">
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
      <div className="budget">
        <div className="fates">
          <button className="primogem button-fate">
            <img src="/assets/images/icon/primogem.webp" alt="" />
            <span className="mr-3">6400</span>
            <span className="svelte">
              <i className="gi gi-plus"></i>
            </span>
          </button>
          <button className="intertwined button-fate">
            <img src="/assets/images/icon/intertwined-fate.webp" alt="" />
            <span>0</span>
          </button>
        </div>
        <div className="close">
          <i className="gi gi-close"></i>
        </div>
      </div>
    </div>
  );
}
