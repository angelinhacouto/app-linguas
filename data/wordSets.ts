import { LanguageId, Word } from '@/types';

type WordSet = Record<LanguageId, Word[]>;

const ANIMALS: WordSet = {
  en: [
    { id: 'dog', text: 'dog', translation: 'cachorro', emoji: '🐕' },
    { id: 'cat', text: 'cat', translation: 'gato', emoji: '🐱' },
    { id: 'bird', text: 'bird', translation: 'pássaro', emoji: '🐦' },
    { id: 'fish', text: 'fish', translation: 'peixe', emoji: '🐟' },
    { id: 'cow', text: 'cow', translation: 'vaca', emoji: '🐄' },
    { id: 'duck', text: 'duck', translation: 'pato', emoji: '🦆' },
  ],
  de: [
    { id: 'dog', text: 'Hund', translation: 'cachorro', emoji: '🐕' },
    { id: 'cat', text: 'Katze', translation: 'gato', emoji: '🐱' },
    { id: 'bird', text: 'Vogel', translation: 'pássaro', emoji: '🐦' },
    { id: 'fish', text: 'Fisch', translation: 'peixe', emoji: '🐟' },
    { id: 'cow', text: 'Kuh', translation: 'vaca', emoji: '🐄' },
    { id: 'duck', text: 'Ente', translation: 'pato', emoji: '🦆' },
  ],
  it: [
    { id: 'dog', text: 'cane', translation: 'cachorro', emoji: '🐕' },
    { id: 'cat', text: 'gatto', translation: 'gato', emoji: '🐱' },
    { id: 'bird', text: 'uccello', translation: 'pássaro', emoji: '🐦' },
    { id: 'fish', text: 'pesce', translation: 'peixe', emoji: '🐟' },
    { id: 'cow', text: 'mucca', translation: 'vaca', emoji: '🐄' },
    { id: 'duck', text: 'anatra', translation: 'pato', emoji: '🦆' },
  ],
  es: [
    { id: 'dog', text: 'perro', translation: 'cachorro', emoji: '🐕' },
    { id: 'cat', text: 'gato', translation: 'gato', emoji: '🐱' },
    { id: 'bird', text: 'pájaro', translation: 'pássaro', emoji: '🐦' },
    { id: 'fish', text: 'pez', translation: 'peixe', emoji: '🐟' },
    { id: 'cow', text: 'vaca', translation: 'vaca', emoji: '🐄' },
    { id: 'duck', text: 'pato', translation: 'pato', emoji: '🦆' },
  ],
  pt: [
    { id: 'dog', text: 'cachorro', translation: 'dog', emoji: '🐕' },
    { id: 'cat', text: 'gato', translation: 'cat', emoji: '🐱' },
    { id: 'bird', text: 'pássaro', translation: 'bird', emoji: '🐦' },
    { id: 'fish', text: 'peixe', translation: 'fish', emoji: '🐟' },
    { id: 'cow', text: 'vaca', translation: 'cow', emoji: '🐄' },
    { id: 'duck', text: 'pato', translation: 'duck', emoji: '🦆' },
  ],
};

const COLORS: WordSet = {
  en: [
    { id: 'red', text: 'red', translation: 'vermelho', emoji: '🔴' },
    { id: 'blue', text: 'blue', translation: 'azul', emoji: '🔵' },
    { id: 'green', text: 'green', translation: 'verde', emoji: '🟢' },
    { id: 'yellow', text: 'yellow', translation: 'amarelo', emoji: '🟡' },
    { id: 'pink', text: 'pink', translation: 'rosa', emoji: '🩷' },
  ],
  de: [
    { id: 'red', text: 'rot', translation: 'vermelho', emoji: '🔴' },
    { id: 'blue', text: 'blau', translation: 'azul', emoji: '🔵' },
    { id: 'green', text: 'grün', translation: 'verde', emoji: '🟢' },
    { id: 'yellow', text: 'gelb', translation: 'amarelo', emoji: '🟡' },
    { id: 'pink', text: 'rosa', translation: 'rosa', emoji: '🩷' },
  ],
  it: [
    { id: 'red', text: 'rosso', translation: 'vermelho', emoji: '🔴' },
    { id: 'blue', text: 'blu', translation: 'azul', emoji: '🔵' },
    { id: 'green', text: 'verde', translation: 'verde', emoji: '🟢' },
    { id: 'yellow', text: 'giallo', translation: 'amarelo', emoji: '🟡' },
    { id: 'pink', text: 'rosa', translation: 'rosa', emoji: '🩷' },
  ],
  es: [
    { id: 'red', text: 'rojo', translation: 'vermelho', emoji: '🔴' },
    { id: 'blue', text: 'azul', translation: 'azul', emoji: '🔵' },
    { id: 'green', text: 'verde', translation: 'verde', emoji: '🟢' },
    { id: 'yellow', text: 'amarillo', translation: 'amarelo', emoji: '🟡' },
    { id: 'pink', text: 'rosa', translation: 'rosa', emoji: '🩷' },
  ],
  pt: [
    { id: 'red', text: 'vermelho', translation: 'red', emoji: '🔴' },
    { id: 'blue', text: 'azul', translation: 'blue', emoji: '🔵' },
    { id: 'green', text: 'verde', translation: 'green', emoji: '🟢' },
    { id: 'yellow', text: 'amarelo', translation: 'yellow', emoji: '🟡' },
    { id: 'pink', text: 'rosa', translation: 'pink', emoji: '🩷' },
  ],
};

