import { useState, useEffect } from "react";
import { bad, congrats, good } from "~/assets/sounds";

function useAudio(audioFile: string) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = new Audio(audioFile);
    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.src = "";
    };
  }, [audioFile]);

  return audio;
}

export function useAudioSetup() {
  const goodAudio = useAudio(good);
  const badAudio = useAudio(bad);
  const congratsAudio = useAudio(congrats);

  return { goodAudio, badAudio, congratsAudio };
}
