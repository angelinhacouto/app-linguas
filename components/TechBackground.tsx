import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants';

/** Fundo cinematográfico tipo HQ de heróis — grade tech + brilhos */
export function TechBackground({ children }: { children: React.ReactNode }) {
  const pulse = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.55, duration: 2800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.3, duration: 2800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.vignetteTop} />
      <View style={styles.vignetteBottom} />

      <Animated.View style={[styles.glowCyan, { opacity: pulse }]} />
      <View style={styles.glowRed} />

      {/* Grade tecnológica */}
      {Platform.OS === 'web' ? (
        <View
          pointerEvents="none"
          // Grade tech só na web
          style={[
            styles.gridOverlay,
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...( {
                backgroundImage:
                  'linear-gradient(rgba(0,229,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.045) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              } as any),
            },
          ]}
        />
      ) : (
        <>
          <View style={styles.gridLineH1} />
          <View style={styles.gridLineH2} />
          <View style={styles.gridLineV1} />
          <View style={styles.gridLineV2} />
        </>
      )}

      <View style={styles.scanLine} pointerEvents="none" />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  vignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 0,
  },
  vignetteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 0,
  },
  glowCyan: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: COLORS.primary,
    opacity: 0.12,
    zIndex: 0,
  },
  glowRed: {
    position: 'absolute',
    bottom: -90,
    left: -70,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.secondary,
    opacity: 0.1,
    zIndex: 0,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  gridLineH1: {
    position: 'absolute',
    top: '22%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.primary,
    opacity: 0.12,
  },
  gridLineH2: {
    position: 'absolute',
    top: '58%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
  },
  gridLineV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '18%',
    width: 1,
    backgroundColor: COLORS.primary,
    opacity: 0.06,
  },
  gridLineV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: '22%',
    width: 1,
    backgroundColor: COLORS.secondary,
    opacity: 0.06,
  },
  scanLine: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0,229,255,0.03)',
    zIndex: 1,
  },
});
