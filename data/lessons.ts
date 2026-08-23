import { Lesson } from '@/types';

export const LESSONS: Lesson[] = [
  {
    id: 'animals',
    title: 'Animais',
    emoji: '🐾',
    ageGroupId: '3-4',
    language: 'en',
    words: [
      { id: 'dog', text: 'dog', translation: 'cachorro', emoji: '🐕' },
      { id: 'cat', text: 'cat', translation: 'gato', emoji: '🐱' },
      { id: 'bird', text: 'bird', translation: 'pássaro', emoji: '🐦' },
      { id: 'fish', text: 'fish', translation: 'peixe', emoji: '🐟' },
      { id: 'cow', text: 'cow', translation: 'vaca', emoji: '🐄' },
      { id: 'duck', text: 'duck', translation: 'pato', emoji: '🦆' },
    ],
  },
  {
    id: 'colors',
    title: 'Cores',
    emoji: '🎨',
    ageGroupId: '3-4',
    language: 'en',
    words: [
      { id: 'red', text: 'red', translation: 'vermelho', emoji: '🔴' },
      { id: 'blue', text: 'blue', translation: 'azul', emoji: '🔵' },
      { id: 'green', text: 'green', translation: 'verde', emoji: '🟢' },
      { id: 'yellow', text: 'yellow', translation: 'amarelo', emoji: '🟡' },
      { id: 'pink', text: 'pink', translation: 'rosa', emoji: '🩷' },
    ],
  },
  {
    id: 'numbers',
    title: 'Números',
    emoji: '🔢',
    ageGroupId: '3-4',
    language: 'en',
    words: [
      { id: 'one', text: 'one', translation: 'um', emoji: '1️⃣' },
      { id: 'two', text: 'two', translation: 'dois', emoji: '2️⃣' },
      { id: 'three', text: 'three', translation: 'três', emoji: '3️⃣' },
      { id: 'four', text: 'four', translation: 'quatro', emoji: '4️⃣' },
      { id: 'five', text: 'five', translation: 'cinco', emoji: '5️⃣' },
    ],
  },
  {
    id: 'family',
    title: 'Família',
    emoji: '👨‍👩‍👧',
    ageGroupId: '3-4',
    language: 'en',
    words: [
      { id: 'mom', text: 'mom', translation: 'mamãe', emoji: '👩' },
      { id: 'dad', text: 'dad', translation: 'papai', emoji: '👨' },
      { id: 'baby', text: 'baby', translation: 'bebê', emoji: '👶' },
      { id: 'boy', text: 'boy', translation: 'menino', emoji: '👦' },
      { id: 'girl', text: 'girl', translation: 'menina', emoji: '👧' },
    ],
  },
  {
    id: 'food',
    title: 'Comida',
    emoji: '🍎',
    ageGroupId: '3-4',
    language: 'en',
    words: [
      { id: 'apple', text: 'apple', translation: 'maçã', emoji: '🍎' },
      { id: 'milk', text: 'milk', translation: 'leite', emoji: '🥛' },
      { id: 'bread', text: 'bread', translation: 'pão', emoji: '🍞' },
      { id: 'egg', text: 'egg', translation: 'ovo', emoji: '🥚' },
      { id: 'cake', text: 'cake', translation: 'bolo', emoji: '🎂' },
    ],
  },
];

export function getLessonsByAge(ageGroupId: string): Lesson[] {
  return LESSONS.filter((lesson) => lesson.ageGroupId === ageGroupId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === lessonId);
}