const NUMBERS: WordSet = {
  en: [
    { id: 'one', text: 'one', translation: 'um', emoji: '1️⃣' },
    { id: 'two', text: 'two', translation: 'dois', emoji: '2️⃣' },
    { id: 'three', text: 'three', translation: 'três', emoji: '3️⃣' },
    { id: 'four', text: 'four', translation: 'quatro', emoji: '4️⃣' },
    { id: 'five', text: 'five', translation: 'cinco', emoji: '5️⃣' },
  ],
  de: [
    { id: 'one', text: 'eins', translation: 'um', emoji: '1️⃣' },
    { id: 'two', text: 'zwei', translation: 'dois', emoji: '2️⃣' },
    { id: 'three', text: 'drei', translation: 'três', emoji: '3️⃣' },
    { id: 'four', text: 'vier', translation: 'quatro', emoji: '4️⃣' },
    { id: 'five', text: 'fünf', translation: 'cinco', emoji: '5️⃣' },
  ],
  it: [
    { id: 'one', text: 'uno', translation: 'um', emoji: '1️⃣' },
    { id: 'two', text: 'due', translation: 'dois', emoji: '2️⃣' },
    { id: 'three', text: 'tre', translation: 'três', emoji: '3️⃣' },
    { id: 'four', text: 'quattro', translation: 'quatro', emoji: '4️⃣' },
    { id: 'five', text: 'cinque', translation: 'cinco', emoji: '5️⃣' },
  ],
  es: [
    { id: 'one', text: 'uno', translation: 'um', emoji: '1️⃣' },
    { id: 'two', text: 'dos', translation: 'dois', emoji: '2️⃣' },
    { id: 'three', text: 'tres', translation: 'três', emoji: '3️⃣' },
    { id: 'four', text: 'cuatro', translation: 'quatro', emoji: '4️⃣' },
    { id: 'five', text: 'cinco', translation: 'cinco', emoji: '5️⃣' },
  ],
  pt: [
    { id: 'one', text: 'um', translation: 'one', emoji: '1️⃣' },
    { id: 'two', text: 'dois', translation: 'two', emoji: '2️⃣' },
    { id: 'three', text: 'três', translation: 'three', emoji: '3️⃣' },
    { id: 'four', text: 'quatro', translation: 'four', emoji: '4️⃣' },
    { id: 'five', text: 'cinco', translation: 'five', emoji: '5️⃣' },
  ],
};

