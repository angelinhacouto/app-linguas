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

export function speakFeedback(message: string) {
  Speech.stop();
  Speech.speak(message, {
    language: 'pt-BR',
    pitch: 1.2,
    rate: 0.85,
  });
}
