import { useBannerStore } from '@store/useBannerStore';
import { AnimatePresence, motion } from 'framer-motion';
import './homePage.css';

export default function HeroBanner() {
  const { banners, selectedIndex, direction, selectBanner } = useBannerStore();
  const banner = banners[selectedIndex];

  if (!banners.length) {
    return (
      <div className="hero-banner">
        <div className="img relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl mx-auto my-44">
          <p className="text-center text-gray-500">No banners available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-banner">
      <div className="img relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl mx-auto my-32">
        <AnimatePresence mode="wait">
          <>
            <motion.img
              key={`img-${banner.id}`}
              src={banner.heroImage}
              alt={banner.name}
              initial={{ x: 100 * direction, opacity: 0, scale: 1.05 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100 * direction, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <motion.div
              key={`content-${banner.id}`}
              className="frame-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <p className="top" style={{ backgroundColor: banner.mainColor }}>
                {banner.typeName}
              </p>
              <h2
                className="text-xl font-bold heading"
                style={{ color: banner.mainColor }}
              >
                {banner.name}
              </h2>
              <div className="description ">
                {banner.type != 'beginner' && (
                  <p className="set">Tỷ lệ cầu nguyện tăng!</p>
                )}
                <span
                  className="des"
                  style={{ backgroundColor: banner.mainColor }}
                >
                  <i className="gi gi-primo-star"></i>
                  <p>
                    Mỗi khi cầu nguyện 10 lần chắc chắn sẽ nhận tối thiểu 1 vật
                    phẩm từ 4 sao trở lên.
                  </p>
                </span>
                <p className="text-sm note">
                  {banner.description ||
                    'Chỉ có thể nhận được các nhân vật 5 sao dành riêng cho sự kiện cầu nguyện đã được chỉ định trong khoảng thời gian cụ thể.'}
                </p>
              </div>
              {banner.items.length === 1 && (
                <div
                  className={`character ${banner.name === 'Noelle' ? 'noelle' : ''}`}
                >
                  <span className="char-name">
                    <p className="name">{banner.items[0].name}</p>
                    <p className="up">UP!</p>
                  </span>
                  <p className="char-title">{banner.items[0].description}</p>
                </div>
              )}
              {banner.items.length === 2 && (
                <>
                  <div className="featured">
                    <span className="weapon-name">
                      <p className="name">{banner.items[0].name}</p>
                      <p className="up">UP!</p>
                    </span>
                  </div>
                  <div className="rateup">
                    <span className="weapon-name">
                      <p className="name">{banner.items[1].name}</p>
                      <p className="up">UP!</p>
                    </span>
                  </div>
                </>
              )}
              {banner.items.length === 4 && (
                <>
                  <div className="group group-1">
                    <span className="char-name">
                      <p className="name">{banner.items[0].name}</p>
                    </span>
                    <p className="char-title">{banner.items[0].description}</p>
                  </div>
                  <div className="group group-2">
                    <span className="char-name">
                      <p className="name">{banner.items[1].name}</p>
                    </span>
                    <p className="char-title">{banner.items[0].description}</p>
                  </div>
                  <div className="group group-3">
                    <span className="char-name">
                      <p className="name">{banner.items[2].name}</p>
                    </span>
                    <p className="char-title">{banner.items[0].description}</p>
                  </div>
                  <div className="group group-4">
                    <span className="char-name">
                      <p className="name">{banner.items[3].name}</p>
                    </span>
                    <p className="char-title">{banner.items[0].description}</p>
                  </div>
                </>
              )}
            </motion.div>
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
