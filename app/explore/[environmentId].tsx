import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CustomRoomPhotoExplorer } from '@/components/CustomRoomPhotoExplorer';
import { ExplorationWorld } from '@/components/ExplorationWorld';
import { FeedbackBanner } from '@/components/FeedbackBanner';
import { HeroAvatar } from '@/components/HeroAvatar';
import { HeroPowerEffects } from '@/components/HeroPowerEffects';
import { MicButton } from '@/components/MicButton';
import { RoomPhotoUploadPanel } from '@/components/RoomPhotoUploadPanel';
import { RoomPhotoFileInput } from '@/components/RoomPhotoFileInput';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import {
  getHeroFeedbackSpeech,
  HeroReactionTier,
  scoreToTier,
} from '@/constants/heroReactions';
import { getSuperHero } from '@/constants/heroes';
import { getLanguage } from '@/constants/languages';
import {
  ENVIRONMENT_IDS,
  getEnvironmentMeta,
  getEnvironmentWords,
} from '@/data/environments';
import { usePronunciationMic } from '@/hooks/usePronunciationMic';
import { useCustomRoomPhoto } from '@/hooks/useCustomRoomPhoto';
import {
  speakFeedback,
  speakHeroLine,
  speakHeroPresentsCard,
  speakHeroReaction,
  speakWordOnly,
} from '@/hooks/useSpeech';
import { PronunciationService } from '@/services/pronunciation';
import { EnvironmentId, LanguageId, PronunciationFeedback, Word } from '@/types';

type ExplorePhase = 'idle' | 'hero_speaking' | 'your_turn' | 'listening' | 'feedback';

export function generateStaticParams() {
  return ENVIRONMENT_IDS.map((environmentId) => ({ environmentId }));
}

