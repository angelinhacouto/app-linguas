import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { LanguageOption } from '@/constants/languages';

interface LanguageCardProps {
  language: LanguageOption;
  selected: boolean;
  onPress: () => void;
}

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.flag}>{language.flag}</Text>
      <View style={styles.info}>
        <Text style={styles.label}>{language.label}</Text>
        <Text style={styles.native}>{language.nativeLabel}</Text>
      </View>
      {selected && <Text style={styles.check}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  selected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.backgroundLight,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  flag: {
    fontSize: 32,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  native: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  check: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '800',
  },
});
