import { useEffect, useRef, useState } from 'react';
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
  const [entered, setEntered] = useState(false);
  const selectedHero = SUPER_HEROES.find((h) => h.id === selectedHeroId);

  const handleEnter = async () => {
    await onPlayMusic?.();
    setEntered(true);
  };

  if (!entered) {
    return (
      <View style={styles.enterWrap}>
        <View style={styles.enterHeroes}>
          {SUPER_HEROES.map((hero) => (
            <View key={hero.id} style={[styles.enterDot, { borderColor: hero.accent }]}>
              <Text style={styles.enterSymbol}>{hero.symbol}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.enterTitle}>Super-Heróis reunidos!</Text>
        <Text style={styles.enterSub}>
          Toque para ouvir a trilha épica e escolher seu mentor!
        </Text>
        <TechButton
          label="Entrar na missão"
          emoji="🎵"
          onPress={handleEnter}
          style={styles.enterBtn}
        />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.heroBanner}>
        <Text style={styles.headline}>Escolha seu mentor!</Text>
        <Text style={styles.subhead}>
          Toque no herói para ouvi-lo e selecioná-lo para a missão.
        </Text>
        {onPlayMusic && (
          <TechButton
            label={musicPlaying ? '🎵 Trilha tocando...' : 'Ouvir trilha épica de novo'}
            emoji="🎵"
            variant="secondary"
            onPress={() => onPlayMusic()}
            style={styles.musicBtn}
          />
        )}
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

      {selectedHero && (
        <View style={[styles.missionBox, { borderColor: selectedHero.accent }]}>
          <Text style={styles.missionEmoji}>🚀</Text>
          <Text style={styles.missionTitle}>Iniciar missão com {selectedHero.name}</Text>
          <Text style={styles.missionSub}>{selectedHero.title}</Text>
        </View>
      )}

      <TechButton
        label="Iniciar missão!"
        emoji="🚀"
        onPress={onStart}
        style={styles.startBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  enterWrap: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  enterHeroes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
    maxWidth: 320,
  },
  enterDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterSymbol: {
    fontSize: 20,
  },
  enterTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  enterSub: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  enterBtn: {
    minWidth: 260,
  },
  wrap: {
    width: '100%',
  },
  heroBanner: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  subhead: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  musicBtn: {
    marginTop: 12,
    minWidth: 240,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  missionBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    width: '100%',
  },
  missionEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  missionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  missionSub: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  startBtn: {
    alignSelf: 'center',
    minWidth: 240,
  },
});
