import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '@/constants';
import { EnvironmentMeta, Word } from '@/types';

interface ExplorationArenaProps {
  environment: EnvironmentMeta;
  words: Word[];
  discoveredIds: Set<string>;
  activeWordId?: string | null;
  onWordPress: (word: Word) => void;
}

function Hotspot({
  word,
  discovered,
  active,
  accentColor,
  onPress,
}: {
  word: Word;
  discovered: boolean;
  active: boolean;
  accentColor: string;
  onPress: () => void;
}) {
  const pulse = useRef(new Animated.Value(0)).current;
  const position = word.position ?? { x: 50, y: 50 };

  useEffect(() => {
    if (discovered) {
      pulse.setValue(0);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [discovered, pulse]);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });

  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.hotspot,
        {
          left: `${position.x}%`,
          top: `${position.y}%`,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={word.translation}
    >
      {!discovered && (
        <Animated.View
          style={[
            styles.pulseRing,
            {
              borderColor: accentColor,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
            },
          ]}
        />
      )}
      <View
        style={[
          styles.hotspotBubble,
          discovered && styles.hotspotDiscovered,
          active && { borderColor: accentColor, backgroundColor: `${accentColor}33` },
        ]}
      >
        <Text style={styles.hotspotEmoji}>{word.emoji}</Text>
      </View>
      {discovered && <Text style={styles.checkMark}>✓</Text>}
    </Pressable>
  );
}

export function ExplorationArena({
  environment,
  words,
  discoveredIds,
  activeWordId,
  onWordPress,
}: ExplorationArenaProps) {
  const { width } = useWindowDimensions();
  const sceneHeight = Math.min(420, Math.max(320, width * 0.85));

  return (
    <View style={[styles.wrap, { height: sceneHeight }]}>
      <View style={[styles.sky, { backgroundColor: environment.skyColor }]} />
      <View style={[styles.ground, { backgroundColor: environment.groundColor }]} />

      {environment.decor.map((item, index) => (
        <Text
          key={`${item.emoji}-${index}`}
          style={[
            styles.decor,
            {
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.size ?? 24,
            },
          ]}
        >
          {item.emoji}
        </Text>
      ))}

      <View style={styles.horizon} />

      {words.map((word) => (
        <Hotspot
          key={word.id}
          word={word}
          discovered={discoveredIds.has(word.id)}
          active={activeWordId === word.id}
          accentColor={environment.accentColor}
          onPress={() => onWordPress(word)}
        />
      ))}

      <View style={styles.sceneLabel}>
        <Text style={styles.sceneEmoji}>{environment.emoji}</Text>
        <Text style={styles.sceneTitle}>{environment.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    position: 'relative',
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '58%',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '45%',
  },
  horizon: {
    position: 'absolute',
    top: '54%',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  decor: {
    position: 'absolute',
    opacity: 0.85,
  },
  hotspot: {
    position: 'absolute',
    width: 76,
    height: 76,
    marginLeft: -38,
    marginTop: -38,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  pulseRing: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
  },
  hotspotBubble: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  hotspotDiscovered: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    opacity: 0.95,
  },
  hotspotEmoji: {
    fontSize: 34,
  },
  checkMark: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.success,
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
    overflow: 'hidden',
  },
  sceneLabel: {
    position: 'absolute',
    top: 10,
    right: 12,
    alignItems: 'flex-end',
    opacity: 0.9,
  },
  sceneEmoji: {
    fontSize: 22,
  },
  sceneTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
    marginTop: 2,
  },
});
