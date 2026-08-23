import { AgeGroup } from '@/types';

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: '3-4',
    label: '3–4 anos',
    minAge: 3,
    maxAge: 4,
    description: 'Palavras simples com imagens e sons',
    emoji: '🌱',
  },
  {
    id: '4-5',
    label: '4–5 anos',
    minAge: 4,
    maxAge: 5,
    description: 'Pequenas sequências e jogos',
    emoji: '🌿',
  },
  {
    id: '5-6',
    label: '5–6 anos',
    minAge: 5,
    maxAge: 6,
    description: 'Frases curtas e desafios',
    emoji: '🌳',
  },
];

export const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  secondary: '#FF6B9D',
  success: '#4CAF50',
  warning: '#FFB74D',
  background: '#F0F4FF',
  card: '#FFFFFF',
  text: '#2D3436',
  textLight: '#636E72',
  accent: '#FFD93D',
};

export const FEEDBACK_MESSAGES = {
  excellent: {
    title: 'Muito bem!',
    subtitles: ['Parabéns!', 'Incrível!', 'Arrasou!', 'Perfeito!'],
  },
  good: {
    title: 'Quase lá!',
    subtitles: ['Escuta de novo e tenta!', 'Você consegue!', 'Mais uma vez!'],
  },
  try_again: {
    title: 'Vamos juntos!',
    subtitles: ['Escuta com atenção', 'Repete comigo!', 'Tenta de novo!'],
  },
};
