import { PronunciationFeedback, PronunciationResult } from '@/types';
import { FEEDBACK_MESSAGES } from '@/constants';

/**
 * Serviço de avaliação de pronúncia.
 *
 * MVP: análise local simulada (funciona sem API key).
 * Produção: substituir evaluate() por Azure Speech Pronunciation Assessment
 * ou SpeechSuper — veja README.
 */
export class PronunciationService {
  private static pickRandom(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
  }

  private static scoreToResult(score: number): PronunciationResult {
    if (score >= 80) return 'excellent';
    if (score >= 55) return 'good';
    return 'try_again';
  }

  private static buildFeedback(result: PronunciationResult, score: number): PronunciationFeedback {
    const messages = FEEDBACK_MESSAGES[result];
    return {
      result,
      score,
      message: messages.title,
      encouragement: this.pickRandom(messages.subtitles),
    };
  }

  /**
   * Avalia pronúncia comparando transcrição com palavra alvo.
   * No MVP, usa similaridade simples entre strings.
   */
  static evaluate(targetWord: string, spokenText: string): PronunciationFeedback {
    const target = targetWord.toLowerCase().trim();
    const spoken = spokenText.toLowerCase().trim();

    if (!spoken) {
      return this.buildFeedback('try_again', 0);
    }

    const score = this.calculateSimilarity(target, spoken);
    const result = this.scoreToResult(score);
    return this.buildFeedback(result, score);
  }

  /**
   * Simula avaliação quando não há transcrição real (demo/offline).
   * Em produção, envie o áudio para a API de pronúncia.
   */
  static async evaluateFromAudio(
    targetWord: string,
    _audioUri: string
  ): Promise<PronunciationFeedback> {
    // Simula latência de rede
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Demo: score aleatório com tendência positiva para manter a criança motivada
    const baseScore = 60 + Math.random() * 40;
    const result = this.scoreToResult(baseScore);
    return this.buildFeedback(result, Math.round(baseScore));
  }

  private static calculateSimilarity(a: string, b: string): number {
    if (a === b) return 100;

    const maxLen = Math.max(a.length, b.length);
    if (maxLen === 0) return 0;

    const distance = this.levenshtein(a, b);
    return Math.round((1 - distance / maxLen) * 100);
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
