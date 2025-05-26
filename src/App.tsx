import BannerCarousel from "@components/BannerCarousel";
import HeroBanner from "@components/HeroBanner";

function App() {
  return (
    <div
      className="min-h-screen py-6 bg-[url('/assets/images/backgrounds/sky.webp')] bg-cover bg-center"
      style={{ cursor: "url('/assets/images/cursor.png') 16 16, auto" }}
    >
      <BannerCarousel />
      <HeroBanner />
    </div>
  );
}

export default App;
