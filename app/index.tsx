import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AgeGroupCard } from '@/components/AgeGroupCard';
import { BigButton } from '@/components/BigButton';
import { AGE_GROUPS, COLORS } from '@/constants';
import { AgeGroupId } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState<AgeGroupId>('3-4');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.mascot}>🦉</Text>
        <Text style={styles.title}>Olá, pequeno explorador!</Text>
        <Text style={styles.subtitle}>Escolhe a tua idade para começar</Text>
      </View>

      <View style={styles.section}>
        {AGE_GROUPS.map((group) => (
          <AgeGroupCard
            key={group.id}
            group={group}
            selected={selectedAge === group.id}
            onPress={() => setSelectedAge(group.id)}
          />
        ))}
      </View>

      <BigButton
        label="Começar!"
        emoji="🚀"
        onPress={() => router.push(`/lessons/${selectedAge}`)}
        style={styles.startButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  mascot: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  startButton: {
    alignSelf: 'center',
  },
});
