import { ImageSourcePropType } from 'react-native';
import { HeroId } from './heroes';

/** Imagens embutidas no app — funcionam em web e mobile */
export const HERO_IMAGES: Record<HeroId, ImageSourcePropType> = {
  ironman: require('@/assets/heroes/ironman.png'),
  batman: require('@/assets/heroes/batman.png'),
  superman: require('@/assets/heroes/superman.png'),
  'spider-man': require('@/assets/heroes/spider-man.png'),
  hulk: require('@/assets/heroes/hulk.png'),
  thor: require('@/assets/heroes/thor.png'),
  'captain-america': require('@/assets/heroes/captain-america.png'),
  'wonder-woman': require('@/assets/heroes/wonder-woman.png'),
};

export function getHeroImageSource(heroId: HeroId | string): ImageSourcePropType {
  return HERO_IMAGES[heroId as HeroId] ?? HERO_IMAGES['spider-man'];
}
