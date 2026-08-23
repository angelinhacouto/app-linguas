import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LessonCard } from '@/components/LessonCard';
import { getLessonsByAge } from '@/data/lessons';
import { AGE_GROUPS, COLORS } from '@/constants';
import { AgeGroupId, LanguageId } from '@/types';

export function generateStaticParams() {
  return AGE_GROUPS.map((group) => ({ ageGroup: group.id }));
}

export default function LessonsScreen() {
  const { ageGroup, language } = useLocalSearchParams<{ ageGroup: string; language?: string }>();
  const router = useRouter();
  const ageGroupId = (ageGroup ?? '3-4') as AgeGroupId;
  const languageId = (language ?? 'en') as LanguageId;
  const lessons = getLessonsByAge(ageGroupId, languageId);  const groupInfo = AGE_GROUPS.find((g) => g.id === ageGroupId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{groupInfo?.emoji ?? '🌱'}</Text>
        <Text style={styles.title}>{groupInfo?.label ?? 'Lições'}</Text>
        <Text style={styles.subtitle}>Escolhe uma lição para praticar</Text>
      </View>

      {lessons.length === 0 ? (
        <Text style={styles.empty}>Nenhuma lição disponível ainda.</Text>
      ) : (
        lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onPress={() =>
              router.push({
                pathname: `/play/${lesson.id}`,
                params: { language: languageId },
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 16,
    marginTop: 32,
  },
});
