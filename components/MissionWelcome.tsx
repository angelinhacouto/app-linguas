import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeroSelectCard } from '@/components/HeroSelectCard';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import { HeroId, SUPER_HEROES } from '@/constants/heroes';

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
  const selectedHero = SUPER_HEROES.find((h) => h.id === selectedHeroId);

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
        <Text style={styles.gateEmoji}>🦸‍♂️🦸‍♀️</Text>
        <Text style={styles.gateTitle}>Super-Heróis reunidos!</Text>
        <Text style={styles.gateSub}>
          Toque no botão abaixo para ouvir a trilha épica e começar.
        </Text>
        <TechButton
          label="Tocar música e entrar"
          emoji="🎵"
          onPress={handleEnter}
          style={styles.gateBtn}
        />
        {musicError ? (
          <Text style={styles.warn}>Ative o som do dispositivo e tente de novo.</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.banner}>
        <Text style={styles.headline}>Escolha seu mentor</Text>
        <Text style={styles.subhead}>Toque no herói para ouvi-lo</Text>
        <TechButton
          label={musicPlaying ? 'Trilha tocando…' : 'Tocar trilha épica'}
          emoji="🎵"
          variant="secondary"
          onPress={playMusic}
          style={styles.musicBtn}
        />
        {musicError ? (
          <Text style={styles.warn}>Não deu para tocar. Verifique o volume.</Text>
        ) : null}
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

      {selectedHero ? (
        <View style={[styles.missionBox, { borderColor: selectedHero.accent }]}>
          <Text style={styles.missionTitle}>Missão com {selectedHero.name}</Text>
          <Text style={styles.missionSub}>{selectedHero.title}</Text>
        </View>
      ) : null}

      <TechButton label="Continuar" emoji="🚀" onPress={onStart} style={styles.startBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  gate: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  gateEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  gateTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  gateSub: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  gateBtn: {
    minWidth: 280,
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
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
  },
  subhead: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 10,
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
    marginBottom: 14,
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  missionSub: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  startBtn: {
    alignSelf: 'center',
    minWidth: 240,
  },
});
