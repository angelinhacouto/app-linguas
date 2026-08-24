import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface TechButtonProps {
  label: string;
  onPress: () => void;
  emoji?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

/** Botão de missão — CTA vermelho cinematográfico + secundário tech */
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
      <Text style={[styles.label, !isPrimary && styles.labelSecondary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    borderWidth: 2,
  },
  primary: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondaryDark,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
  secondary: {
    backgroundColor: 'rgba(0,229,255,0.06)',
    borderColor: COLORS.primary,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.4,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 2,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: FONTS.display,
  },
  labelSecondary: {
    color: COLORS.primary,
  },
});
