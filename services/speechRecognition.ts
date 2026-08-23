import { getSpeechLocale } from '@/constants/languages';

function getRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null;
}

/** Escuta a fala do aluno e devolve transcrições (en-US para inglês americano). */
export function listenForSpeech(languageId: string, timeoutMs = 9000): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      reject(
        new Error(
          'Análise de voz não disponível neste navegador. Use Chrome ou Edge no computador ou celular.'
        )
      );
      return;
    }

    const recognition = new Ctor();
    recognition.lang = getSpeechLocale(languageId);
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    let settled = false;

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const timer = setTimeout(() => {
      try {
        recognition.stop();
      } catch {
        /* ignore */
      }
      finish(() => reject(new Error('Tempo esgotado. Fala mais alto e tenta de novo!')));
    }, timeoutMs);

    recognition.onresult = (event) => {
      const transcripts: string[] = [];
      const result = event.results[0];
      for (let i = 0; i < result.length; i++) {
        const text = result[i]?.transcript?.trim();
        if (text) transcripts.push(text);
      }
      finish(() => {
        if (transcripts.length === 0) {
          reject(new Error('Não ouvi nada. Toca no microfone e repete a palavra!'));
        } else {
          resolve(transcripts);
        }
      });
    };

    recognition.onerror = (event) => {
      const messages: Record<string, string> = {
        'no-speech': 'Não ouvi nada. Fala bem perto do microfone!',
        'not-allowed': 'Permita o microfone nas configurações do navegador.',
        aborted: 'Gravação cancelada. Tenta de novo!',
        network: 'Erro de rede. Verifique a internet.',
      };
      finish(() =>
        reject(new Error(messages[event.error] ?? 'Erro ao ouvir. Tenta de novo!'))
      );
    };

    recognition.onend = () => {
      // onend dispara após onresult; só trata se nada foi capturado
      finish(() => reject(new Error('Não ouvi nada. Toca no microfone e repete!')));
    };

    try {
      recognition.start();
    } catch {
      finish(() => reject(new Error('Microfone ocupado. Aguarde e tente de novo.')));
    }
  });
}
