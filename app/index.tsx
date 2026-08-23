import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { HeroAgeCard } from '@/components/HeroAgeCard';
import { HeroSelectCard } from '@/components/HeroSelectCard';
import { LanguageCard } from '@/components/LanguageCard';
import { StepIndicator } from '@/components/StepIndicator';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { TechInput } from '@/components/TechInput';
import { APP_NAME, COLORS, STUDENT_AGES } from '@/constants';
import { HeroId, SUPER_HEROES } from '@/constants/heroes';
import { LANGUAGES } from '@/constants/languages';
import { AgeGroupId, LanguageId } from '@/types';

type Step = 1 | 2 | 3 | 4;

export default function HomeScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedAge, setSelectedAge] = useState<number>(4);
  const [ageGroupId, setAgeGroupId] = useState<AgeGroupId>('3-4');
  const [studentName, setStudentName] = useState('');
  const [heroId, setHeroId] = useState<HeroId>('spider-man');
  const [language, setLanguage] = useState<LanguageId>('en');

  const handleAgeSelect = (age: number, groupId: AgeGroupId) => {
    setSelectedAge(age);
    setAgeGroupId(groupId);
  };

  const goToLearn = () => {
    const name = studentName.trim();
    if (!name) return;
    router.push({
      pathname: '/learn',
      params: {
        name,
        age: String(selectedAge),
        ageGroup: ageGroupId,
        language,
        hero: heroId,
      },
    });
  };

  return (
    <TechBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.logoWrap}>
            <Text style={styles.logoText}>{APP_NAME}</Text>
            <Text style={styles.tagline}>Academia de Línguas dos Super-Heróis</Text>
          </View>

          <StepIndicator current={step} />

          {step === 1 && (
            <View>
              <Text style={styles.title}>Qual a idade do herói?</Text>
              <Text style={styles.subtitle}>Escolha a idade do aluno</Text>
              {STUDENT_AGES.map(({ age, ageGroupId: groupId }) => (
                <HeroAgeCard
                  key={age}
                  age={age}
                  ageGroupId={groupId}
                  selected={selectedAge === age}
                  onPress={() => handleAgeSelect(age, groupId)}
                />
              ))}
              <TechButton label="Continuar" emoji="➡️" onPress={() => setStep(2)} style={styles.button} />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.title}>Qual o nome do herói?</Text>
              <Text style={styles.subtitle}>Digite o nome do aluno</Text>
              <TechInput
                label="Nome do aluno"
                value={studentName}
                onChangeText={setStudentName}
                placeholder="Ex: Maria, João..."
              />
              <View style={styles.row}>
                <TechButton label="Voltar" variant="secondary" onPress={() => setStep(1)} style={styles.halfButton} />
                <TechButton
                  label="Continuar"
                  emoji="➡️"
                  onPress={() => setStep(3)}
                  disabled={studentName.trim().length < 2}
                  style={styles.halfButton}
                />
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.title}>Escolha seu super-herói!</Text>
              <Text style={styles.subtitle}>Seu mentor nas missões de idiomas</Text>
              <View style={styles.heroGrid}>
                {SUPER_HEROES.map((hero) => (
                  <HeroSelectCard
                    key={hero.id}
                    hero={hero}
                    selected={heroId === hero.id}
                    onPress={() => setHeroId(hero.id)}
                  />
                ))}
              </View>
              <View style={styles.row}>
                <TechButton label="Voltar" variant="secondary" onPress={() => setStep(2)} style={styles.halfButton} />
                <TechButton label="Continuar" emoji="➡️" onPress={() => setStep(4)} style={styles.halfButton} />
              </View>
            </View>
          )}

          {step === 4 && (
            <View>
              <Text style={styles.title}>Qual idioma aprender?</Text>
              <Text style={styles.subtitle}>Escolha a língua da missão</Text>
              {LANGUAGES.map((lang) => (
                <LanguageCard
                  key={lang.id}
                  language={lang}
                  selected={language === lang.id}
                  onPress={() => setLanguage(lang.id)}
                />
              ))}
              <View style={styles.row}>
                <TechButton label="Voltar" variant="secondary" onPress={() => setStep(3)} style={styles.halfButton} />
                <TechButton label="Iniciar missão!" emoji="🚀" onPress={goToLearn} style={styles.halfButton} />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TechBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, paddingBottom: 48 },
  logoWrap: { alignItems: 'center', marginBottom: 8, marginTop: 8 },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  tagline: { fontSize: 13, color: COLORS.textLight, marginTop: 6, textAlign: 'center' },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: { alignSelf: 'center', marginTop: 8 },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 8 },
  halfButton: { minWidth: 140, flex: 1 },
});
