import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '@/constants';

interface BigButtonProps {
  label: string;
  onPress: () => void;
  emoji?: string;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function BigButton({
  label,
  onPress,
  emoji,
  color = COLORS.primary,
  disabled = false,
  style,
}: BigButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  label: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
});
