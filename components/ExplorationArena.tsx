import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { EnvironmentMeta, Word } from '@/types';

interface ExplorationArenaProps {
  environment: EnvironmentMeta;
  words: Word[];
  discoveredIds: Set<string>;
  practicedIds?: Set<string>;
  activeWordId?: string | null;
  onWordPress: (word: Word) => void;
}

const ROOM_SCENES: Record<
  string,
  { wall: string; floor: string; accent: string; furniture: string }
> = {
  bedroom: {
    wall: '#3D4F8F',
    floor: '#5D4037',
    accent: '#90CAF9',
    furniture: '#6D4C41',
  },
  kitchen: {
    wall: '#FFF3E0',
    floor: '#A1887F',
    accent: '#FFB74D',
    furniture: '#ECEFF1',
  },
  'living-room': {
    wall: '#4A148C',
    floor: '#5D4037',
    accent: '#CE93D8',
    furniture: '#6A1B9A',
  },
  bathroom: {
    wall: '#E3F2FD',
    floor: '#90CAF9',
    accent: '#81D4FA',
    furniture: '#BBDEFB',
  },
  forest: {
    wall: '#81C784',
    floor: '#33691E',
    accent: '#A5D6A7',
    furniture: '#2E7D32',
  },
  beach: {
    wall: '#4FC3F7',
    floor: '#FFE082',
    accent: '#29B6F6',
    furniture: '#FFF59D',
  },
  playground: {
    wall: '#81D4FA',
    floor: '#8BC34A',
    accent: '#FFD54F',
    furniture: '#66BB6A',
  },
  farm: {
    wall: '#81D4FA',
    floor: '#A1887F',
    accent: '#FFB74D',
    furniture: '#8D6E63',
  },
};

function ObjectTile({
  word,
  discovered,
  practiced,
  active,
  accentColor,
  onPress,
}: {
  word: Word;
  discovered: boolean;
  practiced: boolean;
  active: boolean;
  accentColor: string;
  onPress: () => void;
}) {
  const bounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!discovered) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(bounce, { toValue: 1.05, duration: 700, useNativeDriver: true }),
          Animated.timing(bounce, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    }
    bounce.setValue(1);
  }, [discovered, bounce]);

  const borderColor = practiced
    ? COLORS.success
    : active || discovered
      ? accentColor
      : COLORS.cardBorder;

  return (
    <Animated.View style={[styles.tileWrap, { transform: [{ scale: bounce }] }]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.tile,
          {
            borderColor,
            backgroundColor: practiced ? '#0D3320' : discovered ? COLORS.card : COLORS.backgroundLight,
          },
          pressed && styles.tilePressed,
        ]}
      >
        <Text style={styles.tileEmoji}>{word.emoji}</Text>
        <Text
          style={[styles.tileLabel, (discovered || practiced) && { color: practiced ? COLORS.success : accentColor }]}
          numberOfLines={1}
        >
          {discovered || practiced ? word.text : '???'}
        </Text>
        <Text style={styles.tileHint} numberOfLines={1}>
          {word.translation}
        </Text>
        {practiced ? (
          <View style={[styles.foundBadge, { backgroundColor: COLORS.success }]}>
            <Text style={styles.foundText}>✓</Text>
          </View>
        ) : discovered ? (
          <Text style={styles.tapHint}>Repete no mic</Text>
        ) : (
          <Text style={styles.tapHint}>Toca aqui</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

function RoomBackdrop({ environment }: { environment: EnvironmentMeta }) {
  const scene = ROOM_SCENES[environment.id] ?? ROOM_SCENES.bedroom;

  return (
    <View style={[styles.room, { backgroundColor: scene.wall }]}>
      {/* janela / céu */}
      <View style={[styles.window, { borderColor: scene.accent }]}>
        <View style={[styles.windowPane, { backgroundColor: scene.accent }]} />
        <Text style={styles.windowEmoji}>
          {environment.group === 'nature' ? '☀️' : '🌙'}
        </Text>
      </View>

      {/* tapete / chão */}
      <View style={[styles.floor, { backgroundColor: scene.floor }]}>
        <View style={[styles.rug, { backgroundColor: scene.accent + '55' }]} />
      </View>

      {/* móvel simples */}
      <View style={[styles.furniture, { backgroundColor: scene.furniture }]} />

      <View style={styles.roomTitleWrap}>
        <Text style={styles.roomEmoji}>{environment.emoji}</Text>
        <Text
          style={[
            styles.roomTitle,
            environment.group === 'house' &&
              ['kitchen', 'bathroom'].includes(environment.id) && { color: '#1A2347' },
          ]}
        >
          {environment.title}
        </Text>
      </View>

      <Text
        style={[
          styles.roomHint,
          environment.group === 'house' &&
            ['kitchen', 'bathroom'].includes(environment.id) && { color: '#37474F' },
        ]}
      >
        Toque · ouça o inglês · repita no mic
      </Text>
    </View>
  );
}

export function ExplorationArena({
  environment,
  words,
  discoveredIds,
  practicedIds,
  activeWordId,
  onWordPress,
}: ExplorationArenaProps) {
  const practiced = practicedIds?.size ?? 0;
  const total = words.length;
  const progress = total > 0 ? practiced / total : 0;

  return (
    <View style={styles.wrap}>
      <RoomBackdrop environment={environment} />

      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.max(progress * 100, 4)}%`,
                backgroundColor: environment.accentColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {practiced} de {total} praticados · {discoveredIds.size} descobertos
        </Text>
      </View>

      <View style={styles.grid}>
        {words.map((word) => (
          <ObjectTile
            key={word.id}
            word={word}
            discovered={discoveredIds.has(word.id)}
            practiced={practicedIds?.has(word.id) ?? false}
            active={activeWordId === word.id}
            accentColor={environment.accentColor}
            onPress={() => onWordPress(word)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  room: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    marginBottom: 14,
    position: 'relative',
  },
  window: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  windowPane: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.35,
  },
  windowEmoji: {
    fontSize: 28,
  },
  floor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
  },
  rug: {
    position: 'absolute',
    alignSelf: 'center',
    left: '20%',
    right: '20%',
    bottom: 10,
    height: 28,
    borderRadius: 14,
  },
  furniture: {
    position: 'absolute',
    left: 16,
    bottom: 48,
    width: 70,
    height: 36,
    borderRadius: 8,
    opacity: 0.85,
  },
  roomTitleWrap: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomEmoji: {
    fontSize: 28,
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  roomHint: {
    position: 'absolute',
    left: 16,
    bottom: 62,
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  progressWrap: {
    marginBottom: 12,
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.backgroundLight,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tileWrap: {
    width: '48%',
    marginBottom: 12,
  },
  tile: {
    borderRadius: 18,
    borderWidth: 3,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    minHeight: 140,
  },
  tilePressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  tileEmoji: {
    fontSize: 48,
    marginBottom: 6,
  },
  tileLabel: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
  },
  tileHint: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
    textAlign: 'center',
  },
  tapHint: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  foundBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foundText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 13,
  },
});
