import wishSound from './assets/audio/wish.mp3';
import { useAudio } from './hooks/useAudio';

function App() {
  const playWishSound = useAudio(wishSound);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Genshin Wish Simulator</h1>
      <button
        onClick={playWishSound}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
      >
        Wish
      </button>
    </div>
  );
}

export default App;