const FAMILY: WordSet = {
  en: [
    { id: 'mom', text: 'mom', translation: 'mamãe', emoji: '👩' },
    { id: 'dad', text: 'dad', translation: 'papai', emoji: '👨' },
    { id: 'baby', text: 'baby', translation: 'bebê', emoji: '👶' },
    { id: 'boy', text: 'boy', translation: 'menino', emoji: '👦' },
    { id: 'girl', text: 'girl', translation: 'menina', emoji: '👧' },
  ],
  de: [
    { id: 'mom', text: 'Mama', translation: 'mamãe', emoji: '👩' },
    { id: 'dad', text: 'Papa', translation: 'papai', emoji: '👨' },
    { id: 'baby', text: 'Baby', translation: 'bebê', emoji: '👶' },
    { id: 'boy', text: 'Junge', translation: 'menino', emoji: '👦' },
    { id: 'girl', text: 'Mädchen', translation: 'menina', emoji: '👧' },
  ],
  it: [
    { id: 'mom', text: 'mamma', translation: 'mamãe', emoji: '👩' },
    { id: 'dad', text: 'papà', translation: 'papai', emoji: '👨' },
    { id: 'baby', text: 'bambino', translation: 'bebê', emoji: '👶' },
    { id: 'boy', text: 'ragazzo', translation: 'menino', emoji: '👦' },
    { id: 'girl', text: 'ragazza', translation: 'menina', emoji: '👧' },
  ],
  es: [
    { id: 'mom', text: 'mamá', translation: 'mamãe', emoji: '👩' },
    { id: 'dad', text: 'papá', translation: 'papai', emoji: '👨' },
    { id: 'baby', text: 'bebé', translation: 'bebê', emoji: '👶' },
    { id: 'boy', text: 'niño', translation: 'menino', emoji: '👦' },
    { id: 'girl', text: 'niña', translation: 'menina', emoji: '👧' },
  ],
  pt: [
    { id: 'mom', text: 'mamãe', translation: 'mom', emoji: '👩' },
    { id: 'dad', text: 'papai', translation: 'dad', emoji: '👨' },
    { id: 'baby', text: 'bebê', translation: 'baby', emoji: '👶' },
    { id: 'boy', text: 'menino', translation: 'boy', emoji: '👦' },
    { id: 'girl', text: 'menina', translation: 'girl', emoji: '👧' },
  ],
};

const FOOD: WordSet = {
  en: [
    { id: 'apple', text: 'apple', translation: 'maçã', emoji: '🍎' },
    { id: 'milk', text: 'milk', translation: 'leite', emoji: '🥛' },
    { id: 'bread', text: 'bread', translation: 'pão', emoji: '🍞' },
    { id: 'egg', text: 'egg', translation: 'ovo', emoji: '🥚' },
    { id: 'cake', text: 'cake', translation: 'bolo', emoji: '🎂' },
  ],
  de: [
    { id: 'apple', text: 'Apfel', translation: 'maçã', emoji: '🍎' },
    { id: 'milk', text: 'Milch', translation: 'leite', emoji: '🥛' },
    { id: 'bread', text: 'Brot', translation: 'pão', emoji: '🍞' },
    { id: 'egg', text: 'Ei', translation: 'ovo', emoji: '🥚' },
    { id: 'cake', text: 'Kuchen', translation: 'bolo', emoji: '🎂' },
  ],
  it: [
    { id: 'apple', text: 'mela', translation: 'maçã', emoji: '🍎' },
    { id: 'milk', text: 'latte', translation: 'leite', emoji: '🥛' },
    { id: 'bread', text: 'pane', translation: 'pão', emoji: '🍞' },
    { id: 'egg', text: 'uovo', translation: 'ovo', emoji: '🥚' },
    { id: 'cake', text: 'torta', translation: 'bolo', emoji: '🎂' },
  ],
  es: [
    { id: 'apple', text: 'manzana', translation: 'maçã', emoji: '🍎' },
    { id: 'milk', text: 'leche', translation: 'leite', emoji: '🥛' },
    { id: 'bread', text: 'pan', translation: 'pão', emoji: '🍞' },
    { id: 'egg', text: 'huevo', translation: 'ovo', emoji: '🥚' },
    { id: 'cake', text: 'pastel', translation: 'bolo', emoji: '🎂' },
  ],
  pt: [
    { id: 'apple', text: 'maçã', translation: 'apple', emoji: '🍎' },
    { id: 'milk', text: 'leite', translation: 'milk', emoji: '🥛' },
    { id: 'bread', text: 'pão', translation: 'bread', emoji: '🍞' },
    { id: 'egg', text: 'ovo', translation: 'egg', emoji: '🥚' },
    { id: 'cake', text: 'bolo', translation: 'cake', emoji: '🎂' },
  ],
};

export const LESSON_TEMPLATES = [
  { id: 'animals', title: 'Animais', emoji: '🐾', words: ANIMALS },
  { id: 'colors', title: 'Cores', emoji: '🎨', words: COLORS },
  { id: 'numbers', title: 'Números', emoji: '🔢', words: NUMBERS },
  { id: 'family', title: 'Família', emoji: '👨‍👩‍👧', words: FAMILY },
  { id: 'food', title: 'Comida', emoji: '🍎', words: FOOD },
];

export const ALL_LANGUAGES: LanguageId[] = ['en', 'de', 'it', 'es', 'pt'];
