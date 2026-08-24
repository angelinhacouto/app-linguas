import { useState } from 'react';
import { Image, ImageStyle, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { getHeroImageSource } from '@/constants/heroImages';
import { HeroId, SuperHero } from '@/constants/heroes';
import { speakHeroLine } from '@/hooks/useSpeech';

const AVATAR = 100;

interface HeroSelectCardProps {
  hero: SuperHero;
  selected: boolean;
  onPress: () => void;
}

export function HeroSelectCard({ hero, selected, onPress }: HeroSelectCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const isIronMan = hero.id === 'ironman';

  const handlePress = () => {
    onPress();
    speakHeroLine(hero.greeting);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: selected ? hero.accent : COLORS.cardBorder,
          backgroundColor: selected ? COLORS.backgroundLight : COLORS.card,
        },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.avatarBg,
          {
            backgroundColor: isIronMan ? '#0A0E27' : hero.primary,
            borderColor: selected || isIronMan ? hero.accent : COLORS.cardBorder,
          },
          isIronMan && styles.ironAvatarBg,
          selected && isIronMan && styles.ironAvatarSelected,
        ]}
      >
        {!imgFailed ? (
          <Image
            source={getHeroImageSource(hero.id as HeroId)}
            style={[
              styles.avatar,
              isIronMan && Platform.OS === 'web' && (styles.ironAvatarWeb as ImageStyle),
            ]}
            resizeMode="cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <Text style={styles.fallback}>{hero.symbol}</Text>
        )}
      </View>

      {selected ? (
        <View style={[styles.badge, { backgroundColor: hero.accent }]}>
          <Text style={styles.badgeText}>✓</Text>
        </View>
      ) : null}

      <Text style={[styles.name, selected && { color: hero.accent }]} numberOfLines={2}>
        {hero.name}
      </Text>
      <Text style={styles.title} numberOfLines={1}>
        {hero.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 2,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    minHeight: 190,
  },
  pressed: {
    opacity: 0.88,
  },
  avatarBg: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    borderWidth: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ironAvatarBg: {
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 14,
    elevation: 10,
  },
  ironAvatarSelected: {
    borderWidth: 3,
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
  },
  ironAvatarWeb: Platform.select({
    web: {
      objectFit: 'cover',
      objectPosition: '50% 38%',
    } as ImageStyle,
    default: {},
  }),
  fallback: {
    fontSize: 42,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0A0E27',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 18,
    minHeight: 36,
  },
  title: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 2,
  },
});