export default function ExploreScreen() {
  const { environmentId, language, hero, name } = useLocalSearchParams<{
    environmentId: string;
    language: string;
    hero?: string;
    name?: string;
  }>();

  const languageId = (language ?? 'en') as LanguageId;
  const studentName = name ?? 'Herói';
  const superHero = getSuperHero(hero ?? 'spider-man');
  const lang = getLanguage(languageId);
  const envId = environmentId as EnvironmentId;

  const environment = useMemo(() => {
    try {
      return getEnvironmentMeta(envId);
    } catch {
      return null;
    }
  }, [envId]);

  const words = useMemo(
    () => (environment ? getEnvironmentWords(envId, languageId) : []),
    [environment, envId, languageId]
  );

  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [practicedIds, setPracticedIds] = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord] = useState<Word | null>(null);
  const [heroLine, setHeroLine] = useState('');
  const [phase, setPhase] = useState<ExplorePhase>('idle');
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [heroMood, setHeroMood] = useState<'idle' | 'power' | 'teach' | 'practice' | 'present'>(
    'idle'
  );
  const [reactionTier, setReactionTier] = useState<HeroReactionTier | null>(null);
  const [showEffects, setShowEffects] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);

  const { isListening, error: micError, listen, reset: resetMic, isSupported } =
    usePronunciationMic(languageId);

  const supportsCustomPhoto = environment?.group === 'house';
  const customRoom = useCustomRoomPhoto(envId, words);
  const showPhotoExplorer =
    supportsCustomPhoto &&
    customRoom.viewMode === 'photo' &&
    !!customRoom.photoUri;

  useEffect(() => {
    if (!environment) return;
    const customHint = supportsCustomPhoto
      ? ' Você pode enviar uma foto real do ambiente e marcar os objetos!'
      : '';
    const line = `Olá, ${studentName}! ${environment.introLine}${customHint} Toque num objeto, ouça o ${lang.label.toLowerCase()} e repita no microfone.`;
    setHeroLine(line);
    setPhase('idle');
    speakHeroLine(line);
  }, [environment, studentName, lang.label, supportsCustomPhoto]);

  useEffect(() => {
    if (words.length === 0 || practicedIds.size < words.length || missionComplete) return;
    setMissionComplete(true);
    const line = `Missão completa, ${studentName}! Você praticou tudo no ${environment?.title ?? 'ambiente'}!`;
    setHeroLine(line);
    speakFeedback(line);
  }, [practicedIds.size, words.length, studentName, environment?.title, missionComplete]);

  const presentWord = useCallback(
    (word: Word) => {
      setActiveWord(word);
      setDiscoveredIds((prev) => new Set(prev).add(word.id));
      setFeedback(null);
      setReactionTier(null);
      setShowEffects(false);
      setHeroMood('present');
      setPhase('hero_speaking');
      setHeroLine(
        `${superHero.name}: Isso é ${word.translation}! Ouve em ${lang.label.toLowerCase()}: "${word.text}"`
      );

      speakHeroPresentsCard(word.translation, word.text, languageId, () => {
        setHeroMood('idle');
        setPhase('your_turn');
        setHeroLine(
          `Agora é sua vez, ${studentName}! Toque no microfone 🎤 e repita: "${word.text}"`
        );
      });
    },
    [superHero.name, lang.label, languageId, studentName]
  );

  const handleObjectSelect = useCallback(
    (word: Word) => {
      if (customRoom.isSetupMode) return;
      if (phase === 'hero_speaking' || phase === 'listening' || isEvaluating) return;
      presentWord(word);
    },
    [phase, isEvaluating, presentWord, customRoom.isSetupMode]
  );

  const applyHeroReaction = useCallback(
    (tier: HeroReactionTier, word: Word) => {
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

      if (tier === 'power' || tier === 'teach') {
        setPracticedIds((prev) => new Set(prev).add(word.id));
      }

      speakHeroReaction(line, tier, speakWordAfter ? word.text : undefined, languageId);

      setTimeout(() => {
        setShowEffects(false);
        setHeroMood('idle');
      }, tier === 'power' ? 3500 : 2500);
    },
    [superHero, studentName, languageId]
  );

  const handleMicPress = useCallback(async () => {
    if (!activeWord || isEvaluating || phase === 'hero_speaking' || phase === 'idle') return;

    setIsEvaluating(true);
    setFeedback(null);
    setShowEffects(false);
    setPhase('listening');
    setHeroLine(`${superHero.name} está ouvindo você, ${studentName}...`);
    resetMic();

    const transcripts = await listen();

    if (transcripts && activeWord) {
      const result = PronunciationService.evaluateAlternatives(activeWord.text, transcripts);
      setFeedback(result);
      applyHeroReaction(scoreToTier(result.score), activeWord);
    } else {
      setPhase('your_turn');
      setHeroLine(`Não ouvi bem, ${studentName}. Toque no microfone e fale mais alto!`);
    }

    setIsEvaluating(false);
  }, [
    activeWord,
    isEvaluating,
    phase,
    listen,
    resetMic,
    superHero.name,
    studentName,
    applyHeroReaction,
  ]);

  const handleRetry = useCallback(() => {
    if (!activeWord) return;
    setFeedback(null);
    setReactionTier(null);
    setShowEffects(false);
    setPhase('your_turn');
    setHeroMood('idle');
    setHeroLine(`Tenta de novo, ${studentName}! Fala: "${activeWord.text}"`);
  }, [studentName, activeWord]);

  const handleListenAgain = useCallback(() => {
    if (!activeWord) return;
    speakWordOnly(activeWord.text, languageId);
  }, [activeWord, languageId]);

  const handleHeroReplay = useCallback(() => {
    if (!activeWord || phase === 'listening' || isEvaluating) return;
    presentWord(activeWord);
  }, [activeWord, phase, isEvaluating, presentWord]);

  if (!environment || words.length === 0) {
    return (
      <TechBackground>
        <View style={styles.center}>
          <Text style={styles.errorText}>Ambiente não encontrado.</Text>
        </View>
      </TechBackground>
    );
  }

  if (missionComplete) {
    return (
      <TechBackground>
        <View style={styles.center}>
          <HeroAvatar heroId={superHero.id} size="xl" selected mood="power" />
          <Text style={styles.finishEmoji}>🏆</Text>
          <Text style={styles.finishTitle}>Missão completa!</Text>
          <Text style={styles.finishSubtitle}>
            {superHero.name} está orgulhoso de você, {studentName}!
          </Text>
          <Text style={styles.finishHint}>
            Você praticou {practicedIds.size} palavras em {environment.title}.
          </Text>
        </View>
      </TechBackground>
    );
  }

  return (
    <TechBackground>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={[styles.heroRow, { borderColor: superHero.accent }]}>
          <View style={styles.heroAvatarWrap}>
            <HeroAvatar heroId={superHero.id} size="md" selected mood={heroMood} />
            {reactionTier && (
              <HeroPowerEffects heroId={superHero.id} tier={reactionTier} active={showEffects} />
            )}
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.greeting}>Com {superHero.name}</Text>
            <Text style={styles.mission}>
              {environment.emoji} {environment.title} · {lang.label}
            </Text>
            <Text style={styles.progress}>
              {practicedIds.size}/{words.length} praticados
            </Text>
          </View>
        </View>

        {supportsCustomPhoto ? (
          <>
            <RoomPhotoFileInput
              inputRef={customRoom.fileInputRef}
              onFile={(file) => void customRoom.handleFileSelected(file)}
            />
            <RoomPhotoUploadPanel
              hasPhoto={!!customRoom.photoUri}
              viewMode={customRoom.viewMode}
              setupComplete={customRoom.setupComplete}
              placedCount={customRoom.placedCount}
              totalWords={words.length}
              isUploading={customRoom.isUploading}
              uploadError={customRoom.uploadError}
              onUpload={customRoom.openPhotoPicker}
              onSwitch3d={() => customRoom.setViewMode('3d')}
              onSwitchPhoto={() => customRoom.setViewMode('photo')}
              onResetPlacement={customRoom.resetPlacement}
              onRemovePhoto={customRoom.removePhoto}
            />
          </>
        ) : null}

        {showPhotoExplorer && customRoom.photoUri ? (
          <CustomRoomPhotoExplorer
            photoUri={customRoom.photoUri}
            words={words}
            hotspots={customRoom.hotspots}
            discoveredIds={discoveredIds}
            practicedIds={practicedIds}
            activeWordId={activeWord?.id}
            accentColor={environment.accentColor}
            setupMode={customRoom.isSetupMode}
            setupWord={customRoom.setupWord}
            setupWordIndex={customRoom.setupWordIndex}
            placedCount={customRoom.placedCount}
            onPhotoPress={customRoom.placeHotspot}
            onObjectSelect={handleObjectSelect}
          />
        ) : (
          <ExplorationWorld
            environment={environment}
            words={words}
            discoveredIds={discoveredIds}
            practicedIds={practicedIds}
            activeWordId={activeWord?.id}
            onObjectSelect={handleObjectSelect}
          />
        )}

        <View style={[styles.bubble, { borderColor: environment.accentColor }]}>
          <Text style={styles.bubbleText}>{heroLine}</Text>
        </View>

        {activeWord ? (
          <View style={[styles.wordCard, { borderColor: environment.accentColor }]}>
            <Text style={styles.wordEmoji}>{activeWord.emoji}</Text>
            <Text style={styles.wordText}>{activeWord.text}</Text>
            <Text style={styles.wordTranslation}>{activeWord.translation}</Text>
            {phase === 'your_turn' ? (
              <Text style={styles.turnHint}>Repita no microfone ↓</Text>
            ) : null}
          </View>
        ) : customRoom.isSetupMode ? (
          <Text style={styles.idleHint}>
            Marque todos os objetos na foto para começar a missão
          </Text>
        ) : showPhotoExplorer ? (
          <Text style={styles.idleHint}>Toque num objeto na sua foto para começar</Text>
        ) : (
          <Text style={styles.idleHint}>Toque num cubo 3D para começar a missão</Text>
        )}

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

        {!isSupported ? (
          <Text style={styles.warnText}>
            Use Chrome ou Edge e permita o microfone para análise de pronúncia.
          </Text>
        ) : null}

        {micError ? <Text style={styles.errorText}>{micError}</Text> : null}

        <View style={styles.actions}>
          {isEvaluating || phase === 'listening' ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : feedback && phase === 'feedback' ? (
            <View style={styles.feedbackActions}>
              {feedback.score < 70 ? (
                <>
                  <TechButton
                    label="Tentar de novo"
                    emoji="🎤"
                    variant="secondary"
                    onPress={handleRetry}
                    style={styles.actionBtn}
                  />
                  <TechButton
                    label="Ouvir de novo"
                    emoji="🔊"
                    variant="secondary"
                    onPress={handleHeroReplay}
                    style={styles.actionBtn}
                  />
                </>
              ) : null}
              <TechButton
                label="Próximo objeto"
                emoji="👉"
                onPress={() => {
                  setFeedback(null);
                  setReactionTier(null);
                  setPhase('idle');
                  setActiveWord(null);
                  setHeroLine(`Escolha outro objeto no ${environment.title}, ${studentName}!`);
                }}
                style={styles.actionBtn}
              />
            </View>
          ) : phase === 'your_turn' || phase === 'feedback' ? (
            <>
              <MicButton
                isRecording={isListening || isEvaluating}
                onPress={handleMicPress}
                disabled={isEvaluating || !isSupported}
              />
              <TechButton
                label="Ouvir palavra"
                emoji="🔊"
                variant="secondary"
                onPress={handleListenAgain}
                style={styles.listenBtn}
              />
            </>
          ) : phase === 'hero_speaking' ? (
            <Text style={styles.listeningHint}>Ouça o herói falando...</Text>
          ) : null}
        </View>
      </ScrollView>
    </TechBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
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
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 2,
  },
  heroAvatarWrap: {
    position: 'relative',
  },
  heroInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  mission: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '700',
  },
  progress: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    fontWeight: '700',
  },
  bubble: {
    marginTop: 12,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
  },
  bubbleText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: '600',
  },
  wordCard: {
    marginTop: 16,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  wordEmoji: {
    fontSize: 64,
  },
  wordText: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 8,
  },
  wordTranslation: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 4,
  },
  turnHint: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  idleHint: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.textLight,
    fontWeight: '700',
    fontSize: 14,
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
  listeningHint: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 15,
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
  finishHint: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
});
