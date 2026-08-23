import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { EnvironmentMeta } from '@/types';

interface EnvironmentCardProps {
  environment: EnvironmentMeta;
  wordCount: number;
  onPress: () => void;
}

export function EnvironmentCard({ environment, wordCount, onPress }: EnvironmentCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderColor: environment.accentColor },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${environment.accentColor}22` }]}>
        <Text style={styles.emoji}>{environment.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{environment.title}</Text>
        <Text style={styles.subtitle}>
          {environment.subtitle} · {wordCount} objetos
        </Text>
      </View>
      <Text style={[styles.arrow, { color: environment.accentColor }]}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 30,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  arrow: {
    fontSize: 18,
    fontWeight: '900',
  },
});
