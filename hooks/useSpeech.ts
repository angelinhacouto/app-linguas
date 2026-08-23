import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { getSpeechLocale } from '@/constants/languages';

export function speakWord(word: string, languageId = 'en') {
  Speech.stop();
  Speech.speak(word, {
    language: getSpeechLocale(languageId),
    pitch: 1.1,
    rate: Platform.OS === 'web' ? 0.85 : 0.75,
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

/** Herói apresenta o objeto e fala a palavra no idioma alvo */
export function speakHeroLesson(
  heroName: string,
  objectPt: string,
  word: string,
  languageId: string,
  onWordStart?: () => void
) {
  Speech.stop();
  const intro = `${heroName} diz: Olha! É ${objectPt}! Repete comigo:`;
  Speech.speak(intro, {
    language: 'pt-BR',
    pitch: 1.12,
    rate: 0.9,
    onDone: () => {
      onWordStart?.();
      Speech.speak(word, {
        language: getSpeechLocale(languageId),
        pitch: 1.15,
        rate: Platform.OS === 'web' ? 0.8 : 0.7,
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
