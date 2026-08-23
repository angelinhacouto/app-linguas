import { StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants';

export function TechBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.gridLine1} />
      <View style={styles.gridLine2} />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gridLine1: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.cardBorder,
    opacity: 0.4,
  },
  gridLine2: {
    position: 'absolute',
    top: '60%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.cardBorder,
    opacity: 0.3,
  },
  glowTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.secondary,
    opacity: 0.06,
  },
});
