import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { FeedbackBanner } from '@/components/FeedbackBanner';
import { MicButton } from '@/components/MicButton';
import { WordDisplay } from '@/components/WordDisplay';
import { COLORS } from '@/constants';
import { getLessonById, LESSONS } from '@/data/lessons';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { speakFeedback, speakInstruction, speakWord } from '@/hooks/useSpeech';
import { PronunciationService } from '@/services/pronunciation';
import { LanguageId, PronunciationFeedback } from '@/types';

export function generateStaticParams() {
  const ids = [...new Set(LESSONS.map((lesson) => lesson.id))];
  return ids.map((lessonId) => ({ lessonId }));
}

export default function PlayScreen() {
  const { lessonId, language } = useLocalSearchParams<{
    lessonId: string;
    language: string;
  }>();
  const languageId = (language ?? 'en') as LanguageId;
  const lesson = getLessonById(lessonId ?? '', languageId);

  const [wordIndex, setWordIndex] = useState(0);
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);

  const { isRecording, error, startRecording, stopRecording, reset } = useAudioRecorder();

  const currentWord = lesson?.words[wordIndex];
  const isLastWord = lesson ? wordIndex >= lesson.words.length - 1 : false;
  const progress = lesson ? `${wordIndex + 1} / ${lesson.words.length}` : '';

  useEffect(() => {
    if (currentWord) {
      const timer = setTimeout(() => {
        speakInstruction(`Fala: ${currentWord.text}`);
        setTimeout(() => speakWord(currentWord.text, languageId), 1500);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentWord, languageId]);

  const handleMicPress = useCallback(async () => {
    if (isEvaluating) return;

    if (isRecording) {
      setIsEvaluating(true);
      const uri = await stopRecording();

      if (uri && currentWord) {
        const result = await PronunciationService.evaluateFromAudio(
          currentWord.text,
          uri
        );
        setFeedback(result);
        speakFeedback(result.message);
      }
      setIsEvaluating(false);
    } else {
      setFeedback(null);
      reset();
      await startRecording();
    }
  }, [isRecording, isEvaluating, currentWord, startRecording, stopRecording, reset]);

  const handleNext = useCallback(() => {
    if (!lesson) return;
    setFeedback(null);
    reset();
    if (isLastWord) {
      setLessonComplete(true);
      speakFeedback('Parabéns! Lição completa!');
    } else {
      setWordIndex((i) => i + 1);
    }
  }, [lesson, isLastWord, reset]);

  const handleListen = useCallback(() => {
    if (currentWord) speakWord(currentWord.text, languageId);
  }, [currentWord, languageId]);

  if (!lesson || !currentWord) {
    return (
      <TechBackground>
        <View style={styles.center}>
          <Text style={styles.errorText}>Missão não encontrada.</Text>
        </View>
      </TechBackground>
    );
  }

  if (lessonComplete) {
    return (
      <TechBackground>
        <View style={styles.center}>
          <Text style={styles.finishEmoji}>🏆</Text>
          <Text style={styles.finishTitle}>Missão completa!</Text>
          <Text style={styles.finishSubtitle}>Poder máximo, herói!</Text>
        </View>
      </TechBackground>
    );
  }

  return (
    <TechBackground>
      <View style={styles.container}>
        <Text style={styles.progress}>Missão {progress}</Text>

      <WordDisplay word={currentWord} onListen={handleListen} />

      {feedback ? (
        <FeedbackBanner
          result={feedback.result}
          message={feedback.message}
          encouragement={feedback.encouragement}
        />
      ) : (
        <View style={styles.hint}>
          <Text style={styles.hintText}>Toca no microfone e repete a palavra!</Text>
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.actions}>
        {isEvaluating ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : feedback ? (
          <View style={styles.feedbackActions}>
            {feedback.result !== 'excellent' && (
              <TechButton
                label="Ouvir de novo"
                emoji="🔊"
                variant="secondary"
                onPress={handleListen}
                style={styles.actionBtn}
              />
            )}
            <TechButton
              label={isLastWord ? 'Terminar' : 'Próxima'}
              emoji={isLastWord ? '🏆' : '➡️'}
              onPress={handleNext}
              style={styles.actionBtn}
            />
          </View>
        ) : (
          <MicButton
            isRecording={isRecording}
            onPress={handleMicPress}
            disabled={isEvaluating}
          />
        )}
      </View>
    </View>
    </TechBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  progress: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  hint: {
    padding: 16,
    marginVertical: 8,
  },
  hintText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  actions: {
    marginTop: 'auto',
    paddingBottom: 32,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  feedbackActions: {
    gap: 12,
    alignItems: 'center',
  },
  actionBtn: {
    minWidth: 220,
  },
  errorText: {
    color: '#E53935',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  finishEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  finishTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
  },
  finishSubtitle: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 8,
  },
});
