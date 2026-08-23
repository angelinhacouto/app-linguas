import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { BigButton } from '@/components/BigButton';
import { FeedbackBanner } from '@/components/FeedbackBanner';
import { MicButton } from '@/components/MicButton';
import { WordDisplay } from '@/components/WordDisplay';
import { COLORS } from '@/constants';
import { getLessonById, LESSONS } from '@/data/lessons';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { speakFeedback, speakInstruction, speakWord } from '@/hooks/useSpeech';
import { PronunciationService } from '@/services/pronunciation';
import { PronunciationFeedback } from '@/types';

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ lessonId: lesson.id }));
}

export default function PlayScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = getLessonById(lessonId ?? '');

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
        setTimeout(() => speakWord(currentWord.text), 1500);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentWord]);

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
    if (currentWord) speakWord(currentWord.text);
  }, [currentWord]);

  if (!lesson || !currentWord) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Lição não encontrada.</Text>
      </View>
    );
  }

  if (lessonComplete) {
    return (
      <View style={styles.center}>
        <Text style={styles.finishEmoji}>🏆</Text>
        <Text style={styles.finishTitle}>Lição completa!</Text>
        <Text style={styles.finishSubtitle}>Parabéns, campeão!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>{progress}</Text>

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
              <BigButton
                label="Ouvir de novo"
                emoji="🔊"
                color={COLORS.accent}
                onPress={handleListen}
                style={styles.actionBtn}
              />
            )}
            <BigButton
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
