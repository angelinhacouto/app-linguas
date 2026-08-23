export type HeroId =
  | 'ironman'
  | 'batman'
  | 'superman'
  | 'spider-man'
  | 'hulk'
  | 'thor'
  | 'wolverine'
  | 'wonder-woman';

export interface SuperHero {
  id: HeroId;
  name: string;
  title: string;
  primary: string;
  secondary: string;
  accent: string;
  symbol: string;
}

export const SUPER_HEROES: SuperHero[] = [
  {
    id: 'ironman',
    name: 'Homem de Ferro',
    title: 'Gênio da Tecnologia',
    primary: '#B71C1C',
    secondary: '#FFD700',
    accent: '#00E5FF',
    symbol: '⚙️',
  },
  {
    id: 'batman',
    name: 'Batman',
    title: 'Guardião da Noite',
    primary: '#1A1A2E',
    secondary: '#FFD700',
    accent: '#4A4A6A',
    symbol: '🦇',
  },
  {
    id: 'superman',
    name: 'Super-Homem',
    title: 'Força e Coragem',
    primary: '#1565C0',
    secondary: '#C62828',
    accent: '#FFD700',
    symbol: 'S',
  },
  {
    id: 'spider-man',
    name: 'Homem-Aranha',
    title: 'Agilidade e Astúcia',
    primary: '#C62828',
    secondary: '#1565C0',
    accent: '#FFFFFF',
    symbol: '🕷️',
  },
  {
    id: 'hulk',
    name: 'Hulk',
    title: 'Poder Imensurável',
    primary: '#2E7D32',
    secondary: '#1B5E20',
    accent: '#A5D6A7',
    symbol: '💪',
  },
  {
    id: 'thor',
    name: 'Thor',
    title: 'Deus do Trovão',
    primary: '#BF360C',
    secondary: '#FFD700',
    accent: '#90CAF9',
    symbol: '⚡',
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    title: 'Garra de Aço',
    primary: '#F9A825',
    secondary: '#1565C0',
    accent: '#FFFFFF',
    symbol: '🐺',
  },
  {
    id: 'wonder-woman',
    name: 'Mulher-Maravilha',
    title: 'Princesa Guerreira',
    primary: '#C62828',
    secondary: '#FFD700',
    accent: '#1565C0',
    symbol: '⭐',
  },
];

export function getSuperHero(id: string): SuperHero {
  return SUPER_HEROES.find((h) => h.id === id) ?? SUPER_HEROES[3];
}

/** Caminho da imagem real do herói (pasta public/heroes/) */
export function getHeroImageUri(heroId: HeroId | string): string {
  return `/heroes/${heroId}.png`;
}
