import { useState } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { HeroId, SuperHero, getSuperHero, getHeroImageUri } from '@/constants/heroes';

type AvatarSize = 'sm' | 'md' | 'lg';

interface HeroAvatarProps {
  heroId: HeroId | string;
  size?: AvatarSize;
  selected?: boolean;
  style?: ViewStyle;
}

const SIZES = { sm: 56, md: 80, lg: 104 };

export function HeroAvatar({ heroId, size = 'md', selected, style }: HeroAvatarProps) {
  const hero = getSuperHero(heroId);
  const dim = SIZES[size];
  const [failed, setFailed] = useState(false);

  return (
    <View
      style={[
        styles.wrap,
        { width: dim, height: dim, borderRadius: dim / 2 },
        selected && { borderColor: hero.accent, shadowColor: hero.accent },
        selected && styles.selected,
        style,
      ]}
    >
      {!failed ? (
        <Image
          source={{ uri: getHeroImageUri(hero.id) }}
          style={[styles.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <HeroPlaceholder hero={hero} size={size} />
      )}
    </View>
  );
}

function HeroPlaceholder({ hero, size }: { hero: SuperHero; size: AvatarSize }) {
  const fontSize = size === 'lg' ? 28 : size === 'md' ? 20 : 16;
  return (
    <View style={[styles.placeholder, { backgroundColor: hero.primary }]}>
      <Text style={[styles.placeholderText, { fontSize }]}>
        {hero.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#1A2347',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  selected: {
    borderWidth: 3,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },
  image: {
    backgroundColor: '#1A2347',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
