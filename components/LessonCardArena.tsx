import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { WordObjectCard } from '@/components/WordObjectCard';
import { Word } from '@/types';

export interface LessonCardArenaProps {
  word: Word;
  revealed: boolean;
  highlighted?: boolean;
  accentColor?: string;
}

/** Fallback pseudo-3D para mobile — arena com chão em perspectiva + card central */
export function LessonCardArena({
  word,
  revealed,
  highlighted,
  accentColor = COLORS.primary,
}: LessonCardArenaProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.55],
  });

  return (
    <View style={styles.wrap}>
      <View style={styles.sky}>
        {['✨', '⭐', '💫', '✨', '⭐'].map((star, i) => (
          <Text key={i} style={[styles.star, { left: `${12 + i * 18}%`, top: `${8 + (i % 3) * 12}%` }]}>
            {star}
          </Text>
        ))}
      </View>

      <View style={[styles.floor, { borderColor: accentColor }]}>
        <Animated.View
          style={[
            styles.pedestalRing,
            {
              borderColor: accentColor,
              opacity: highlighted ? ringOpacity : 0.2,
              transform: [{ scale: highlighted ? ringScale : 1 }],
            },
          ]}
        />
        <View style={[styles.pedestal, { shadowColor: accentColor }]}>
          <WordObjectCard word={word} revealed={revealed} highlighted={highlighted} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 340,
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
  },
  star: {
    position: 'absolute',
    fontSize: 16,
    opacity: 0.7,
  },
  floor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  pedestalRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 3,
    top: '50%',
    marginTop: -130,
  },
  pedestal: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
});
