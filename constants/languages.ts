import { LanguageId } from '@/types';

export interface LanguageOption {
  id: LanguageId;
  label: string;
  nativeLabel: string;
  emoji: string;
  flag: string;
  speechLocale: string;
}

export const LANGUAGES: LanguageOption[] = [
  { id: 'en', label: 'Inglês Americano', nativeLabel: 'American English', emoji: '🇺🇸', flag: '🇺🇸', speechLocale: 'en-US' },
  { id: 'de', label: 'Alemão', nativeLabel: 'Deutsch', emoji: '🇩🇪', flag: '🇩🇪', speechLocale: 'de-DE' },
  { id: 'it', label: 'Italiano', nativeLabel: 'Italiano', emoji: '🇮🇹', flag: '🇮🇹', speechLocale: 'it-IT' },
  { id: 'es', label: 'Espanhol', nativeLabel: 'Español', emoji: '🇪🇸', flag: '🇪🇸', speechLocale: 'es-ES' },
  { id: 'pt', label: 'Português', nativeLabel: 'Português', emoji: '🇧🇷', flag: '🇧🇷', speechLocale: 'pt-BR' },
];

export function getLanguage(id: string): LanguageOption {
  return LANGUAGES.find((l) => l.id === id) ?? LANGUAGES[0];
}

export function getSpeechLocale(languageId: string): string {
  return getLanguage(languageId).speechLocale;
}
