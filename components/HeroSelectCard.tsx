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
  const titleOpacity = useRef(new Animated.Value(selected ? 1 : 0.6)).current;

  useEffect(() => {
    Animated.timing(titleOpacity, {
      toValue: selected ? 1 : 0.6,
      duration: 250,
      useNativeDriver: true,
    }).start();

    if (selected) {
      Animated.sequence([
        Animated.spring(cardScale, { toValue: 1.04, friction: 4, useNativeDriver: true }),
        Animated.spring(cardScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]).start();
    }
  }, [selected, cardScale, titleOpacity]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(cardScale, { toValue: 0.94, friction: 6, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    onPress();
    speakHeroLine(hero.greeting);
  };

  return (
    <Animated.View style={[styles.cardWrap, { transform: [{ scale: cardScale }] }]}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.card,
          selected && { borderColor: hero.accent, backgroundColor: COLORS.backgroundLight },
        ]}
      >
        <HeroAvatar
          heroId={hero.id as HeroId}
          size="md"
          selected={selected}
          interactive
        />
        <Animated.Text
          style={[styles.name, selected && { color: hero.accent }, { opacity: titleOpacity }]}
          numberOfLines={1}
        >
          {hero.name}
        </Animated.Text>
        {selected && (
          <View style={[styles.badge, { backgroundColor: hero.primary }]}>
            <Text style={styles.badgeText}>{hero.symbol} Escolhido!</Text>
          </View>
        )}
        {!selected && (
          <Text style={styles.tapHint}>Toca para ouvir</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    width: '47%',
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
    textAlign: 'center',
  },
  badge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tapHint: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
