import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';

interface StepIndicatorProps {
  current: 1 | 2 | 3 | 4;
  total?: number;
}

const LABELS = ['Missão', 'Nome', 'Idade', 'Idioma'];

export function StepIndicator({ current, total = 4 }: StepIndicatorProps) {
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
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
    width: 52,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
  },
  label: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  line: {
    width: 16,
    height: 2,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 2,
    marginTop: 15,
  },
  lineDone: {
    backgroundColor: COLORS.success,
  },
});
