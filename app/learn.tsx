import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { EnvironmentCard } from '@/components/EnvironmentCard';
import { HeroAvatar } from '@/components/HeroAvatar';
import { LessonCard } from '@/components/LessonCard';
import { TechBackground } from '@/components/TechBackground';
import { getLessonsByAge } from '@/data/lessons';
import {
  getEnvironmentWords,
  getEnvironmentsByGroup,
} from '@/data/environments';
import { COLORS } from '@/constants';
import { getSuperHero } from '@/constants/heroes';
import { getLanguage } from '@/constants/languages';
import { speakHeroLine } from '@/hooks/useSpeech';
import { AgeGroupId, LanguageId } from '@/types';

export default function LearnScreen() {
  const { name, age, ageGroup, language, hero } = useLocalSearchParams<{
    name: string;
    age: string;
    ageGroup: string;
    language: string;
    hero: string;
  }>();
  const router = useRouter();

  const studentName = name ?? 'Herói';
  const studentAge = age ?? '4';
  const ageGroupId = (ageGroup ?? '3-4') as AgeGroupId;
  const languageId = (language ?? 'en') as LanguageId;
  const superHero = getSuperHero(hero ?? 'spider-man');
  const lang = getLanguage(languageId);
  const lessons = getLessonsByAge(ageGroupId, languageId);
  const themeLessons = lessons.filter((lesson) => lesson.kind !== 'environment');
  const isYoungExplorer = Number(studentAge) === 3;
  const houseEnvironments = getEnvironmentsByGroup('house');
  const natureEnvironments = getEnvironmentsByGroup('nature');
  const [heroLine, setHeroLine] = useState(superHero.greeting);

  const handleHeroTap = useCallback(() => {
    const lines = [
      superHero.greeting,
      `${superHero.name} vai te ajudar em ${lang.label}!`,
      `Missão: aprender ${lang.label.toLowerCase()} com ${superHero.title.toLowerCase()}!`,
    ];
    const line = lines[Math.floor(Math.random() * lines.length)];
    setHeroLine(line);
    speakHeroLine(line);
  }, [superHero, lang.label]);

  return (
    <TechBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.heroBanner, { borderColor: superHero.accent }]}>
          <HeroAvatar
            heroId={superHero.id}
            size="lg"
            selected
            interactive
            onPress={handleHeroTap}
          />
          <View style={styles.heroInfo}>
            <Text style={styles.greeting}>Olá, {studentName}!</Text>
            <Text style={[styles.heroTitle, { color: superHero.accent }]}>
              {superHero.name}
            </Text>
            <Text style={styles.heroSubtitle}>{superHero.title}</Text>
            <Text style={styles.heroBubble}>"{heroLine}"</Text>
            <Text style={styles.tapHero}>👆 Toca no herói para ouvir</Text>
            <Text style={styles.meta}>
              {studentAge} anos · {lang.flag} {lang.label}
            </Text>
          </View>
        </View>

        {isYoungExplorer ? (
          <>
            <Text style={styles.sectionTitle}>🏠 Explorar a Casa</Text>
            <Text style={styles.sectionSub}>
              Entre em cada cômodo e toque nos objetos para ouvir as palavras!
            </Text>
            {houseEnvironments.map((environment) => (
              <EnvironmentCard
                key={environment.id}
                environment={environment}
                wordCount={getEnvironmentWords(environment.id, languageId).length}
                onPress={() =>
                  router.push({
                    pathname: `/explore/${environment.id}`,
                    params: {
                      name: studentName,
                      language: languageId,
                      hero: superHero.id,
                    },
                  })
                }
              />
            ))}

            <Text style={[styles.sectionTitle, styles.sectionGap]}>🌍 Explorar a Natureza</Text>
            <Text style={styles.sectionSub}>
              Floresta, praia, parque e fazenda esperam por você!
            </Text>
            {natureEnvironments.map((environment) => (
              <EnvironmentCard
                key={environment.id}
                environment={environment}
                wordCount={getEnvironmentWords(environment.id, languageId).length}
                onPress={() =>
                  router.push({
                    pathname: `/explore/${environment.id}`,
                    params: {
                      name: studentName,
                      language: languageId,
                      hero: superHero.id,
                    },
                  })
                }
              />
            ))}

            <Text style={[styles.sectionTitle, styles.sectionGap]}>🎯 Missões extras</Text>
            <Text style={styles.sectionSub}>
              Quando quiser, pratique também com estas missões!
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>🎯 Escolha sua missão</Text>
            <Text style={styles.sectionSub}>
              {superHero.name} vai te ajudar a aprender {lang.label.toLowerCase()}!
            </Text>
          </>
        )}

        {themeLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onPress={() =>
              router.push({
                pathname: `/play/${lesson.id}`,
                params: {
                  name: studentName,
                  ageGroup: ageGroupId,
                  language: languageId,
                  hero: superHero.id,
                },
              })
            }
          />
        ))}
      </ScrollView>
    </TechBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 2,
    gap: 16,
  },
  heroInfo: { flex: 1 },
  greeting: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  heroTitle: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  heroSubtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  heroBubble: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  tapHero: { fontSize: 11, color: COLORS.primary, marginTop: 4 },
  meta: { fontSize: 13, color: COLORS.textLight, marginTop: 6 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  sectionGap: { marginTop: 24 },
  sectionSub: { fontSize: 14, color: COLORS.textLight, marginBottom: 20 },
});
