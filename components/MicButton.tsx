import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';

interface MicButtonProps {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export function MicButton({ isRecording, onPress, disabled }: MicButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isRecording && styles.recording,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.emoji}>{isRecording ? '⏹️' : '🎤'}</Text>
      <Text style={styles.label}>
        {isRecording ? 'Parar' : 'Falar'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  recording: {
    backgroundColor: '#E53935',
    shadowColor: '#E53935',
  },
  pressed: {
    transform: [{ scale: 0.94 }],
  },
  disabled: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 48,
  },
  label: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
