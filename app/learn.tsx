import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LessonCard } from '@/components/LessonCard';
import { TechBackground } from '@/components/TechBackground';
import { getLessonsByAge } from '@/data/lessons';
import { COLORS, getHeroForAgeGroup } from '@/constants';
import { AgeGroupId } from '@/types';

export default function LearnScreen() {
  const { name, age, ageGroup } = useLocalSearchParams<{
    name: string;
    age: string;
    ageGroup: string;
  }>();
  const router = useRouter();

  const studentName = name ?? 'Herói';
  const studentAge = age ?? '4';
  const ageGroupId = (ageGroup ?? '3-4') as AgeGroupId;
  const hero = getHeroForAgeGroup(ageGroupId);
  const lessons = getLessonsByAge(ageGroupId);

  return (
    <TechBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.heroBanner, { borderColor: hero.color }]}>
          <Text style={styles.heroEmoji}>{hero.emoji}</Text>
          <View style={styles.heroInfo}>
            <Text style={styles.greeting}>Olá, {studentName}!</Text>
            <Text style={[styles.heroTitle, { color: hero.color }]}>
              {hero.name} — {hero.title}
            </Text>
            <Text style={styles.meta}>
              {studentAge} anos · Missões de inglês
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🎯 Escolha sua missão</Text>
        <Text style={styles.sectionSub}>
          Cada missão ensina palavras com seu super-herói mentor
        </Text>

        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onPress={() =>
              router.push({
                pathname: `/play/${lesson.id}`,
                params: { name: studentName, ageGroup: ageGroupId },
              })
            }
          />
        ))}
      </ScrollView>
    </TechBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 2,
  },
  heroEmoji: {
    fontSize: 52,
    marginRight: 16,
  },
  heroInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  meta: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 20,
  },
});
