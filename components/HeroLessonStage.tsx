import { StyleSheet, Text, View } from 'react-native';
import { HeroAvatar, HeroMood } from '@/components/HeroAvatar';
import { HeroPowerEffects } from '@/components/HeroPowerEffects';
import { LessonCardArena } from '@/components/LessonCardArena';
import { COLORS } from '@/constants';
import { HeroReactionTier } from '@/constants/heroReactions';
import { SuperHero } from '@/constants/heroes';
import { Word } from '@/types';

export type LessonPhase =
  | 'presenting'
  | 'hero_speaking'
  | 'your_turn'
  | 'listening'
  | 'feedback';

interface HeroLessonStageProps {
  hero: SuperHero;
  word: Word;
  phase: LessonPhase;
  heroLine: string;
  mood: HeroMood;
  reactionTier?: HeroReactionTier | null;
  showEffects?: boolean;
  onHeroPress: () => void;
}

const PHASE_LABELS: Record<LessonPhase, string> = {
  presenting: '🃏 Herói revela o cartão...',
  hero_speaking: '🦸 Herói apresenta e fala a palavra',
  your_turn: '🎤 Sua vez! Ligue o áudio e repita',
  listening: '👂 Herói ouvindo sua pronúncia...',
  feedback: '💬 Análise do herói',
};

export function HeroLessonStage({
  hero,
  word,
  phase,
  heroLine,
  mood,
  reactionTier,
  showEffects,
  onHeroPress,
}: HeroLessonStageProps) {
  const cardRevealed = phase !== 'presenting';
  const cardHighlighted = phase === 'hero_speaking' || phase === 'your_turn';

  return (
    <View style={styles.wrap}>
      <LessonCardArena
        word={word}
        revealed={cardRevealed}
        highlighted={cardHighlighted}
        accentColor={hero.accent}
      />

      <View style={[styles.heroPanel, { borderColor: hero.accent }]}>
        <View style={styles.avatarWrap}>
          <HeroPowerEffects
            heroId={hero.id}
            tier={reactionTier ?? 'practice'}
            active={!!showEffects && !!reactionTier}
          />
          <HeroAvatar
            heroId={hero.id}
            size="xl"
            selected
            interactive
            mood={mood}
            onPress={onHeroPress}
          />
        </View>
        <View style={styles.heroMeta}>
          <Text style={[styles.heroName, { color: hero.accent }]}>{hero.name}</Text>
          <Text style={styles.phaseLabel}>{PHASE_LABELS[phase]}</Text>
        </View>
      </View>

      <View style={[styles.bubble, { borderColor: hero.accent }]}>
        <Text style={styles.bubbleText}>{heroLine}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
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
    marginTop: 4,
  },
  avatarWrap: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
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
    lineHeight: 18,
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
});
