import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';

interface StepIndicatorProps {
  current: 1 | 2 | 3;
  total?: number;
}

const LABELS = ['Idade', 'Nome', 'Idioma'];

export function StepIndicator({ current, total = 3 }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const active = step === current;
        const done = step < current;
        return (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepItem}>
              <View style={[styles.dot, active && styles.dotActive, done && styles.dotDone]}>
                <Text style={styles.dotText}>{done ? '✓' : step}</Text>
              </View>
              <Text style={[styles.label, active && styles.labelActive]}>{LABELS[i]}</Text>
            </View>
            {step < total && <View style={[styles.line, done && styles.lineDone]} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 28,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
  },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.backgroundLight,
  },
  dotDone: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success,
  },
  dotText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  label: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 6,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  line: {
    width: 32,
    height: 2,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 6,
    marginTop: 17,
  },
  lineDone: {
    backgroundColor: COLORS.success,
  },
});
