import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { HeroId, SuperHero, getSuperHero } from '@/constants/heroes';

type AvatarSize = 'sm' | 'md' | 'lg';

interface HeroAvatarProps {
  heroId: HeroId | string;
  size?: AvatarSize;
  selected?: boolean;
  style?: ViewStyle;
}

const SIZES = { sm: 56, md: 80, lg: 104 };

export function HeroAvatar({ heroId, size = 'md', selected, style }: HeroAvatarProps) {
  const hero = getSuperHero(heroId);
  const dim = SIZES[size];

  return (
    <View
      style={[
        styles.wrap,
        { width: dim, height: dim, borderRadius: dim / 2 },
        selected && { borderColor: hero.accent, shadowColor: hero.accent },
        selected && styles.selected,
        style,
      ]}
    >
      <HeroAvatarFace hero={hero} size={size} />
    </View>
  );
}

function HeroAvatarFace({ hero, size }: { hero: SuperHero; size: AvatarSize }) {
  const symbolSize = size === 'lg' ? 36 : size === 'md' ? 28 : 22;

  switch (hero.id) {
    case 'ironman':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.ironMask, { borderColor: hero.secondary }]}>
            <View style={[styles.arcReactor, { backgroundColor: hero.accent }]} />
          </View>
        </View>
      );

    case 'batman':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.batMask, { backgroundColor: hero.secondary }]}>
            <Text style={[styles.symbol, { fontSize: symbolSize, color: hero.primary }]}>🦇</Text>
          </View>
        </View>
      );

    case 'superman':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.superS, { backgroundColor: hero.secondary }]}>
            <Text style={[styles.superSText, { fontSize: symbolSize + 4, color: hero.accent }]}>
              S
            </Text>
          </View>
          <View style={[styles.superCape, { backgroundColor: hero.secondary }]} />
        </View>
      );

    case 'spider-man':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.spiderEyes, { backgroundColor: hero.secondary }]}>
            <View style={[styles.eye, { backgroundColor: hero.accent }]} />
            <View style={[styles.eye, { backgroundColor: hero.accent }]} />
          </View>
          <Text style={[styles.spiderSymbol, { fontSize: symbolSize - 4 }]}>{hero.symbol}</Text>
        </View>
      );

    case 'hulk':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.hulkBrow, { backgroundColor: hero.secondary }]} />
          <Text style={[styles.symbol, { fontSize: symbolSize }]}>{hero.symbol}</Text>
        </View>
      );

    case 'thor':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.thorHelmet, { borderColor: hero.secondary }]}>
            <Text style={[styles.symbol, { fontSize: symbolSize }]}>{hero.symbol}</Text>
          </View>
          <View style={[styles.thorWing, { backgroundColor: hero.secondary, left: 4 }]} />
          <View style={[styles.thorWing, { backgroundColor: hero.secondary, right: 4 }]} />
        </View>
      );

    case 'wolverine':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.wolvMask, { backgroundColor: hero.secondary }]}>
            <Text style={[styles.wolvX, { fontSize: symbolSize, color: hero.accent }]}>X</Text>
          </View>
        </View>
      );

    case 'wonder-woman':
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <View style={[styles.wwTiara, { backgroundColor: hero.secondary }]}>
            <Text style={[styles.symbol, { fontSize: symbolSize - 6 }]}>{hero.symbol}</Text>
          </View>
          <View style={[styles.wwBand, { backgroundColor: hero.accent }]} />
        </View>
      );

    default:
      return (
        <View style={[styles.face, { backgroundColor: hero.primary }]}>
          <Text style={[styles.symbol, { fontSize: symbolSize }]}>{hero.symbol}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  selected: {
    borderWidth: 3,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },
  face: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  symbol: {
    textAlign: 'center',
  },
  ironMask: {
    width: '75%',
    height: '70%',
    borderRadius: 20,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B0000',
  },
  arcReactor: {
    width: 18,
    height: 18,
    borderRadius: 9,
    shadowColor: '#00E5FF',
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  batMask: {
    width: '80%',
    height: '55%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  superS: {
    width: '70%',
    height: '70%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-8deg' }],
  },
  superSText: {
    fontWeight: '900',
  },
  superCape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    opacity: 0.9,
  },
  spiderEyes: {
    flexDirection: 'row',
    gap: 8,
    padding: 6,
    borderRadius: 12,
    marginBottom: 4,
  },
  eye: {
    width: 14,
    height: 20,
    borderRadius: 10,
    transform: [{ skewX: '-10deg' }],
  },
  spiderSymbol: {
    position: 'absolute',
    bottom: 8,
    opacity: 0.9,
  },
  hulkBrow: {
    position: 'absolute',
    top: '22%',
    width: '60%',
    height: 8,
    borderRadius: 4,
  },
  thorHelmet: {
    width: '80%',
    height: '75%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thorWing: {
    position: 'absolute',
    top: '30%',
    width: 10,
    height: 24,
    borderRadius: 4,
  },
  wolvMask: {
    width: '85%',
    height: '65%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wolvX: {
    fontWeight: '900',
  },
  wwTiara: {
    width: '75%',
    height: '55%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
  },
  wwBand: {
    position: 'absolute',
    bottom: '20%',
    width: '90%',
    height: 6,
    borderRadius: 3,
  },
});
