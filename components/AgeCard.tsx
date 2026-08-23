import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { AgeGroupId } from '@/types';

const AGE_EMOJI: Record<number, string> = {
  3: '👶',
  4: '🧒',
  5: '🧒',
  6: '🦸',
};

interface AgeCardProps {
  age: number;
  ageGroupId: AgeGroupId;
  selected: boolean;
  onPress: () => void;
}

export function AgeCard({ age, selected, onPress }: AgeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.emoji}>{AGE_EMOJI[age] ?? '🎂'}</Text>
      <View style={styles.info}>
        <Text style={styles.age}>{age} anos</Text>
        <Text style={styles.hint}>Idade do aluno</Text>
      </View>
      {selected && <Text style={styles.check}>✓</Text>}
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
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  selected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.backgroundLight,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  emoji: {
    fontSize: 36,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  age: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  hint: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  check: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: '900',
  },
});
