import BannerCarousel from '@components/BannerCarousel';
import Footer from '@components/Footer';
import HeroBanner from '@components/HeroBanner';
import History from '@components/history/History';
import { useEffect, useState } from 'react';
import './App.css';
import { initializeData } from './db';

function App() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
            <HeroBanner />
            <Footer setIsHistoryOpen={setIsHistoryOpen} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
