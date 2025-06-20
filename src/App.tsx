import BannerCarousel from '@components/BannerCarousel';
import Footer from '@components/Footer';
import HeroBanner from '@components/HeroBanner';
import History from '@components/history/History';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { initializeData, type Item } from './db';
import { WishItems } from './components/wish-items';

function App() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [wishItems, setWishItems] = useState<Item[]>([]);
  const [animationTimeoutId, setAnimationTimeoutId] =
    useState<NodeJS.Timeout | null>(null);
  const [animationLoading, setAnimationLoading] = useState(false);

  const wishType = useMemo(() => {
    return wishItems.length === 1
      ? 'single'
      : wishItems.length === 10
        ? 'ten'
        : 'none';
  }, [wishItems]);

  useEffect(() => {
    const init = async () => {
      await initializeData();
    };

    init();
  }, []);

  return (
    <div className="main relative w-full h-screen overflow-hidden">
      <div className="background absolute inset-0 w-full h-full -z-10 py-6 bg-[url('/assets/images/backgrounds/sky.webp')] bg-cover bg-center"></div>
      <div className="overlay w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-14"></div>
      <div className="main-content relative z-10 mt-8">
        {isHistoryOpen ? (
          <History setIsHistoryOpen={setIsHistoryOpen} />
        ) : (
          <>
            <BannerCarousel />
            {animationLoading && (
              <>
                {wishType === 'single' ? (
                  <>
                    <div className="animation-screen fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center z-40">
                      <button
                        className="skip-button"
                        onClick={() => {
                          setAnimationLoading(false);

                          if (animationTimeoutId) {
                            clearTimeout(animationTimeoutId);
                          }
                        }}
                      >
                        Bỏ qua
                      </button>
                      <video
                        className="min-vh-100 w-100 overflow-hidden"
                        playsInline
                        autoPlay
                        muted
                        loop
                      >
                        <source src="/assets/mp4/single.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {wishType === 'ten' ? (
                  <div className="animation-screen fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center z-40">
                    <button
                      className="skip-button"
                      onClick={() => {
                        setAnimationLoading(false);

                        if (animationTimeoutId) {
                          clearTimeout(animationTimeoutId);
                        }
                      }}
                    >
                      Bỏ qua
                    </button>
                    <video
                      className="min-vh-100 w-100 overflow-hidden"
                      playsInline
                      autoPlay
                      muted
                      loop
                    >
                      <source src="/assets/mp4/ten.mp4" type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            {wishItems?.length > 0 && !animationLoading ? (
              <WishItems items={wishItems} onClose={() => setWishItems([])} />
            ) : (
              <></>
            )}
            <HeroBanner />
            <Footer
              setIsHistoryOpen={setIsHistoryOpen}
              doWishItems={(items) => {
                setAnimationLoading(true);

                const timeoutId = setTimeout(() => {
                  setAnimationLoading(false);
                }, 6000);
                setAnimationTimeoutId(timeoutId);

                setWishItems(items);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
