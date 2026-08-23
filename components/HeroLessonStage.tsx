import { StyleSheet, Text, View } from 'react-native';
import { HeroAvatar, HeroMood } from '@/components/HeroAvatar';
import { COLORS } from '@/constants';
import { SuperHero } from '@/constants/heroes';
import { Word } from '@/types';

export type LessonPhase = 'hero_speaking' | 'your_turn' | 'listening' | 'feedback';

interface HeroLessonStageProps {
  hero: SuperHero;
  word: Word;
  phase: LessonPhase;
  heroLine: string;
  mood: HeroMood;
  onHeroPress: () => void;
}

const PHASE_LABELS: Record<LessonPhase, string> = {
  hero_speaking: '🦸 Herói falando...',
  your_turn: '🎤 Sua vez! Repete com o herói',
  listening: '👂 Herói ouvindo você...',
  feedback: '💬 Resposta do herói',
};

export function HeroLessonStage({
  hero,
  word,
  phase,
  heroLine,
  mood,
  onHeroPress,
}: HeroLessonStageProps) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.heroPanel, { borderColor: hero.accent }]}>
        <HeroAvatar
          heroId={hero.id}
          size="xl"
          selected
          interactive
          mood={mood}
          onPress={onHeroPress}
        />
        <View style={styles.heroMeta}>
          <Text style={[styles.heroName, { color: hero.accent }]}>{hero.name}</Text>
          <Text style={styles.phaseLabel}>{PHASE_LABELS[phase]}</Text>
        </View>
      </View>

      <View style={[styles.bubble, { borderColor: hero.accent }]}>
        <Text style={styles.bubbleText}>{heroLine}</Text>
      </View>

      <View style={styles.objectCard}>
        <Text style={styles.objectEmoji}>{word.emoji}</Text>
        <Text style={styles.objectWord}>{word.text}</Text>
        <Text style={styles.objectTranslation}>{word.translation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    width: '100%',
  },
  heroMeta: {
    flex: 1,
  },
  heroName: {
    fontSize: 20,
    fontWeight: '900',
  },
  phaseLabel: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 6,
    fontWeight: '700',
  },
  bubble: {
    marginTop: 14,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    width: '100%',
    minHeight: 72,
    justifyContent: 'center',
  },
  bubbleText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: '600',
  },
  objectCard: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  objectEmoji: {
    fontSize: 88,
    marginBottom: 8,
  },
  objectWord: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  objectTranslation: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
