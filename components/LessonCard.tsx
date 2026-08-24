import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
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
      <View style={styles.stripe} />
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>{lesson.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.kicker}>MISSÃO</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.words.length} palavras · Treino</Text>
      </View>
      <Text style={styles.arrow}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  stripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: COLORS.secondary,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    borderColor: COLORS.primary,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginLeft: 6,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  kicker: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
    fontWeight: '800',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    fontFamily: FONTS.display,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 3,
  },
  arrow: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '900',
    marginRight: 4,
  },
});
