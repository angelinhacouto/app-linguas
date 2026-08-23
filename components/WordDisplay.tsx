import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { Word } from '@/types';

interface WordDisplayProps {
  word: Word;
  onListen: () => void;
}

export function WordDisplay({ word, onListen }: WordDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{word.emoji}</Text>
      <Text style={styles.word}>{word.text}</Text>
      <Text style={styles.translation}>{word.translation}</Text>
      <Pressable onPress={onListen} style={({ pressed }) => [styles.listenBtn, pressed && styles.pressed]}>
        <Text style={styles.listenEmoji}>🔊</Text>
        <Text style={styles.listenText}>Escutar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emoji: {
    fontSize: 120,
    marginBottom: 16,
  },
  word: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  translation: {
    fontSize: 20,
    color: COLORS.textLight,
    marginTop: 8,
  },
  listenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  listenEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  listenText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
