import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '@/constants';

interface TechButtonProps {
  label: string;
  onPress: () => void;
  emoji?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export function TechButton({
  label,
  onPress,
  emoji,
  disabled = false,
  variant = 'primary',
  style,
}: TechButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={[styles.label, !isPrimary && styles.labelDark]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    borderWidth: 2,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: COLORS.cardBorder,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.4,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  label: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  labelDark: {
    color: COLORS.textLight,
  },
});
