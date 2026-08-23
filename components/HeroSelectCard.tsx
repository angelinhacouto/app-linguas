import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { getHeroImageSource } from '@/constants/heroImages';
import { HeroId, SuperHero } from '@/constants/heroes';
import { speakHeroLine } from '@/hooks/useSpeech';

const AVATAR_SIZE = 92;

interface HeroSelectCardProps {
  hero: SuperHero;
  selected: boolean;
  onPress: () => void;
}

export function HeroSelectCard({ hero, selected, onPress }: HeroSelectCardProps) {
  const handlePress = () => {
    onPress();
    speakHeroLine(hero.greeting);
  };

  return (
    <View style={styles.cardWrap}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.card,
          { borderColor: selected ? hero.accent : COLORS.cardBorder },
          selected && styles.cardSelected,
          pressed && styles.cardPressed,
        ]}
      >
        <View
          style={[
            styles.avatarRing,
            { borderColor: selected ? hero.accent : COLORS.cardBorder },
          ]}
        >
          <Image
            source={getHeroImageSource(hero.id as HeroId)}
            style={[
              styles.avatar,
              Platform.OS === 'web' && ({ imageRendering: 'auto' } as object),
            ]}
            resizeMode="cover"
          />
        </View>

        {selected && (
          <View style={[styles.checkBadge, { backgroundColor: hero.accent }]}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}

        <Text style={[styles.name, selected && { color: hero.accent }]} numberOfLines={2}>
          {hero.name}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {hero.title}
        </Text>
      </Pressable>
    </View>
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 2,
    minHeight: 180,
  },
  cardSelected: {
    backgroundColor: COLORS.backgroundLight,
  },
  cardPressed: {
    opacity: 0.9,
  },
  avatarRing: {
    width: AVATAR_SIZE + 6,
    height: AVATAR_SIZE + 6,
    borderRadius: (AVATAR_SIZE + 6) / 2,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#0A0E27',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#1A2347',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  checkText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 18,
    minHeight: 36,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 4,
  },
});
