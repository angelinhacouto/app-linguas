import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { getLanguage, getSpeechLocale } from '@/constants/languages';

export function speakWord(word: string, languageId = 'en') {
  Speech.stop();
  const locale = getSpeechLocale(languageId);
  Speech.speak(word, {
    language: locale,
    pitch: locale.startsWith('en') ? 1.05 : 1.1,
    rate: Platform.OS === 'web' ? (locale.startsWith('en') ? 0.88 : 0.85) : 0.75,
  });
}

export function speakInstruction(text: string) {
  Speech.stop();
  Speech.speak(text, {
    language: 'pt-BR',
    pitch: 1.0,
    rate: 0.9,
  });
}

export function speakHeroLine(text: string) {
  Speech.stop();
  Speech.speak(text, {
    language: 'pt-BR',
    pitch: 1.15,
    rate: 0.88,
  });
}

export function speakHeroReaction(
  text: string,
  tier: 'power' | 'teach' | 'practice',
  word?: string,
  languageId?: string
) {
  Speech.stop();
  const pitch = tier === 'power' ? 1.28 : tier === 'teach' ? 1.12 : 1.0;
  const rate = tier === 'power' ? 0.9 : tier === 'teach' ? 0.82 : 0.8;

  Speech.speak(text, {
    language: 'pt-BR',
    pitch,
    rate,
    onDone: () => {
      if (tier === 'teach' && word && languageId) {
        setTimeout(() => speakWord(word, languageId), 400);
      }
    },
  });
}

/** Herói apresenta o card do objeto e fala a palavra no idioma escolhido */
export function speakHeroPresentsCard(
  objectPt: string,
  word: string,
  languageId: string,
  onWordDone?: () => void
) {
  Speech.stop();
  const langLabel = getLanguage(languageId).label;
  const intro = `Olha este cartão! É ${objectPt}! Em ${langLabel.toLowerCase()}, fala assim:`;
  Speech.speak(intro, {
    language: 'pt-BR',
    pitch: 1.1,
    rate: 0.88,
    onDone: () => {
      Speech.speak(word, {
        language: getSpeechLocale(languageId),
        pitch: getSpeechLocale(languageId).startsWith('en') ? 1.05 : 1.12,
        rate: Platform.OS === 'web' ? 0.88 : 0.75,
        onDone: () => onWordDone?.(),
      });
    },
  });
}

export function speakWordOnly(word: string, languageId: string) {
  speakWord(word, languageId);
}

export function speakFeedback(message: string) {
  Speech.stop();
  Speech.speak(message, {
    language: 'pt-BR',
    pitch: 1.2,
    rate: 0.85,
  });
}
