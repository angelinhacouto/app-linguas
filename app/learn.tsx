import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { HeroAvatar } from '@/components/HeroAvatar';
import { LessonCard } from '@/components/LessonCard';
import { TechBackground } from '@/components/TechBackground';
import { getLessonsByAge } from '@/data/lessons';
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

        <Text style={styles.sectionTitle}>🎯 Escolha sua missão</Text>
        <Text style={styles.sectionSub}>
          {superHero.name} vai te ajudar a aprender {lang.label.toLowerCase()}!
        </Text>

        {lessons.map((lesson) => (
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
  sectionSub: { fontSize: 14, color: COLORS.textLight, marginBottom: 20 },
});
