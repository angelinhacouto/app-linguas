import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { Lesson } from '@/types';

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
}

export function LessonCard({ lesson, onPress }: LessonCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.emoji}>{lesson.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.words.length} palavras</Text>
      </View>
      <Text style={styles.arrow}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#F8F9FF',
  },
  emoji: {
    fontSize: 48,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  arrow: {
    fontSize: 20,
    color: COLORS.primary,
  },
});
