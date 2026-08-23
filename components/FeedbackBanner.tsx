import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { PronunciationResult } from '@/types';

interface FeedbackBannerProps {
  result: PronunciationResult;
  message: string;
  encouragement: string;
  score?: number;
  heard?: string;
  target?: string;
}

const RESULT_CONFIG: Record<
  PronunciationResult,
  { emoji: string; color: string; bg: string }
> = {
  excellent: { emoji: '🦸', color: COLORS.success, bg: '#0D3320' },
  good: { emoji: '⚡', color: COLORS.warning, bg: '#3D3200' },
  try_again: { emoji: '💪', color: COLORS.secondary, bg: '#3D1020' },
};

export function FeedbackBanner({
  result,
  message,
  encouragement,
  score,
  heard,
  target,
}: FeedbackBannerProps) {
  const config = RESULT_CONFIG[result];

  return (
    <View style={[styles.banner, { backgroundColor: config.bg }]}>
      <Text style={styles.emoji}>{config.emoji}</Text>
      <Text style={[styles.message, { color: config.color }]}>{message}</Text>
      {score !== undefined && (
        <Text style={styles.score}>Precisão: {score}%</Text>
      )}
      {heard && target && (
        <Text style={styles.heard}>
          Você: "{heard}" → Palavra: "{target}"
        </Text>
      )}
      <Text style={styles.encouragement}>{encouragement}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginVertical: 16,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  message: {
    fontSize: 28,
    fontWeight: '800',
  },
  score: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 6,
  },
  heard: {
    fontSize: 15,
    color: COLORS.text,
    marginTop: 8,
    textAlign: 'center',
  },
  encouragement: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
});
