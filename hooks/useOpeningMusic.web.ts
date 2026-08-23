import { playEpicFanfare } from '@/services/epicFanfare.web';

export function useOpeningMusic(_active: boolean) {
  // Web: só toca após clique (política do navegador)
}

export async function stopOpeningMusic() {
  // Fanfarra curta — nada a parar
}

export async function playOpeningMusicOnInteraction(): Promise<boolean> {
  try {
    return await playEpicFanfare();
  } catch {
    return false;
  }
}
