import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRef, useState, type GestureResponderEvent } from 'react';
import { COLORS } from '@/constants';
import { RoomHotspot } from '@/services/customRoomStorage';
import { Word } from '@/types';
import { pressToPercent } from '@/utils/pressToPercent';

interface CustomRoomPhotoExplorerProps {
  photoUri: string;
  words: Word[];
  hotspots: Record<string, RoomHotspot>;
  discoveredIds: Set<string>;
  practicedIds: Set<string>;
  activeWordId?: string | null;
  accentColor: string;
  setupMode: boolean;
  setupWord: Word | null;
  setupWordIndex: number;
  placedCount: number;
  onPhotoPress: (x: number, y: number) => void;
  onObjectSelect: (word: Word) => void;
}

export function CustomRoomPhotoExplorer({
  photoUri,
  words,
  hotspots,
  discoveredIds,
  practicedIds,
  activeWordId,
  accentColor,
  setupMode,
  setupWord,
  setupWordIndex,
  placedCount,
  onPhotoPress,
  onObjectSelect,
}: CustomRoomPhotoExplorerProps) {
  const frameRef = useRef<View>(null);
  const [frameLayout, setFrameLayout] = useState({ width: 0, height: 0 });

  const handleFramePress = (e: GestureResponderEvent) => {
    const pos = pressToPercent(e, frameLayout, frameRef.current);
    if (!pos) return;
    if (setupMode) {
      onPhotoPress(pos.x, pos.y);
      return;
    }
    const tapped = findWordAtPoint(pos.x, pos.y, words, hotspots);
    if (tapped) onObjectSelect(tapped);
  };

  return (
    <View style={styles.wrap}>
      {setupMode && setupWord ? (
        <View style={[styles.setupBanner, { borderColor: accentColor }]}>
          <Text style={styles.setupTitle}>
            Coloque o objeto {setupWordIndex + 1}/{words.length}
          </Text>
          <Text style={styles.setupSub}>
            Toque na foto onde está: {setupWord.emoji} {setupWord.translation} →{' '}
            <Text style={{ color: accentColor }}>{setupWord.text}</Text>
          </Text>
        </View>
      ) : (
        <View style={styles.setupBannerDone}>
          <Text style={styles.setupDoneText}>
            {placedCount}/{words.length} objetos no seu quarto · toque para aprender
          </Text>
        </View>
      )}

      <Pressable
        ref={frameRef}
        onLayout={(e) => setFrameLayout(e.nativeEvent.layout)}
        onPress={handleFramePress}
        style={styles.photoFrame}
      >
        <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
        <View style={styles.overlay} pointerEvents="none">
          {words.map((word) => {
            const spot = hotspots[word.id];
            if (!spot) return null;
            const discovered = discoveredIds.has(word.id);
            const practiced = practicedIds.has(word.id);
            const active = activeWordId === word.id;
            const border = practiced
              ? COLORS.success
              : active
                ? accentColor
                : discovered
                  ? accentColor
                  : COLORS.cardBorder;
            return (
              <View
                key={word.id}
                style={[
                  styles.pin,
                  {
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    borderColor: border,
                    backgroundColor: practiced ? 'rgba(13,51,32,0.92)' : 'rgba(5,7,15,0.88)',
                  },
                  active && styles.pinActive,
                ]}
              >
                <Text style={styles.pinEmoji}>{word.emoji}</Text>
                <Text style={[styles.pinLabel, practiced && { color: COLORS.success }]}>
                  {setupMode || discovered || practiced ? word.text : '???'}
                </Text>
              </View>
            );
          })}
        </View>
        {setupMode ? (
          <View style={styles.tapHint} pointerEvents="none">
            <Text style={styles.tapHintText}>👆 Toque na foto</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

function findWordAtPoint(
  x: number,
  y: number,
  words: Word[],
  hotspots: Record<string, RoomHotspot>
): Word | null {
  let best: { word: Word; dist: number } | null = null;
  for (const word of words) {
    const spot = hotspots[word.id];
    if (!spot) continue;
    const dist = Math.hypot(spot.x - x, spot.y - y);
    if (dist <= 14 && (!best || dist < best.dist)) {
      best = { word, dist };
    }
  }
  return best?.word ?? null;
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  setupBanner: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
  },
  setupTitle: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  setupSub: {
    color: COLORS.text,
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  setupBannerDone: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  setupDoneText: {
    color: COLORS.textLight,
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  photoFrame: {
    width: '100%',
    height: 420,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    position: 'absolute',
    transform: [{ translateX: -48 }, { translateY: -36 }],
    minWidth: 96,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  pinActive: {
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  pinEmoji: {
    fontSize: 22,
  },
  pinLabel: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
    marginTop: 2,
  },
  tapHint: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    left: '25%',
    right: '25%',
    backgroundColor: 'rgba(5,7,15,0.75)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tapHintText: {
    color: COLORS.primary,
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 13,
  },
});
