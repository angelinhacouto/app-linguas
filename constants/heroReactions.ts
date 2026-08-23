import { HeroId } from './heroes';
import { PronunciationResult } from '@/types';

export type HeroReactionTier = 'power' | 'teach' | 'practice';

export interface HeroReactionStyle {
  /** Emojis/partículas do efeito de poder */
  powerParticles: string[];
  teachParticles: string[];
  practiceParticles: string[];
  powerColor: string;
  teachColor: string;
  practiceColor: string;
}

const DEFAULT_STYLE: HeroReactionStyle = {
  powerParticles: ['✨', '⭐', '💫'],
  teachParticles: ['🔊', '📢'],
  practiceParticles: ['💪', '🌱'],
  powerColor: '#00E676',
  teachColor: '#FFD600',
  practiceColor: '#90CAF9',
};

export const HERO_REACTION_STYLES: Record<HeroId, HeroReactionStyle> = {
  ironman: {
    powerParticles: ['⚡', '💠', '✨', '🔵'],
    teachParticles: ['🔊', '⚙️'],
    practiceParticles: ['🛠️', '💪'],
    powerColor: '#00E5FF',
    teachColor: '#FFD700',
    practiceColor: '#B71C1C',
  },
  batman: {
    powerParticles: ['🦇', '🌑', '⚡'],
    teachParticles: ['🔊', '🦇'],
    practiceParticles: ['🌙', '💪'],
    powerColor: '#FFD700',
    teachColor: '#4A4A6A',
    practiceColor: '#1A1A2E',
  },
  superman: {
    powerParticles: ['⭐', '💥', '🔴', '💫'],
    teachParticles: ['🔊', 'S'],
    practiceParticles: ['🦸', '🌱'],
    powerColor: '#FFD700',
    teachColor: '#1565C0',
    practiceColor: '#C62828',
  },
  'spider-man': {
    powerParticles: ['🕸️', '🕷️', '💫', '✨'],
    teachParticles: ['🔊', '🕸️'],
    practiceParticles: ['🕷️', '💪'],
    powerColor: '#FFFFFF',
    teachColor: '#C62828',
    practiceColor: '#1565C0',
  },
  hulk: {
    powerParticles: ['💥', '💪', '💚', '⭐'],
    teachParticles: ['🔊', '💪'],
    practiceParticles: ['🌱', '👊'],
    powerColor: '#A5D6A7',
    teachColor: '#2E7D32',
    practiceColor: '#1B5E20',
  },
  thor: {
    powerParticles: ['⚡', '🔨', '✨', '💫'],
    teachParticles: ['🔊', '⚡'],
    practiceParticles: ['🛡️', '💪'],
    powerColor: '#90CAF9',
    teachColor: '#FFD700',
    practiceColor: '#BF360C',
  },
  'captain-america': {
    powerParticles: ['🛡️', '⭐', '🇺🇸', '✨'],
    teachParticles: ['🔊', '🛡️'],
    practiceParticles: ['💪', '🌟'],
    powerColor: '#FFFFFF',
    teachColor: '#1565C0',
    practiceColor: '#C62828',
  },
  'wonder-woman': {
    powerParticles: ['⭐', '✨', '💫', '👑'],
    teachParticles: ['🔊', '⭐'],
    practiceParticles: ['💪', '🌸'],
    powerColor: '#FFD700',
    teachColor: '#C62828',
    practiceColor: '#1565C0',
  },
};

export function scoreToTier(score: number): HeroReactionTier {
  if (score >= 70) return 'power';
  if (score >= 50) return 'teach';
  return 'practice';
}

export function resultToTier(result: PronunciationResult): HeroReactionTier {
  if (result === 'excellent') return 'power';
  if (result === 'good') return 'teach';
  return 'practice';
}

export function getHeroReactionStyle(heroId: HeroId | string): HeroReactionStyle {
  return HERO_REACTION_STYLES[heroId as HeroId] ?? DEFAULT_STYLE;
}

/** Frases personalizadas por herói e faixa de pontuação */
export function getHeroFeedbackSpeech(
  heroId: HeroId | string,
  heroName: string,
  studentName: string,
  tier: HeroReactionTier
): { line: string; speakWordAfter: boolean } {
  const name = studentName.trim() || 'herói';

  const lines: Record<HeroId, Record<HeroReactionTier, string>> = {
    ironman: {
      power: `Muito bem, ${name}! Repulsores ativados! Você arrasou!`,
      teach: `Quase perfeito, ${name}! Escuta a pronúncia correta:`,
      practice: `Tudo bem, ${name}! Você está no caminho certo. Só precisamos treinar mais!`,
    },
    batman: {
      power: `Impressionante, ${name}. Gotham está orgulhosa de você.`,
      teach: `${name}, escute com atenção. A palavra correta é:`,
      practice: `Sem problemas, ${name}. Todo herói treina. Vamos continuar.`,
    },
    superman: {
      power: `Muito bem, ${name}! Verdadeira força de herói!`,
      teach: `${name}, ouça comigo. Repita assim:`,
      practice: `Tudo bem, ${name}! Você está no caminho certo. Vamos treinar juntos!`,
    },
    'spider-man': {
      power: `Thwip! Sensacional, ${name}! Teia de ouro!`,
      teach: `Boa tentativa, ${name}! O Homem-Aranha fala assim:`,
      practice: `Relaxa, ${name}! Todo herói aprende devagar. Vamos de novo!`,
    },
    hulk: {
      power: `HULK APROVA, ${name}! PODER MÁXIMO!`,
      teach: `${name}, Hulk mostra de novo. Fala assim:`,
      practice: `Tudo bem, ${name}! Hulk também aprendeu devagar. Treina mais!`,
    },
    thor: {
      power: `Por Asgard, ${name}! Magnífico!`,
      teach: `${name}, o trovão sussurra a palavra certa:`,
      practice: `Coragem, ${name}! Estás no caminho certo. Treinemos mais!`,
    },
    'captain-america': {
      power: `Excelente trabalho, ${name}! Escudo erguido com orgulho!`,
      teach: `${name}, escute o Capitão. A palavra é:`,
      practice: `Tudo bem, ${name}! Heróis treinam todo dia. Vamos juntos!`,
    },
    'wonder-woman': {
      power: `Maravilhoso, ${name}! A Amazônia comemora!`,
      teach: `${name}, ouça a princesa guerreira. Diga assim:`,
      practice: `Não desista, ${name}! Estás no caminho certo. Vamos treinar!`,
    },
  };

  const heroLines = lines[heroId as HeroId] ?? lines['spider-man'];
  return {
    line: heroLines[tier],
    speakWordAfter: tier === 'teach',
  };
}

export function tierToMood(tier: HeroReactionTier): 'power' | 'teach' | 'practice' {
  return tier;
}

export function tierToResult(tier: HeroReactionTier): PronunciationResult {
  if (tier === 'power') return 'excellent';
  if (tier === 'teach') return 'good';
  return 'try_again';
}
