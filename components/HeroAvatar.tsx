import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { getHeroImageSource } from '@/constants/heroImages';
import { HeroId, SuperHero, getSuperHero } from '@/constants/heroes';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeroMood = 'idle' | 'happy' | 'encourage' | 'power' | 'teach' | 'practice' | 'present';

interface HeroAvatarProps {
  heroId: HeroId | string;
  size?: AvatarSize;
  selected?: boolean;
  interactive?: boolean;
  mood?: HeroMood;
  onPress?: () => void;
  style?: ViewStyle;
}

const SIZES = { sm: 56, md: 80, lg: 104, xl: 140 };

export function HeroAvatar({
  heroId,
  size = 'md',
  selected,
  interactive = false,
  mood = 'idle',
  onPress,
  style,
}: HeroAvatarProps) {
  const hero = getSuperHero(heroId);
  const dim = SIZES[size];
  const [failed, setFailed] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const floatY = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(1)).current;
  const symbolScale = useRef(new Animated.Value(0)).current;
  const symbolOpacity = useRef(new Animated.Value(0)).current;

  const isInteractive = interactive || !!onPress;

  useEffect(() => {
    if (!isInteractive) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -6, duration: 1400, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 6, duration: 1400, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [isInteractive, floatY]);

  useEffect(() => {
    if (!selected) {
      ringScale.setValue(1);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(ringScale, { toValue: 1.12, duration: 900, useNativeDriver: true }),
        Animated.timing(ringScale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [selected, ringScale]);

  useEffect(() => {
    if (mood === 'idle') return;

    if (mood === 'happy' || mood === 'power') {
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scale, { toValue: mood === 'power' ? 1.22 : 1.18, friction: 3, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
        ]),
        burstSymbol(symbolScale, symbolOpacity),
      ]).start();
      if (mood === 'power') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(ringScale, { toValue: 1.2, duration: 350, useNativeDriver: true }),
            Animated.timing(ringScale, { toValue: 1, duration: 350, useNativeDriver: true }),
          ]),
          { iterations: 4 }
        ).start();
      }
    }

    if (mood === 'encourage' || mood === 'practice') {
      Animated.sequence([
        Animated.timing(scale, { toValue: 0.94, duration: 120, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]).start();
    }

    if (mood === 'teach') {
      Animated.sequence([
        Animated.timing(floatY, { toValue: -4, duration: 200, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 4, duration: 200, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }

    if (mood === 'present') {
      Animated.spring(scale, { toValue: 1.08, friction: 4, useNativeDriver: true }).start();
    }
  }, [mood, scale, symbolScale, symbolOpacity, ringScale, floatY]);

  const handlePress = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(scale, { toValue: 0.88, friction: 6, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]),
      burstSymbol(symbolScale, symbolOpacity),
    ]).start();
    onPress?.();
  };

  const avatarBody = (
    <View style={[styles.stack, style]}>
      {selected && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowRing,
            {
              width: dim + 16,
              height: dim + 16,
              borderRadius: (dim + 16) / 2,
              borderColor: hero.accent,
              transform: [{ scale: ringScale }],
            },
          ]}
        />
      )}

      <Animated.View
        style={[
          styles.wrap,
          { width: dim, height: dim, borderRadius: dim / 2 },
          selected && { borderColor: hero.accent, shadowColor: hero.accent },
          selected && styles.selected,
          {
            transform: [
              { scale },
              ...(isInteractive ? [{ translateY: floatY }] : []),
            ],
          },
        ]}
      >
        {!failed ? (
          <Image
            source={getHeroImageSource(hero.id)}
            style={[styles.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
            resizeMode="cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <HeroPlaceholder hero={hero} size={size} />
        )}
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.symbolBurst,
          {
            opacity: symbolOpacity,
            transform: [{ scale: symbolScale }],
          },
        ]}
      >
        <Text style={styles.symbolText}>{hero.symbol}</Text>
      </Animated.View>
    </View>
  );

  if (isInteractive) {
    return (
      <Pressable onPress={handlePress} accessibilityRole="button">
        {avatarBody}
      </Pressable>
    );
  }

  return avatarBody;
}

function burstSymbol(scale: Animated.Value, opacity: Animated.Value) {
  scale.setValue(0.4);
  opacity.setValue(1);
  return Animated.parallel([
    Animated.spring(scale, { toValue: 1.4, friction: 4, useNativeDriver: true }),
    Animated.timing(opacity, { toValue: 0, duration: 700, useNativeDriver: true }),
  ]);
}

function HeroPlaceholder({ hero, size }: { hero: SuperHero; size: AvatarSize }) {
  const fontSize = size === 'xl' ? 36 : size === 'lg' ? 28 : size === 'md' ? 20 : 16;
  return (
    <View style={[styles.placeholder, { backgroundColor: hero.primary }]}>
      <Text style={[styles.placeholderText, { fontSize }]}>
        {hero.name
          .split(' ')
          .map((w) => w[0])
          .join('')
          .slice(0, 2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    borderWidth: 2,
    opacity: 0.65,
  },
  wrap: {
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'transparent',
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
  symbolBurst: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: 18,
  },
});
