import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AgeCard } from '@/components/AgeCard';
import { BrandMark } from '@/components/BrandMark';
import { LanguageCard } from '@/components/LanguageCard';
import { MissionWelcome } from '@/components/MissionWelcome';
import { StepIndicator } from '@/components/StepIndicator';
import { TechBackground } from '@/components/TechBackground';
import { TechButton } from '@/components/TechButton';
import { TechInput } from '@/components/TechInput';
import { COLORS, FONTS, STUDENT_AGES } from '@/constants';
import { HeroId } from '@/constants/heroes';
import { LANGUAGES } from '@/constants/languages';
import { playOpeningMusicOnInteraction, stopOpeningMusic, useOpeningMusic } from '@/hooks/useOpeningMusic';
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
  const [musicPlaying, setMusicPlaying] = useState(false);

  useOpeningMusic(step === 1);

  const handlePlayMusic = useCallback(async () => {
    const ok = await playOpeningMusicOnInteraction();
    if (ok) {
      setMusicPlaying(true);
      setTimeout(() => setMusicPlaying(false), 3000);
    }
    return ok;
  }, []);

  const handleHeroSelect = useCallback((id: HeroId) => {
    setHeroId(id);
  }, []);

  const handleStartMission = useCallback(() => {
    setStep(2);
  }, []);

  const handleAgeSelect = (age: number, groupId: AgeGroupId) => {
    setSelectedAge(age);
    setAgeGroupId(groupId);
  };

  const goToLearn = () => {
    const name = studentName.trim();
    if (!name) return;
    stopOpeningMusic();
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
          <BrandMark />
          <StepIndicator current={step} />

          {step === 1 && (
            <MissionWelcome
              selectedHeroId={heroId}
              onSelectHero={handleHeroSelect}
              onStart={handleStartMission}
              onPlayMusic={handlePlayMusic}
              musicPlaying={musicPlaying}
            />
          )}

          {step === 2 && (
            <View style={styles.panel}>
              <Text style={styles.kicker}>IDENTIDADE</Text>
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
                  onPress={() => setStep(3)}
                  disabled={studentName.trim().length < 2}
                  style={styles.halfButton}
                />
              </View>
            </View>
          )}

          {step === 3 && (
            <View style={styles.panel}>
              <Text style={styles.kicker}>NÍVEL</Text>
              <Text style={styles.title}>Qual a idade do aluno?</Text>
              <Text style={styles.subtitle}>Isso personaliza as missões</Text>
              {STUDENT_AGES.map(({ age, ageGroupId: groupId }) => (
                <AgeCard
                  key={age}
                  age={age}
                  ageGroupId={groupId}
                  selected={selectedAge === age}
                  onPress={() => handleAgeSelect(age, groupId)}
                />
              ))}
              <View style={styles.row}>
                <TechButton label="Voltar" variant="secondary" onPress={() => setStep(2)} style={styles.halfButton} />
                <TechButton label="Continuar" onPress={() => setStep(4)} style={styles.halfButton} />
              </View>
            </View>
          )}

          {step === 4 && (
            <View style={styles.panel}>
              <Text style={styles.kicker}>IDIOMA</Text>
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
                <TechButton label="Iniciar HQ" emoji="🚀" onPress={goToLearn} style={styles.halfButton} />
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
  container: { padding: 22, paddingBottom: 56 },
  panel: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    padding: 18,
  },
  kicker: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: FONTS.display,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 18,
    fontFamily: FONTS.body,
  },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 10 },
  halfButton: { minWidth: 120, flex: 1 },
});
