import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ExplorationArena } from '@/components/ExplorationArena';
import { HeroAvatar } from '@/components/HeroAvatar';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import {
  ENVIRONMENT_IDS,
  environmentLessonId,
  getEnvironmentMeta,
  getEnvironmentWords,
} from '@/data/environments';
import { getSuperHero } from '@/constants/heroes';
import { getLanguage } from '@/constants/languages';
import { speakHeroLine, speakWordOnly } from '@/hooks/useSpeech';
import { EnvironmentId, LanguageId, Word } from '@/types';

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

  const router = useRouter();
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
  const [activeWord, setActiveWord] = useState<Word | null>(null);
  const [heroLine, setHeroLine] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!environment) return;
    const line = `${superHero.name}: ${environment.introLine}`;
    setHeroLine(line);
    speakHeroLine(line);
  }, [environment, superHero.name]);

  useEffect(() => {
    if (words.length > 0 && discoveredIds.size >= words.length) {
      setComplete(true);
      const line = `Incrível, ${studentName}! Você descobriu tudo em ${environment?.title ?? 'o ambiente'}!`;
      setHeroLine(line);
      speakHeroLine(line);
    }
  }, [discoveredIds.size, words.length, studentName, environment?.title]);

  const handleWordPress = useCallback(
    (word: Word) => {
      setActiveWord(word);
      setDiscoveredIds((prev) => new Set(prev).add(word.id));

      const line = `${word.translation}! Em ${lang.label.toLowerCase()}: ${word.text}`;
      setHeroLine(`${superHero.name}: ${line}`);
      speakHeroLine(`${word.translation}! Em ${lang.label.toLowerCase()}, fala assim:`);
      setTimeout(() => speakWordOnly(word.text, languageId), 1200);
    },
    [superHero.name, lang.label, languageId]
  );

  const handlePractice = useCallback(() => {
    router.push({
      pathname: `/play/${environmentLessonId(envId)}`,
      params: {
        name: studentName,
        ageGroup: '3-4',
        language: languageId,
        hero: superHero.id,
      },
    });
  }, [router, envId, studentName, languageId, superHero.id]);

  if (!environment || words.length === 0) {
    return (
      <TechBackground>
        <View style={styles.center}>
          <Text style={styles.errorText}>Ambiente não encontrado.</Text>
        </View>
      </TechBackground>
    );
  }

  return (
    <TechBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.heroRow, { borderColor: superHero.accent }]}>
          <HeroAvatar heroId={superHero.id} size="md" selected mood="present" />
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>{superHero.name}</Text>
            <Text style={styles.progress}>
              {discoveredIds.size} / {words.length} descobertos
            </Text>
          </View>
        </View>

        <ExplorationArena
          environment={environment}
          words={words}
          discoveredIds={discoveredIds}
          activeWordId={activeWord?.id}
          onWordPress={handleWordPress}
        />

        <View style={[styles.bubble, { borderColor: environment.accentColor }]}>
          <Text style={styles.bubbleText}>{heroLine}</Text>
        </View>

        {activeWord && (
          <View style={[styles.wordCard, { borderColor: environment.accentColor }]}>
            <Text style={styles.wordEmoji}>{activeWord.emoji}</Text>
            <Text style={styles.wordText}>{activeWord.text}</Text>
            <Text style={styles.wordTranslation}>{activeWord.translation}</Text>
            <TechButton
              label="Ouvir de novo"
              emoji="🔊"
              variant="secondary"
              onPress={() => speakWordOnly(activeWord.text, languageId)}
              style={styles.listenBtn}
            />
          </View>
        )}

        {complete && (
          <View style={styles.completeBox}>
            <Text style={styles.completeEmoji}>🎉</Text>
            <Text style={styles.completeTitle}>Exploração completa!</Text>
            <Text style={styles.completeSub}>
              {superHero.name} quer treinar a pronúncia com você!
            </Text>
            <TechButton
              label="Praticar pronúncia"
              emoji="🎤"
              onPress={handlePractice}
              style={styles.practiceBtn}
            />
          </View>
        )}
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
  },
  errorText: {
    color: '#E53935',
    fontSize: 16,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 2,
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  progress: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '700',
  },
  bubble: {
    marginTop: 16,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
  },
  bubbleText: {
    fontSize: 15,
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
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 8,
  },
  wordTranslation: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 4,
  },
  listenBtn: {
    marginTop: 14,
    minWidth: 180,
  },
  completeBox: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  completeEmoji: {
    fontSize: 48,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.success,
    marginTop: 8,
  },
  completeSub: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  practiceBtn: {
    minWidth: 220,
  },
});
