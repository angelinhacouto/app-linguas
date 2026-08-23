import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  HeroReactionTier,
  getHeroReactionStyle,
} from '@/constants/heroReactions';
import { HeroId } from '@/constants/heroes';

interface HeroPowerEffectsProps {
  heroId: HeroId | string;
  tier: HeroReactionTier;
  active: boolean;
}

export function HeroPowerEffects({ heroId, tier, active }: HeroPowerEffectsProps) {
  const style = getHeroReactionStyle(heroId);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  const particles =
    tier === 'power'
      ? style.powerParticles
      : tier === 'teach'
        ? style.teachParticles
        : style.practiceParticles;

  const color =
    tier === 'power'
      ? style.powerColor
      : tier === 'teach'
        ? style.teachColor
        : style.practiceColor;

  useEffect(() => {
    if (!active) {
      opacity.setValue(0);
      scale.setValue(0.5);
      return;
    }

    opacity.setValue(0);
    scale.setValue(0.5);

    const anim =
      tier === 'power'
        ? Animated.loop(
            Animated.parallel([
              Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.6, duration: 400, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
              ]),
              Animated.sequence([
                Animated.spring(scale, { toValue: 1.3, friction: 3, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
              ]),
            ]),
            { iterations: 3 }
          )
        : Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
          ]);

    anim.start();
    return () => anim.stop();
  }, [active, tier, opacity, scale]);

  if (!active) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.wrap, { opacity, transform: [{ scale }] }]}
    >
      <View style={[styles.glow, { backgroundColor: color, shadowColor: color }]} />
      <View style={styles.particleRow}>
        {particles.map((p, i) => (
          <FloatingParticle key={`${p}-${i}`} emoji={p} index={i} tier={tier} />
        ))}
      </View>
      {tier === 'power' && heroId === 'ironman' && (
        <View style={styles.repulsorRow}>
          <View style={[styles.repulsor, { backgroundColor: style.powerColor }]} />
          <View style={[styles.repulsor, { backgroundColor: style.powerColor }]} />
        </View>
      )}
      {tier === 'power' && heroId === 'thor' && (
        <Text style={[styles.bigFx, { color }]}>⚡⚡⚡</Text>
      )}
    </Animated.View>
  );
}

function FloatingParticle({
  emoji,
  index,
  tier,
}: {
  emoji: string;
  index: number;
  tier: HeroReactionTier;
}) {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(y, {
          toValue: tier === 'power' ? -18 : -8,
          duration: 600 + index * 80,
          useNativeDriver: true,
        }),
        Animated.timing(y, { toValue: 0, duration: 600 + index * 80, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [y, index, tier]);

  return (
    <Animated.Text style={[styles.particle, { transform: [{ translateY: y }] }]}>
      {emoji}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  glow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 12,
  },
  particleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    maxWidth: 220,
  },
  particle: {
    fontSize: 28,
  },
  repulsorRow: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    gap: 100,
  },
  repulsor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    opacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  bigFx: {
    fontSize: 40,
    fontWeight: '900',
    marginTop: 8,
  },
});
