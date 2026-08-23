import { PronunciationFeedback, PronunciationResult } from '@/types';
import { FEEDBACK_MESSAGES } from '@/constants';
import { listenForSpeech, isSpeechRecognitionSupported } from '@/services/speechRecognition';

export class PronunciationService {
  private static pickRandom(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
  }

  private static scoreToResult(score: number): PronunciationResult {
    if (score >= 70) return 'excellent';
    if (score >= 50) return 'good';
    return 'try_again';
  }

  private static normalize(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s'-]/g, '')
      .replace(/\s+/g, ' ');
  }

  private static buildFeedback(
    result: PronunciationResult,
    score: number,
    heard?: string,
    target?: string
  ): PronunciationFeedback {
    const messages = FEEDBACK_MESSAGES[result];
    let encouragement = this.pickRandom(messages.subtitles);

    if (heard && target && result !== 'excellent') {
      encouragement = `Você disse "${heard}". A palavra é "${target}". ${encouragement}`;
    } else if (heard && result === 'excellent') {
      encouragement = `Perfeito! Você disse "${heard}"! ${encouragement}`;
    }

    return {
      result,
      score,
      message: messages.title,
      encouragement,
      heard,
      target,
    };
  }

  /** Compara palavra alvo com o que o aluno falou (análise fonética simples). */
  static evaluate(targetWord: string, spokenText: string): PronunciationFeedback {
    return this.evaluateAlternatives(targetWord, [spokenText]);
  }

  /** Testa várias transcrições do reconhecimento de voz e usa a melhor pontuação. */
  static evaluateAlternatives(
    targetWord: string,
    alternatives: string[]
  ): PronunciationFeedback {
    const target = this.normalize(targetWord);
    if (!target) {
      return this.buildFeedback('try_again', 0, '', targetWord);
    }

    let bestScore = 0;
    let bestHeard = '';

    for (const alt of alternatives) {
      const normalized = this.normalize(alt);
      if (!normalized) continue;

      const candidates = [
        normalized,
        ...normalized.split(' '),
        normalized.replace(/\s/g, ''),
      ];

      for (const candidate of candidates) {
        const score = this.calculateSimilarity(target, candidate);
        if (score > bestScore) {
          bestScore = score;
          bestHeard = alt.trim();
        }
      }
    }

    if (!bestHeard) {
      return this.buildFeedback('try_again', 0, undefined, targetWord);
    }

    const result = this.scoreToResult(bestScore);
    return this.buildFeedback(result, bestScore, bestHeard, targetWord);
  }

  /**
   * Ouve o microfone, transcreve em inglês americano (en-US) e analisa a pronúncia.
   */
  static async evaluateFromMicrophone(
    targetWord: string,
    languageId: string
  ): Promise<PronunciationFeedback> {
    if (!isSpeechRecognitionSupported()) {
      return {
        result: 'try_again',
        score: 0,
        message: 'Microfone indisponível',
        encouragement:
          'Use Chrome ou Edge no celular/computador para análise de pronúncia em tempo real.',
        target: targetWord,
      };
    }

    try {
      const transcripts = await listenForSpeech(languageId);
      return this.evaluateAlternatives(targetWord, transcripts);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao ouvir.';
      return {
        result: 'try_again',
        score: 0,
        message: 'Tenta de novo!',
        encouragement: msg,
        target: targetWord,
      };
    }
  }

  /** @deprecated Use evaluateFromMicrophone */
  static async evaluateFromAudio(
    targetWord: string,
    _audioUri: string,
    languageId = 'en'
  ): Promise<PronunciationFeedback> {
    return this.evaluateFromMicrophone(targetWord, languageId);
  }

  private static calculateSimilarity(a: string, b: string): number {
    if (!a || !b) return 0;
    if (a === b) return 100;
    if (a.includes(b) || b.includes(a)) return Math.max(88, 100 - Math.abs(a.length - b.length) * 4);

    const maxLen = Math.max(a.length, b.length);
    const distance = this.levenshtein(a, b);
    const ratio = 1 - distance / maxLen;

    // Bônus se começa igual (crianças truncam finais)
    const prefixLen = this.commonPrefix(a, b);
    const prefixBonus = prefixLen >= 2 ? prefixLen * 6 : 0;

    return Math.min(100, Math.round(ratio * 100 + prefixBonus));
  }

  private static commonPrefix(a: string, b: string): number {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  }

  private static levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
}
