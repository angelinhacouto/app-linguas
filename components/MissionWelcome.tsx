import { StyleSheet, Text, View } from 'react-native';
import { HeroAvatar } from '@/components/HeroAvatar';
import { HeroSelectCard } from '@/components/HeroSelectCard';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';
import { HeroId, SUPER_HEROES } from '@/constants/heroes';

interface MissionWelcomeProps {
  selectedHeroId: HeroId;
  onSelectHero: (id: HeroId) => void;
  onStart: () => void;
}

export function MissionWelcome({ selectedHeroId, onSelectHero, onStart }: MissionWelcomeProps) {
  const selectedHero = SUPER_HEROES.find((h) => h.id === selectedHeroId);

  return (
    <View style={styles.wrap}>
      <View style={styles.heroLineup}>
        {SUPER_HEROES.map((hero) => (
          <View
            key={hero.id}
            style={[
              styles.lineupAvatar,
              selectedHeroId === hero.id && { borderColor: hero.accent },
            ]}
          >
            <HeroAvatar heroId={hero.id} size="sm" selected={selectedHeroId === hero.id} />
          </View>
        ))}
      </View>

      <Text style={styles.headline}>Super-Heróis reunidos!</Text>
      <Text style={styles.subhead}>
        Uma nova missão de idiomas começa agora. Escolha seu mentor e partiu!
      </Text>

      <View style={styles.heroGrid}>
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
  heroLineup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  lineupAvatar: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 2,
  },
  headline: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subhead: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  heroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  missionBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  missionEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  missionTitle: {
    fontSize: 18,
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
