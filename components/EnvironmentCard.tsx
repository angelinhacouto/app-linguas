import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
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
      <View style={[styles.stripe, { backgroundColor: environment.accentColor }]} />
      <View style={[styles.iconWrap, { backgroundColor: `${environment.accentColor}22` }]}>
        <Text style={styles.emoji}>{environment.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.kicker}>ENTRAR NO SETOR</Text>
        <Text style={styles.title}>{environment.title}</Text>
        <Text style={styles.subtitle}>{wordCount} objetos para descobrir</Text>
      </View>
      <Text style={[styles.arrow, { color: environment.accentColor }]}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  stripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.94,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginLeft: 6,
  },
  emoji: {
    fontSize: 30,
  },
  info: {
    flex: 1,
  },
  kicker: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: COLORS.primary,
    fontFamily: FONTS.display,
    fontWeight: '800',
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    fontFamily: FONTS.display,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 3,
  },
  arrow: {
    fontSize: 18,
    fontWeight: '900',
    marginRight: 4,
  },
});
