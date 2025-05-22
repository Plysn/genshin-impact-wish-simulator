import { useEffect, useRef } from 'react';

export function useAudio(url: string) {
  const audioRef = useRef(new Audio(url));

  useEffect(() => {
    audioRef.current.load();
  }, [url]);

  const play = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
}
