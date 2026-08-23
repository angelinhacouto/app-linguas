import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FeedbackBanner } from '@/components/FeedbackBanner';
import { HeroAvatar, HeroMood } from '@/components/HeroAvatar';
import { HeroLessonStage, LessonPhase } from '@/components/HeroLessonStage';
import { MicButton } from '@/components/MicButton';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import { getSuperHero } from '@/constants/heroes';
import { getLessonById, LESSONS } from '@/data/lessons';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import {
  speakFeedback,
  speakHeroLesson,
  speakHeroLine,
  speakWordOnly,
} from '@/hooks/useSpeech';
import { PronunciationService } from '@/services/pronunciation';
import { LanguageId, PronunciationFeedback } from '@/types';

export function generateStaticParams() {
  const ids = [...new Set(LESSONS.map((lesson) => lesson.id))];
  return ids.map((lessonId) => ({ lessonId }));
}

export default function PlayScreen() {
  const { lessonId, language, hero } = useLocalSearchParams<{
    lessonId: string;
    language: string;
    hero?: string;
  }>();
  const languageId = (language ?? 'en') as LanguageId;
  const superHero = getSuperHero(hero ?? 'spider-man');
  const lesson = getLessonById(lessonId ?? '', languageId);

  const [wordIndex, setWordIndex] = useState(0);
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [heroMood, setHeroMood] = useState<HeroMood>('idle');
  const [phase, setPhase] = useState<LessonPhase>('hero_speaking');
  const [heroLine, setHeroLine] = useState('');

  const { isRecording, error, startRecording, stopRecording, reset } = useAudioRecorder();

  const currentWord = lesson?.words[wordIndex];
  const isLastWord = lesson ? wordIndex >= lesson.words.length - 1 : false;
  const progress = lesson ? `${wordIndex + 1} / ${lesson.words.length}` : '';

  const startHeroTurn = useCallback(() => {
    if (!currentWord) return;

    setFeedback(null);
    setPhase('hero_speaking');
    setHeroMood('idle');
    setHeroLine(
      `${superHero.name}: Olha! É ${currentWord.translation}! ${currentWord.emoji} Repete comigo: "${currentWord.text}"`
    );

    speakHeroLesson(
      superHero.name,
      currentWord.translation,
      currentWord.text,
      languageId,
      () => {
        setPhase('your_turn');
        setHeroLine(`Agora é sua vez! Toca no microfone e fala: "${currentWord.text}"`);
      }
    );
  }, [currentWord, languageId, superHero.name]);

  useEffect(() => {
    startHeroTurn();
  }, [startHeroTurn]);

  const handleMicPress = useCallback(async () => {
    if (isEvaluating || phase === 'hero_speaking') return;

    if (isRecording) {
      setIsEvaluating(true);
      setPhase('listening');
      setHeroLine(`${superHero.name} está ouvindo você...`);

      const uri = await stopRecording();

      if (uri && currentWord) {
        const result = await PronunciationService.evaluateFromAudio(currentWord.text, uri);
        setFeedback(result);
        setPhase('feedback');

        if (result.result === 'excellent') {
          setHeroMood('happy');
          setHeroLine(`${superHero.name}: ${superHero.cheer}`);
          speakHeroLine(superHero.cheer);
        } else {
          setHeroMood('encourage');
          const line = `${superHero.name}: ${superHero.encourage} (${result.message})`;
          setHeroLine(line);
          speakHeroLine(`${superHero.encourage} ${result.message}`);
        }
        setTimeout(() => setHeroMood('idle'), 1500);
      } else {
        setPhase('your_turn');
        setHeroLine('Não ouvi bem. Tenta de novo!');
      }
      setIsEvaluating(false);
    } else {
      setFeedback(null);
      reset();
      setPhase('listening');
      setHeroLine('Fala agora! O herói está ouvindo...');
      await startRecording();
    }
  }, [
    isRecording,
    isEvaluating,
    phase,
    currentWord,
    startRecording,
    stopRecording,
    reset,
    superHero,
  ]);

  const handleHeroTap = useCallback(() => {
    if (!currentWord) return;
    startHeroTurn();
  }, [currentWord, startHeroTurn]);

  const handleListen = useCallback(() => {
    if (!currentWord) return;
    speakWordOnly(currentWord.text, languageId);
  }, [currentWord, languageId]);

  const handleNext = useCallback(() => {
    if (!lesson) return;
    setFeedback(null);
    setHeroMood('idle');
    reset();
    if (isLastWord) {
      setLessonComplete(true);
      speakFeedback('Parabéns! Missão completa!');
    } else {
      setWordIndex((i) => i + 1);
    }
  }, [lesson, isLastWord, reset]);

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
          <HeroAvatar heroId={superHero.id} size="xl" selected mood="happy" />
          <Text style={styles.finishEmoji}>🏆</Text>
          <Text style={styles.finishTitle}>Missão completa!</Text>
          <Text style={styles.finishSubtitle}>{superHero.name} está orgulhoso de você!</Text>
        </View>
      </TechBackground>
    );
  }

  return (
    <TechBackground>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.progress}>
            {superHero.symbol} Missão {progress}
          </Text>
        </View>

        <HeroLessonStage
          hero={superHero}
          word={currentWord}
          phase={phase}
          heroLine={heroLine}
          mood={heroMood}
          onHeroPress={handleHeroTap}
        />

        {feedback ? (
          <FeedbackBanner
            result={feedback.result}
            message={feedback.message}
            encouragement={feedback.encouragement}
          />
        ) : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.actions}>
          {isEvaluating ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : feedback ? (
            <View style={styles.feedbackActions}>
              {feedback.result !== 'excellent' && (
                <TechButton
                  label="Herói fala de novo"
                  emoji="🔊"
                  variant="secondary"
                  onPress={handleHeroTap}
                  style={styles.actionBtn}
                />
              )}
              <TechButton
                label={isLastWord ? 'Terminar' : 'Próxima palavra'}
                emoji={isLastWord ? '🏆' : '➡️'}
                onPress={handleNext}
                style={styles.actionBtn}
              />
            </View>
          ) : (
            <>
              <MicButton
                isRecording={isRecording}
                onPress={handleMicPress}
                disabled={isEvaluating || phase === 'hero_speaking'}
              />
              {phase === 'your_turn' && (
                <TechButton
                  label="Ouvir palavra"
                  emoji="🔊"
                  variant="secondary"
                  onPress={handleListen}
                  style={styles.listenBtn}
                />
              )}
            </>
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
    gap: 12,
  },
  topBar: {
    alignSelf: 'stretch',
    marginBottom: 4,
  },
  progress: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  actions: {
    marginTop: 'auto',
    paddingBottom: 32,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    gap: 12,
  },
  feedbackActions: {
    gap: 12,
    alignItems: 'center',
  },
  actionBtn: {
    minWidth: 220,
  },
  listenBtn: {
    minWidth: 200,
  },
  errorText: {
    color: '#E53935',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  finishEmoji: {
    fontSize: 64,
    marginTop: 8,
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
    textAlign: 'center',
  },
});
