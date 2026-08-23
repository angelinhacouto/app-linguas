import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HeroAvatar } from '@/components/HeroAvatar';
import { COLORS } from '@/constants';
import { HeroId, SuperHero } from '@/constants/heroes';

interface HeroSelectCardProps {
  hero: SuperHero;
  selected: boolean;
  onPress: () => void;
}

export function HeroSelectCard({ hero, selected, onPress }: HeroSelectCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && { borderColor: hero.accent, backgroundColor: COLORS.backgroundLight },
        pressed && styles.pressed,
      ]}
    >
      <HeroAvatar heroId={hero.id as HeroId} size="md" selected={selected} />
      <Text style={[styles.name, selected && { color: hero.accent }]} numberOfLines={1}>
        {hero.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
    textAlign: 'center',
  },
});
