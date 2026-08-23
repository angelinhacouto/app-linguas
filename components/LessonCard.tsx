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
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>{lesson.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.words.length} palavras · Missão</Text>
      </View>
      <Text style={styles.arrow}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    borderColor: COLORS.primary,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  arrow: {
    fontSize: 18,
    color: COLORS.primary,
  },
});
