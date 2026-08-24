import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrandMark } from '@/components/BrandMark';
import { HeroSelectCard } from '@/components/HeroSelectCard';
import { TechButton } from '@/components/TechButton';
import { COLORS, FONTS } from '@/constants';
import { HeroId, SUPER_HEROES, getSuperHero } from '@/constants/heroes';

interface MissionWelcomeProps {
  selectedHeroId: HeroId;
  onSelectHero: (id: HeroId) => void;
  onStart: () => void;
  onPlayMusic?: () => Promise<boolean> | boolean;
  musicPlaying?: boolean;
}

export function MissionWelcome({
  selectedHeroId,
  onSelectHero,
  onStart,
  onPlayMusic,
  musicPlaying,
}: MissionWelcomeProps) {
  const [phase, setPhase] = useState<'gate' | 'pick'>('gate');
  const [musicError, setMusicError] = useState(false);
  const selectedHero = getSuperHero(selectedHeroId);

  const playMusic = async () => {
    setMusicError(false);
    const ok = await onPlayMusic?.();
    if (!ok) setMusicError(true);
    return !!ok;
  };

  const handleEnter = async () => {
    await playMusic();
    setPhase('pick');
  };

  if (phase === 'gate') {
    return (
      <View style={styles.gate}>
        <View style={styles.heroPanel}>
          <View style={styles.heroGlow} />
          <Text style={styles.heroPanelKicker}>NOVA MISSÃO DISPONÍVEL</Text>
          <Text style={styles.heroPanelTitle}>Aprenda inglês{'\n'}como um herói</Text>
          <Text style={styles.heroPanelSub}>
            Entre no HQ, escolha seu mentor e comece a explorar mundos cheios de palavras.
          </Text>
          <TechButton
            label="Entrar no HQ"
            emoji="🚀"
            onPress={handleEnter}
            style={styles.gateBtn}
          />
          {musicError ? (
            <Text style={styles.warn}>Ative o som do aparelho e tente de novo.</Text>
          ) : (
            <Text style={styles.musicHint}>🎵 A trilha épica toca ao entrar</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.banner}>
        <Text style={styles.kicker}>ESCOLHA SEU MENTOR</Text>
        <Text style={styles.headline}>Quem vai te treinar?</Text>
        <Text style={styles.subhead}>Toque no herói para ouvir a saudação</Text>
        <TechButton
          label={musicPlaying ? 'Trilha tocando…' : 'Ouvir trilha de novo'}
          emoji="🎵"
          variant="secondary"
          onPress={playMusic}
          style={styles.musicBtn}
        />
      </View>

      <View style={styles.grid}>
        {SUPER_HEROES.map((hero) => (
          <HeroSelectCard
            key={hero.id}
            hero={hero}
            selected={selectedHeroId === hero.id}
            onPress={() => onSelectHero(hero.id)}
          />
        ))}
      </View>

      <View style={[styles.missionBox, { borderColor: selectedHero.accent }]}>
        <Text style={styles.missionKicker}>MENTOR SELECIONADO</Text>
        <Text style={styles.missionTitle}>{selectedHero.name}</Text>
        <Text style={styles.missionSub}>{selectedHero.title}</Text>
      </View>

      <TechButton label="Continuar missão" emoji="⚡" onPress={onStart} style={styles.startBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  gate: {
    width: '100%',
  },
  heroPanel: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
    paddingVertical: 36,
    paddingHorizontal: 22,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.secondary,
    opacity: 0.18,
  },
  heroPanelKicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
    marginBottom: 12,
  },
  heroPanelTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 36,
    fontFamily: FONTS.display,
    marginBottom: 12,
  },
  heroPanelSub: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 4,
    fontFamily: FONTS.body,
  },
  gateBtn: {
    minWidth: 260,
  },
  musicHint: {
    marginTop: 14,
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  warn: {
    marginTop: 12,
    color: COLORS.warning,
    fontSize: 13,
    textAlign: 'center',
  },
  wrap: {
    width: '100%',
  },
  banner: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.secondary,
    fontFamily: FONTS.display,
    marginBottom: 8,
  },
  headline: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    fontFamily: FONTS.display,
    marginBottom: 6,
  },
  subhead: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
    fontFamily: FONTS.body,
  },
  musicBtn: {
    minWidth: 220,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  missionBox: {
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  missionKicker: {
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.primary,
    fontFamily: FONTS.display,
    fontWeight: '800',
    marginBottom: 6,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    fontFamily: FONTS.display,
  },
  missionSub: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  startBtn: {
    alignSelf: 'center',
    minWidth: 260,
  },
});
