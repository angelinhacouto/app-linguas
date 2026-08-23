import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '@/constants';

interface TechInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label: string;
}

export function TechInput({ value, onChangeText, placeholder, label }: TechInputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={24}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
});
