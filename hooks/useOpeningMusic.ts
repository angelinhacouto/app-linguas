import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const OPENING_MUSIC_URI =
  'https://assets.mixkit.co/music/preview/mixkit-epic-orchestral-intro-229.mp3';

let globalSound: Audio.Sound | null = null;

export function useOpeningMusic(active: boolean) {
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    let mounted = true;

    (async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        if (globalSound) {
          await globalSound.unloadAsync();
          globalSound = null;
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri: OPENING_MUSIC_URI },
          { shouldPlay: true, volume: 0.55, isLooping: false }
        );

        if (!mounted) {
          await sound.unloadAsync();
          return;
        }

        globalSound = sound;

        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            sound.unloadAsync().catch(() => undefined);
            if (globalSound === sound) globalSound = null;
          }
        });
      } catch {
        // Autoplay pode ser bloqueado pelo navegador até interação do usuário
      }
    })();

    return () => {
      mounted = false;
    };
  }, [active]);
}

export async function stopOpeningMusic() {
  if (!globalSound) return;
  try {
    await globalSound.stopAsync();
    await globalSound.unloadAsync();
  } catch {
    // ignore
  }
  globalSound = null;
}

export async function playOpeningMusicOnInteraction() {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    if (globalSound) {
      await globalSound.stopAsync();
      await globalSound.unloadAsync();
      globalSound = null;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: OPENING_MUSIC_URI },
      { shouldPlay: true, volume: 0.55, isLooping: false }
    );
    globalSound = sound;
  } catch {
    // ignore
  }
}
