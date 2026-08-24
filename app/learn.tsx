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
import { COLORS, FONTS } from '@/constants';
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
      `Missão: aprender ${lang.label.toLowerCase()} com poder de herói!`,
    ];
    const line = lines[Math.floor(Math.random() * lines.length)];
    setHeroLine(line);
    speakHeroLine(line);
  }, [superHero, lang.label]);

  return (
    <TechBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hqBanner}>
          <Text style={styles.hqKicker}>CENTRAL DE MISSÕES</Text>
          <Text style={styles.hqTitle}>Bem-vindo, {studentName}</Text>
          <Text style={styles.hqMeta}>
            {studentAge} anos · {lang.flag} {lang.label}
          </Text>
        </View>

        <View style={[styles.heroBanner, { borderColor: superHero.accent }]}>
          <HeroAvatar
            heroId={superHero.id}
            size="lg"
            selected
            interactive
            onPress={handleHeroTap}
          />
          <View style={styles.heroInfo}>
            <Text style={styles.mentorLabel}>SEU MENTOR</Text>
            <Text style={[styles.heroTitle, { color: superHero.accent }]}>
              {superHero.name}
            </Text>
            <Text style={styles.heroSubtitle}>{superHero.title}</Text>
            <Text style={styles.heroBubble}>“{heroLine}”</Text>
            <Text style={styles.tapHero}>Toque no herói para ouvir</Text>
          </View>
        </View>

        {isYoungExplorer ? (
          <>
            <Text style={styles.sectionKicker}>SETOR CASA</Text>
            <Text style={styles.sectionTitle}>Explorar a Casa</Text>
            <Text style={styles.sectionSub}>
              Entre nos cômodos e descubra palavras em {lang.label.toLowerCase()}!
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

            <Text style={[styles.sectionKicker, styles.sectionGap]}>SETOR NATUREZA</Text>
            <Text style={styles.sectionTitle}>Explorar a Natureza</Text>
            <Text style={styles.sectionSub}>
              Floresta, praia, parque e fazenda — cada mundo é uma aventura!
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

            <Text style={[styles.sectionKicker, styles.sectionGap]}>TREINO EXTRA</Text>
            <Text style={styles.sectionTitle}>Missões rápidas</Text>
            <Text style={styles.sectionSub}>Pratique com temas clássicos quando quiser.</Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionKicker}>MISSÕES ATIVAS</Text>
            <Text style={styles.sectionTitle}>Escolha sua missão</Text>
            <Text style={styles.sectionSub}>
              {superHero.name} te guia em {lang.label.toLowerCase()}!
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
  container: { padding: 22, paddingBottom: 56 },
  hqBanner: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.card,
    padding: 18,
    marginBottom: 16,
    overflow: 'hidden',
  },
  hqKicker: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
    fontWeight: '800',
    marginBottom: 8,
  },
  hqTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    fontFamily: FONTS.display,
  },
  hqMeta: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 28,
    borderWidth: 2,
    gap: 14,
  },
  heroInfo: { flex: 1 },
  mentorLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.primary,
    fontFamily: FONTS.display,
    fontWeight: '800',
  },
  heroTitle: { fontSize: 18, fontWeight: '900', marginTop: 4, fontFamily: FONTS.display },
  heroSubtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  heroBubble: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 8,
    lineHeight: 18,
  },
  tapHero: { fontSize: 11, color: COLORS.primary, marginTop: 6, fontWeight: '700' },
  sectionKicker: {
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: FONTS.display,
  },
  sectionGap: { marginTop: 28 },
  sectionSub: { fontSize: 14, color: COLORS.textLight, marginBottom: 16, lineHeight: 20 },
});
