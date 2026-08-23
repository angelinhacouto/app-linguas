import { useCallback, useRef, useState } from 'react';
import { isSpeechRecognitionSupported, listenForSpeech } from '@/services/speechRecognition';

export function usePronunciationMic(languageId: string) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busyRef = useRef(false);

  const listen = useCallback(async (): Promise<string[] | null> => {
    if (busyRef.current) return null;
    if (!isSpeechRecognitionSupported()) {
      setError('Use Chrome ou Edge para análise de pronúncia.');
      return null;
    }

    busyRef.current = true;
    setIsListening(true);
    setError(null);

    try {
      return await listenForSpeech(languageId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao ouvir.';
      setError(message);
      return null;
    } finally {
      busyRef.current = false;
      setIsListening(false);
    }
  }, [languageId]);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    isListening,
    error,
    listen,
    reset,
    isSupported: isSpeechRecognitionSupported(),
  };
}
