import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { HeroAvatar } from '@/components/HeroAvatar';
import { COLORS } from '@/constants';
import { HeroId, SuperHero } from '@/constants/heroes';
import { speakHeroLine } from '@/hooks/useSpeech';

interface HeroSelectCardProps {
  hero: SuperHero;
  selected: boolean;
  onPress: () => void;
}

export function HeroSelectCard({ hero, selected, onPress }: HeroSelectCardProps) {
  const cardScale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(cardScale, { toValue: 0.96, friction: 6, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    onPress();
    speakHeroLine(hero.greeting);
  };

  return (
    <Animated.View style={[styles.cardWrap, { transform: [{ scale: cardScale }] }]}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.card,
          { borderColor: selected ? hero.accent : COLORS.cardBorder },
          selected && styles.cardSelected,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.avatarSlot}>
          <HeroAvatar heroId={hero.id as HeroId} size="sm" selected={selected} />
          {selected && (
            <View style={[styles.checkBadge, { backgroundColor: hero.accent }]}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
        </View>

        <Text style={[styles.name, selected && { color: hero.accent }]} numberOfLines={2}>
          {hero.name}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {hero.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    width: '48%',
    marginBottom: 14,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    minHeight: 168,
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  cardSelected: {
    backgroundColor: COLORS.backgroundLight,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  cardPressed: {
    opacity: 0.92,
  },
  avatarSlot: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'visible',
  },
  checkBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  checkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
  name: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 17,
    minHeight: 34,
  },
  title: {
    fontSize: 10,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
});
