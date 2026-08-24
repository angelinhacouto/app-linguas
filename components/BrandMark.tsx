import { StyleSheet, Text, View } from 'react-native';
import { APP_NAME, COLORS, FONTS } from '@/constants';

interface BrandMarkProps {
  compact?: boolean;
  subtitle?: string;
}

/** Marca hero-level do HQ Língua Heroes */
export function BrandMark({
  compact = false,
  subtitle = 'Academia Tech de Idiomas',
}: BrandMarkProps) {
  return (
    <View style={[styles.wrap, compact && styles.compact]}>
      <View style={styles.badgeRow}>
        <View style={styles.redBar} />
        <Text style={styles.badge}>HQ ONLINE</Text>
        <View style={styles.redBar} />
      </View>
      <Text style={[styles.logo, compact && styles.logoCompact]}>{APP_NAME}</Text>
      {!compact ? <Text style={styles.tagline}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  compact: {
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  redBar: {
    width: 28,
    height: 3,
    backgroundColor: COLORS.secondary,
  },
  badge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
  },
  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 3,
    fontFamily: FONTS.display,
    textAlign: 'center',
  },
  logoCompact: {
    fontSize: 22,
    letterSpacing: 2,
  },
  tagline: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: FONTS.body,
    textAlign: 'center',
  },
});
