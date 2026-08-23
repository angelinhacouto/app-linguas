import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FeedbackBanner } from '@/components/FeedbackBanner';
import { HeroAvatar } from '@/components/HeroAvatar';
import { HeroLessonStage, LessonPhase } from '@/components/HeroLessonStage';
import { MicButton } from '@/components/MicButton';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import {
  getHeroFeedbackSpeech,
  HeroReactionTier,
  scoreToTier,
} from '@/constants/heroReactions';
import { getLanguage } from '@/constants/languages';
import { getSuperHero } from '@/constants/heroes';
import { getLessonById, LESSONS } from '@/data/lessons';
import { usePronunciationMic } from '@/hooks/usePronunciationMic';
import {
  speakFeedback,
  speakHeroPresentsCard,
  speakHeroReaction,
  speakWordOnly,
} from '@/hooks/useSpeech';
import { PronunciationService } from '@/services/pronunciation';
import { LanguageId, PronunciationFeedback } from '@/types';

export function generateStaticParams() {
  const ids = [...new Set(LESSONS.map((lesson) => lesson.id))];
  return ids.map((lessonId) => ({ lessonId }));
}

export default function PlayScreen() {
  const { lessonId, language, hero, name } = useLocalSearchParams<{
    lessonId: string;
    language: string;
    hero?: string;
    name?: string;
  }>();
  const languageId = (language ?? 'en') as LanguageId;
  const studentName = name ?? 'Herói';
  const superHero = getSuperHero(hero ?? 'spider-man');
  const lang = getLanguage(languageId);
  const lesson = getLessonById(lessonId ?? '', languageId);

  const [wordIndex, setWordIndex] = useState(0);
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [heroMood, setHeroMood] = useState<'idle' | 'power' | 'teach' | 'practice' | 'present'>('idle');
  const [phase, setPhase] = useState<LessonPhase>('presenting');
  const [heroLine, setHeroLine] = useState('');
  const [reactionTier, setReactionTier] = useState<HeroReactionTier | null>(null);
  const [showEffects, setShowEffects] = useState(false);

  const { isListening, error: micError, listen, reset: resetMic, isSupported } =
    usePronunciationMic(languageId);

  const currentWord = lesson?.words[wordIndex];
  const isLastWord = lesson ? wordIndex >= lesson.words.length - 1 : false;
  const progress = lesson ? `${wordIndex + 1} / ${lesson.words.length}` : '';

  const runHeroPresentation = useCallback(() => {
    if (!currentWord) return;

    setFeedback(null);
    setReactionTier(null);
    setShowEffects(false);
    setHeroMood('present');
    setPhase('presenting');
    setHeroLine(`${superHero.name} está revelando o cartão: ${currentWord.translation} ${currentWord.emoji}`);

    setTimeout(() => {
      setPhase('hero_speaking');
      setHeroLine(
        `${superHero.name}: Olha! É ${currentWord.translation}! Ouve em ${lang.label.toLowerCase()}: "${currentWord.text}"`
      );

      speakHeroPresentsCard(
        currentWord.translation,
        currentWord.text,
        languageId,
        () => {
          setHeroMood('idle');
          setPhase('your_turn');
          setHeroLine(
            `Agora é sua vez, ${studentName}! Toca no microfone 🎤 e repete: "${currentWord.text}"`
          );
        }
      );
    }, 900);
  }, [currentWord, languageId, superHero.name, studentName, lang.label]);

  useEffect(() => {
    runHeroPresentation();
  }, [runHeroPresentation]);

  const applyHeroReaction = useCallback(
    (tier: HeroReactionTier, result: PronunciationFeedback) => {
      const { line, speakWordAfter } = getHeroFeedbackSpeech(
        superHero.id,
        superHero.name,
        studentName,
        tier
      );

      setReactionTier(tier);
      setShowEffects(true);
      setHeroMood(tier);
      setPhase('feedback');
      setHeroLine(line);

      speakHeroReaction(
        line,
        tier,
        speakWordAfter ? currentWord!.text : undefined,
        languageId
      );

      setTimeout(() => {
        setShowEffects(false);
        setHeroMood('idle');
      }, tier === 'power' ? 3500 : 2500);
    },
    [superHero, studentName, currentWord, languageId]
  );

  const handleMicPress = useCallback(async () => {
    if (isEvaluating || phase === 'hero_speaking' || phase === 'presenting') return;

    setIsEvaluating(true);
    setFeedback(null);
    setShowEffects(false);
    setPhase('listening');
    setHeroLine(`${superHero.name} está ouvindo você, ${studentName}...`);
    resetMic();

    const transcripts = await listen();

    if (transcripts && currentWord) {
      const result = PronunciationService.evaluateAlternatives(
        currentWord.text,
        transcripts
      );
      setFeedback(result);
      const tier = scoreToTier(result.score);
      applyHeroReaction(tier, result);
    } else {
      setPhase('your_turn');
      setHeroLine(`Não ouvi bem, ${studentName}. Toca no microfone e fala mais alto!`);
    }

    setIsEvaluating(false);
  }, [
    isEvaluating,
    phase,
    currentWord,
    listen,
    resetMic,
    superHero.name,
    studentName,
    applyHeroReaction,
  ]);

  const handleHeroTap = useCallback(() => {
    if (!currentWord) return;
    runHeroPresentation();
  }, [currentWord, runHeroPresentation]);

  const handleListen = useCallback(() => {
    if (!currentWord) return;
    speakWordOnly(currentWord.text, languageId);
  }, [currentWord, languageId]);

  const handleRetry = useCallback(() => {
    setFeedback(null);
    setReactionTier(null);
    setShowEffects(false);
    setPhase('your_turn');
    setHeroMood('idle');
    setHeroLine(`Tenta de novo, ${studentName}! Fala: "${currentWord?.text}"`);
  }, [studentName, currentWord]);

  const handleNext = useCallback(() => {
    if (!lesson) return;
    setFeedback(null);
    setReactionTier(null);
    setShowEffects(false);
    setHeroMood('idle');
    resetMic();
    if (isLastWord) {
      setLessonComplete(true);
      speakFeedback(`Parabéns, ${studentName}! Missão completa!`);
    } else {
      setWordIndex((i) => i + 1);
    }
  }, [lesson, isLastWord, resetMic, studentName]);

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
          <HeroAvatar heroId={superHero.id} size="xl" selected mood="power" />
          <Text style={styles.finishEmoji}>🏆</Text>
          <Text style={styles.finishTitle}>Missão completa!</Text>
          <Text style={styles.finishSubtitle}>
            {superHero.name} está orgulhoso de você, {studentName}!
          </Text>
        </View>
      </TechBackground>
    );
  }

  return (
    <TechBackground>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.progress}>
          {superHero.symbol} {studentName} · Missão {progress}
        </Text>

        <HeroLessonStage
          hero={superHero}
          word={currentWord}
          phase={phase}
          heroLine={heroLine}
          mood={heroMood}
          reactionTier={reactionTier}
          showEffects={showEffects}
          onHeroPress={handleHeroTap}
        />

        {feedback ? (
          <FeedbackBanner
            result={feedback.result}
            message={feedback.message}
            encouragement={feedback.encouragement}
            score={feedback.score}
            heard={feedback.heard}
            target={feedback.target}
          />
        ) : null}

        {!isSupported && (
          <Text style={styles.warnText}>
            Use Chrome ou Edge e permita o microfone para análise de pronúncia.
          </Text>
        )}

        {micError ? <Text style={styles.errorText}>{micError}</Text> : null}

        <View style={styles.actions}>
          {isEvaluating ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : feedback ? (
            <View style={styles.feedbackActions}>
              {feedback.score < 70 && (
                <TechButton
                  label="Tentar de novo"
                  emoji="🎤"
                  variant="secondary"
                  onPress={handleRetry}
                  style={styles.actionBtn}
                />
              )}
              {feedback.score < 70 && (
                <TechButton
                  label="Herói fala de novo"
                  emoji="🔊"
                  variant="secondary"
                  onPress={handleHeroTap}
                  style={styles.actionBtn}
                />
              )}
              <TechButton
                label={isLastWord ? 'Terminar' : 'Próximo cartão'}
                emoji={isLastWord ? '🏆' : '🃏'}
                onPress={handleNext}
                style={styles.actionBtn}
              />
            </View>
          ) : (
            <>
              <MicButton
                isRecording={isListening || isEvaluating}
                onPress={handleMicPress}
                disabled={
                  isEvaluating ||
                  phase === 'hero_speaking' ||
                  phase === 'presenting' ||
                  !isSupported
                }
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
      </ScrollView>
    </TechBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  progress: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    alignSelf: 'stretch',
  },
  actions: {
    marginTop: 16,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  feedbackActions: {
    gap: 12,
    alignItems: 'center',
    width: '100%',
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
  warnText: {
    color: COLORS.warning,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
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
