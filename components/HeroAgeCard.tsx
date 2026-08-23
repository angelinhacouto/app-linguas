import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, getHeroForAgeGroup } from '@/constants';
import { AgeGroupId } from '@/types';

interface HeroAgeCardProps {
  age: number;
  ageGroupId: AgeGroupId;
  selected: boolean;
  onPress: () => void;
}

export function HeroAgeCard({ age, ageGroupId, selected, onPress }: HeroAgeCardProps) {
  const hero = getHeroForAgeGroup(ageGroupId);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && { borderColor: hero.color, shadowColor: hero.color },
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.heroEmoji}>{hero.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.age}>{age} anos</Text>
        <Text style={[styles.heroName, selected && { color: hero.color }]}>
          {hero.name}
        </Text>
      </View>
      {selected && <Text style={styles.check}>⚡</Text>}
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
    backgroundColor: COLORS.backgroundLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  heroEmoji: {
    fontSize: 40,
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
  heroName: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
  check: {
    fontSize: 22,
  },
});
