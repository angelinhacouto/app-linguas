import { StyleSheet, Text, View } from 'react-native';
import { HeroSelectCard } from '@/components/HeroSelectCard';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import { HeroId, SUPER_HEROES } from '@/constants/heroes';

interface MissionWelcomeProps {
  selectedHeroId: HeroId;
  onSelectHero: (id: HeroId) => void;
  onStart: () => void;
  onPlayMusic?: () => void;
  musicPlaying?: boolean;
}

export function MissionWelcome({
  selectedHeroId,
  onSelectHero,
  onStart,
  onPlayMusic,
  musicPlaying,
}: MissionWelcomeProps) {
  const selectedHero = SUPER_HEROES.find((h) => h.id === selectedHeroId);

  return (
    <View style={styles.wrap}>
      <View style={styles.heroBanner}>
        <Text style={styles.bannerEmoji}>🦸‍♂️🦸‍♀️</Text>
        <Text style={styles.headline}>Super-Heróis reunidos!</Text>
        <Text style={styles.subhead}>
          Escolha seu mentor e prepare-se para a missão de idiomas!
        </Text>
        {onPlayMusic && (
          <TechButton
            label={musicPlaying ? 'Trilha épica tocando' : 'Ouvir trilha épica'}
            emoji="🎵"
            variant="secondary"
            onPress={onPlayMusic}
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
  wrap: {
    width: '100%',
  },
  heroBanner: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  bannerEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  headline: {
    fontSize: 22,
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
    paddingHorizontal: 4,
  },
  musicBtn: {
    marginTop: 14,
    minWidth: 220,
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
