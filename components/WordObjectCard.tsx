import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { Word } from '@/types';

interface WordObjectCardProps {
  word: Word;
  revealed: boolean;
  highlighted?: boolean;
}

export function WordObjectCard({ word, revealed, highlighted }: WordObjectCardProps) {
  const flip = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (revealed) {
      Animated.parallel([
        Animated.spring(flip, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(bounce, { toValue: -12, duration: 200, useNativeDriver: true }),
          Animated.spring(bounce, { toValue: 0, friction: 4, useNativeDriver: true }),
        ]),
      ]).start();
    } else {
      flip.setValue(0);
      bounce.setValue(0);
    }
  }, [revealed, flip, bounce]);

  useEffect(() => {
    if (!highlighted) {
      glow.setValue(0);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [highlighted, glow]);

  const rotateY = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  const scale = flip.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.85, 1],
  });

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[
          styles.card,
          highlighted && styles.cardHighlight,
          {
            borderColor: glow.interpolate({
              inputRange: [0, 1],
              outputRange: [COLORS.cardBorder, COLORS.primary],
            }),
            transform: [
              { perspective: 800 },
              { rotateY },
              { scale },
              { translateY: bounce },
            ],
          },
        ]}
      >
        <Text style={styles.label}>Carta do objeto</Text>
        <Text style={styles.emoji}>{word.emoji}</Text>
        <Text style={styles.word}>{revealed ? word.text : '???'}</Text>
        <Text style={styles.translation}>{word.translation}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  card: {
    width: '88%',
    maxWidth: 280,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 3,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHighlight: {
    shadowOpacity: 0.55,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 96,
    marginBottom: 8,
  },
  word: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  translation: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
