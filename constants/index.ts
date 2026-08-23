import { AgeGroup, AgeGroupId } from '@/types';

export const APP_NAME = 'Língua Heroes';

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: '3-4',
    label: '3–4 anos',
    minAge: 3,
    maxAge: 4,
    description: 'Missão: palavras simples com o Aranha-Hero',
    emoji: '🕷️',
  },
  {
    id: '4-5',
    label: '4–5 anos',
    minAge: 4,
    maxAge: 5,
    description: 'Missão: frases curtas com o Raio-Hero',
    emoji: '⚡',
  },
  {
    id: '5-6',
    label: '5–6 anos',
    minAge: 5,
    maxAge: 6,
    description: 'Missão: desafios com o Tech-Hero',
    emoji: '🤖',
  },
];

export const HEROES: Record<string, { name: string; title: string; emoji: string; color: string }> = {
  '3-4': { name: 'Aranha-Hero', title: 'Mestre das Palavras', emoji: '🕷️', color: '#E53935' },
  '4-5': { name: 'Raio-Hero', title: 'Velocidade do Aprendizado', emoji: '⚡', color: '#FFD600' },
  '5-6': { name: 'Tech-Hero', title: 'Guardião das Línguas', emoji: '🤖', color: '#00E5FF' },
};

export const COLORS = {
  primary: '#00E5FF',
  primaryDark: '#00B8D4',
  secondary: '#FF3366',
  success: '#00E676',
  warning: '#FFD600',
  background: '#0A0E27',
  backgroundLight: '#141B3A',
  card: '#1A2347',
  cardBorder: '#2A3A6B',
  text: '#FFFFFF',
  textLight: '#8B9DC3',
  accent: '#FFD700',
  glow: '#00E5FF',
};

export const FEEDBACK_MESSAGES = {
  excellent: {
    title: 'Poder máximo!',
    subtitles: ['Herói demais!', 'Missão cumprida!', 'Incrível!', 'Level up!'],
  },
  good: {
    title: 'Quase lá, herói!',
    subtitles: ['Escuta o mentor e tenta!', 'Você consegue!', 'Mais uma vez!'],
  },
  try_again: {
    title: 'Missão em andamento!',
    subtitles: ['Seu mentor vai te ajudar!', 'Repete com o herói!', 'Tenta de novo!'],
  },
};

export function getHeroForAgeGroup(ageGroupId: string) {
  return HEROES[ageGroupId] ?? HEROES['3-4'];
}

export const STUDENT_AGES: { age: number; ageGroupId: AgeGroupId }[] = [
  { age: 3, ageGroupId: '3-4' },
  { age: 4, ageGroupId: '3-4' },
  { age: 5, ageGroupId: '4-5' },
  { age: 6, ageGroupId: '5-6' },
];
