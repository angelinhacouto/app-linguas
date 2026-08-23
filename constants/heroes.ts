export type HeroId =
  | 'ironman'
  | 'batman'
  | 'superman'
  | 'spider-man'
  | 'hulk'
  | 'thor'
  | 'captain-america'
  | 'wonder-woman';

export interface SuperHero {
  id: HeroId;
  name: string;
  title: string;
  primary: string;
  secondary: string;
  accent: string;
  symbol: string;
  greeting: string;
  cheer: string;
  encourage: string;
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
    greeting: 'Eu sou o Homem de Ferro! Pronto para a missão?',
    cheer: 'Genial! Tecnologia e coragem!',
    encourage: 'Ativa o reator e tenta de novo!',
  },
  {
    id: 'batman',
    name: 'Batman',
    title: 'Guardião da Noite',
    primary: '#1A1A2E',
    secondary: '#FFD700',
    accent: '#4A4A6A',
    symbol: '🦇',
    greeting: 'Eu sou o Batman! Vamos treinar juntos.',
    cheer: 'Justiça feita! Excelente!',
    encourage: 'Na escuridão a gente aprende. Tenta outra vez!',
  },
  {
    id: 'superman',
    name: 'Super-Homem',
    title: 'Força e Coragem',
    primary: '#1565C0',
    secondary: '#C62828',
    accent: '#FFD700',
    symbol: 'S',
    greeting: 'Eu sou o Super-Homem! Força e coragem!',
    cheer: 'Up, up and away! Perfeito!',
    encourage: 'Todo herói erra. Levanta e repete!',
  },
  {
    id: 'spider-man',
    name: 'Homem-Aranha',
    title: 'Agilidade e Astúcia',
    primary: '#C62828',
    secondary: '#1565C0',
    accent: '#FFFFFF',
    symbol: '🕷️',
    greeting: 'Eu sou o Homem-Aranha! Teia de palavras!',
    cheer: 'Thwip! Arrasou demais!',
    encourage: 'Com agilidade você consegue! Mais uma!',
  },
  {
    id: 'hulk',
    name: 'Hulk',
    title: 'Poder Imensurável',
    primary: '#2E7D32',
    secondary: '#1B5E20',
    accent: '#A5D6A7',
    symbol: '💪',
    greeting: 'Hulk esmaga palavras difíceis! Vamos!',
    cheer: 'HULK FELIZ! Poder máximo!',
    encourage: 'Hulk não desiste! Repete com força!',
  },
  {
    id: 'thor',
    name: 'Thor',
    title: 'Deus do Trovão',
    primary: '#BF360C',
    secondary: '#FFD700',
    accent: '#90CAF9',
    symbol: '⚡',
    greeting: 'Eu sou o Thor! Trovão de conhecimento!',
    cheer: 'Por Asgard! Magnífico!',
    encourage: 'Levanta o martelo e tenta de novo!',
  },
  {
    id: 'captain-america',
    name: 'Capitão América',
    title: 'Escudo e Coragem',
    primary: '#1565C0',
    secondary: '#C62828',
    accent: '#FFFFFF',
    symbol: '🛡️',
    greeting: 'Capitão América aqui! Pela liberdade de aprender!',
    cheer: 'Escudo levantado! Missão cumprida!',
    encourage: 'Heróis nunca desistem. Vamos juntos!',
  },
  {
    id: 'wonder-woman',
    name: 'Mulher-Maravilha',
    title: 'Princesa Guerreira',
    primary: '#C62828',
    secondary: '#FFD700',
    accent: '#1565C0',
    symbol: '⭐',
    greeting: 'Eu sou a Mulher-Maravilha! Princesa guerreira!',
    cheer: 'Lasso da verdade! Perfeito!',
    encourage: 'Com coragem você vence. Tenta de novo!',
  },
];

export function getSuperHero(id: string): SuperHero {
  return SUPER_HEROES.find((h) => h.id === id) ?? SUPER_HEROES[3];
}

/** @deprecated Use getHeroImageSource from heroImages.ts */
export function getHeroImageUri(heroId: HeroId | string): string {
  return `/heroes/${heroId}.png`;
}
