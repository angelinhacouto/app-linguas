import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import { AgeGroup } from '@/types';

interface AgeGroupCardProps {
  group: AgeGroup;
  onPress: () => void;
  selected?: boolean;
}

export function AgeGroupCard({ group, onPress, selected }: AgeGroupCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.emoji}>{group.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.label}>{group.label}</Text>
        <Text style={styles.description}>{group.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEEDFF',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  emoji: {
    fontSize: 44,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
