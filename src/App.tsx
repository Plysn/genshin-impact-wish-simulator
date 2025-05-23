import BannerCarousel from './components/BannerCarousel';
import HeroBanner from './components/HeroBanner';

function App() {
  return (
    <div className="min-h-screen py-6 bg-[url('/assets/images/wish-background-bc054754.webp')] bg-cover bg-center">
      <BannerCarousel />
      <HeroBanner />
    </div>
  );
}

export default App;
