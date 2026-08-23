import { playEpicFanfare } from '@/services/epicFanfare.web';

export function useOpeningMusic(_active: boolean) {
  // Web: trilha só após interação do usuário (política dos navegadores)
}

export async function stopOpeningMusic() {
  // Fanfare curta — não precisa parar
}

export async function playOpeningMusicOnInteraction(): Promise<boolean> {
  return playEpicFanfare();
}
