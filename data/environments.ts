import { ALL_LANGUAGES } from '@/data/wordSets';
import { EnvironmentId, EnvironmentMeta, LanguageId, Word } from '@/types';

type WordSet = Record<LanguageId, Word[]>;

interface WordLayout {
  id: string;
  emoji: string;
  position: { x: number; y: number };
}

interface EnvironmentTemplate {
  meta: EnvironmentMeta;
  layouts: WordLayout[];
  words: WordSet;
}

function withPositions(layouts: WordLayout[], words: Word[]): Word[] {
  return words.map((word) => {
    const layout = layouts.find((item) => item.id === word.id);
    return {
      ...word,
      emoji: layout?.emoji ?? word.emoji,
      position: layout?.position,
    };
  });
}

const ENVIRONMENT_DEFINITIONS: EnvironmentTemplate[] = [
  {
    meta: {
      id: 'bedroom',
      title: 'Quarto',
      subtitle: 'Explorar o quarto',
      emoji: '🛏️',
      group: 'house',
      skyColor: '#1A2347',
      groundColor: '#2A3A6B',
      accentColor: '#90CAF9',
      decor: [
        { emoji: '🌙', x: 82, y: 8, size: 28 },
        { emoji: '⭐', x: 12, y: 12, size: 20 },
        { emoji: '🪟', x: 18, y: 28, size: 36 },
      ],
      introLine: 'Vamos explorar o quarto em 3D!',
    },
    layouts: [
      { id: 'bed', emoji: '🛏️', position: { x: 24, y: 58 } },
      { id: 'lamp', emoji: '💡', position: { x: 78, y: 28 } },
      { id: 'toy', emoji: '🧸', position: { x: 48, y: 72 } },
      { id: 'pillow', emoji: '🛌', position: { x: 38, y: 48 } },
      { id: 'door', emoji: '🚪', position: { x: 8, y: 42 } },
    ],
    words: {
      en: [
        { id: 'bed', text: 'bed', translation: 'cama', emoji: '🛏️' },
        { id: 'lamp', text: 'lamp', translation: 'abajur', emoji: '💡' },
        { id: 'toy', text: 'toy', translation: 'brinquedo', emoji: '🧸' },
        { id: 'pillow', text: 'pillow', translation: 'travesseiro', emoji: '🛌' },
        { id: 'door', text: 'door', translation: 'porta', emoji: '🚪' },
      ],
      de: [
        { id: 'bed', text: 'Bett', translation: 'cama', emoji: '🛏️' },
        { id: 'lamp', text: 'Lampe', translation: 'abajur', emoji: '💡' },
        { id: 'toy', text: 'Spielzeug', translation: 'brinquedo', emoji: '🧸' },
        { id: 'pillow', text: 'Kissen', translation: 'travesseiro', emoji: '🛌' },
        { id: 'door', text: 'Tür', translation: 'porta', emoji: '🚪' },
      ],
      it: [
        { id: 'bed', text: 'letto', translation: 'cama', emoji: '🛏️' },
        { id: 'lamp', text: 'lampada', translation: 'abajur', emoji: '💡' },
        { id: 'toy', text: 'giocattolo', translation: 'brinquedo', emoji: '🧸' },
        { id: 'pillow', text: 'cuscino', translation: 'travesseiro', emoji: '🛌' },
        { id: 'door', text: 'porta', translation: 'porta', emoji: '🚪' },
      ],
      es: [
        { id: 'bed', text: 'cama', translation: 'cama', emoji: '🛏️' },
        { id: 'lamp', text: 'lámpara', translation: 'abajur', emoji: '💡' },
        { id: 'toy', text: 'juguete', translation: 'brinquedo', emoji: '🧸' },
        { id: 'pillow', text: 'almohada', translation: 'travesseiro', emoji: '🛌' },
        { id: 'door', text: 'puerta', translation: 'porta', emoji: '🚪' },
      ],
      pt: [
        { id: 'bed', text: 'cama', translation: 'bed', emoji: '🛏️' },
        { id: 'lamp', text: 'abajur', translation: 'lamp', emoji: '💡' },
        { id: 'toy', text: 'brinquedo', translation: 'toy', emoji: '🧸' },
        { id: 'pillow', text: 'travesseiro', translation: 'pillow', emoji: '🛌' },
        { id: 'door', text: 'porta', translation: 'door', emoji: '🚪' },
      ],
    },
  },
  {
    meta: {
      id: 'kitchen',
      title: 'Cozinha',
      subtitle: 'Explorar a cozinha',
      emoji: '🍳',
      group: 'house',
      skyColor: '#1A2347',
      groundColor: '#3E2723',
      accentColor: '#FFB74D',
      decor: [
        { emoji: '🍳', x: 88, y: 10, size: 30 },
        { emoji: '✨', x: 10, y: 18, size: 18 },
      ],
      introLine: 'Entramos na cozinha em 3D!',
    },
    layouts: [
      { id: 'table', emoji: '🪑', position: { x: 50, y: 62 } },
      { id: 'chair', emoji: '🪑', position: { x: 32, y: 68 } },
      { id: 'cup', emoji: '☕', position: { x: 58, y: 48 } },
      { id: 'plate', emoji: '🍽️', position: { x: 44, y: 52 } },
      { id: 'fridge', emoji: '🧊', position: { x: 84, y: 36 } },
    ],
    words: {
      en: [
        { id: 'table', text: 'table', translation: 'mesa', emoji: '🪑' },
        { id: 'chair', text: 'chair', translation: 'cadeira', emoji: '🪑' },
        { id: 'cup', text: 'cup', translation: 'copo', emoji: '☕' },
        { id: 'plate', text: 'plate', translation: 'prato', emoji: '🍽️' },
        { id: 'fridge', text: 'fridge', translation: 'geladeira', emoji: '🧊' },
      ],
      de: [
        { id: 'table', text: 'Tisch', translation: 'mesa', emoji: '🪑' },
        { id: 'chair', text: 'Stuhl', translation: 'cadeira', emoji: '🪑' },
        { id: 'cup', text: 'Tasse', translation: 'copo', emoji: '☕' },
        { id: 'plate', text: 'Teller', translation: 'prato', emoji: '🍽️' },
        { id: 'fridge', text: 'Kühlschrank', translation: 'geladeira', emoji: '🧊' },
      ],
      it: [
        { id: 'table', text: 'tavolo', translation: 'mesa', emoji: '🪑' },
        { id: 'chair', text: 'sedia', translation: 'cadeira', emoji: '🪑' },
        { id: 'cup', text: 'tazza', translation: 'copo', emoji: '☕' },
        { id: 'plate', text: 'piatto', translation: 'prato', emoji: '🍽️' },
        { id: 'fridge', text: 'frigorifero', translation: 'geladeira', emoji: '🧊' },
      ],
      es: [
        { id: 'table', text: 'mesa', translation: 'mesa', emoji: '🪑' },
        { id: 'chair', text: 'silla', translation: 'cadeira', emoji: '🪑' },
        { id: 'cup', text: 'taza', translation: 'copo', emoji: '☕' },
        { id: 'plate', text: 'plato', translation: 'prato', emoji: '🍽️' },
        { id: 'fridge', text: 'nevera', translation: 'geladeira', emoji: '🧊' },
      ],
      pt: [
        { id: 'table', text: 'mesa', translation: 'table', emoji: '🪑' },
        { id: 'chair', text: 'cadeira', translation: 'chair', emoji: '🪑' },
        { id: 'cup', text: 'copo', translation: 'cup', emoji: '☕' },
        { id: 'plate', text: 'prato', translation: 'plate', emoji: '🍽️' },
        { id: 'fridge', text: 'geladeira', translation: 'fridge', emoji: '🧊' },
      ],
    },
  },
  {
    meta: {
      id: 'living-room',
      title: 'Sala',
      subtitle: 'Explorar a sala',
      emoji: '🛋️',
      group: 'house',
      skyColor: '#1A2347',
      groundColor: '#4A148C',
      accentColor: '#CE93D8',
      decor: [
        { emoji: '🖼️', x: 50, y: 12, size: 28 },
        { emoji: '💡', x: 8, y: 22, size: 22 },
      ],
      introLine: 'Estamos na sala em 3D!',
    },
    layouts: [
      { id: 'sofa', emoji: '🛋️', position: { x: 42, y: 58 } },
      { id: 'tv', emoji: '📺', position: { x: 52, y: 26 } },
      { id: 'window', emoji: '🪟', position: { x: 14, y: 22 } },
      { id: 'clock', emoji: '🕐', position: { x: 78, y: 18 } },
      { id: 'book', emoji: '📚', position: { x: 68, y: 66 } },
    ],
    words: {
      en: [
        { id: 'sofa', text: 'sofa', translation: 'sofá', emoji: '🛋️' },
        { id: 'tv', text: 'TV', translation: 'televisão', emoji: '📺' },
        { id: 'window', text: 'window', translation: 'janela', emoji: '🪟' },
        { id: 'clock', text: 'clock', translation: 'relógio', emoji: '🕐' },
        { id: 'book', text: 'book', translation: 'livro', emoji: '📚' },
      ],
      de: [
        { id: 'sofa', text: 'Sofa', translation: 'sofá', emoji: '🛋️' },
        { id: 'tv', text: 'Fernseher', translation: 'televisão', emoji: '📺' },
        { id: 'window', text: 'Fenster', translation: 'janela', emoji: '🪟' },
        { id: 'clock', text: 'Uhr', translation: 'relógio', emoji: '🕐' },
        { id: 'book', text: 'Buch', translation: 'livro', emoji: '📚' },
      ],
      it: [
        { id: 'sofa', text: 'divano', translation: 'sofá', emoji: '🛋️' },
        { id: 'tv', text: 'TV', translation: 'televisão', emoji: '📺' },
        { id: 'window', text: 'finestra', translation: 'janela', emoji: '🪟' },
        { id: 'clock', text: 'orologio', translation: 'relógio', emoji: '🕐' },
        { id: 'book', text: 'libro', translation: 'livro', emoji: '📚' },
      ],
      es: [
        { id: 'sofa', text: 'sofá', translation: 'sofá', emoji: '🛋️' },
        { id: 'tv', text: 'televisión', translation: 'televisão', emoji: '📺' },
        { id: 'window', text: 'ventana', translation: 'janela', emoji: '🪟' },
        { id: 'clock', text: 'reloj', translation: 'relógio', emoji: '🕐' },
        { id: 'book', text: 'libro', translation: 'livro', emoji: '📚' },
      ],
      pt: [
        { id: 'sofa', text: 'sofá', translation: 'sofa', emoji: '🛋️' },
        { id: 'tv', text: 'televisão', translation: 'TV', emoji: '📺' },
        { id: 'window', text: 'janela', translation: 'window', emoji: '🪟' },
        { id: 'clock', text: 'relógio', translation: 'clock', emoji: '🕐' },
        { id: 'book', text: 'livro', translation: 'book', emoji: '📚' },
      ],
    },
  },
  {
    meta: {
      id: 'bathroom',
      title: 'Banheiro',
      subtitle: 'Explorar o banheiro',
      emoji: '🚿',
      group: 'house',
      skyColor: '#0D47A1',
      groundColor: '#1565C0',
      accentColor: '#81D4FA',
      decor: [
        { emoji: '💧', x: 15, y: 10, size: 22 },
        { emoji: '💧', x: 85, y: 14, size: 18 },
      ],
      introLine: 'Hora de explorar o banheiro em 3D!',
    },
    layouts: [
      { id: 'bath', emoji: '🛁', position: { x: 34, y: 58 } },
      { id: 'soap', emoji: '🧼', position: { x: 62, y: 42 } },
      { id: 'towel', emoji: '🛁', position: { x: 76, y: 34 } },
      { id: 'mirror', emoji: '🪞', position: { x: 50, y: 20 } },
      { id: 'toothbrush', emoji: '🪥', position: { x: 24, y: 44 } },
    ],
    words: {
      en: [
        { id: 'bath', text: 'bath', translation: 'banheira', emoji: '🛁' },
        { id: 'soap', text: 'soap', translation: 'sabonete', emoji: '🧼' },
        { id: 'towel', text: 'towel', translation: 'toalha', emoji: '🛁' },
        { id: 'mirror', text: 'mirror', translation: 'espelho', emoji: '🪞' },
        { id: 'toothbrush', text: 'toothbrush', translation: 'escova de dente', emoji: '🪥' },
      ],
      de: [
        { id: 'bath', text: 'Badewanne', translation: 'banheira', emoji: '🛁' },
        { id: 'soap', text: 'Seife', translation: 'sabonete', emoji: '🧼' },
        { id: 'towel', text: 'Handtuch', translation: 'toalha', emoji: '🛁' },
        { id: 'mirror', text: 'Spiegel', translation: 'espelho', emoji: '🪞' },
        { id: 'toothbrush', text: 'Zahnbürste', translation: 'escova de dente', emoji: '🪥' },
      ],
      it: [
        { id: 'bath', text: 'vasca', translation: 'banheira', emoji: '🛁' },
        { id: 'soap', text: 'sapone', translation: 'sabonete', emoji: '🧼' },
        { id: 'towel', text: 'asciugamano', translation: 'toalha', emoji: '🛁' },
        { id: 'mirror', text: 'specchio', translation: 'espelho', emoji: '🪞' },
        { id: 'toothbrush', text: 'spazzolino', translation: 'escova de dente', emoji: '🪥' },
      ],
      es: [
        { id: 'bath', text: 'bañera', translation: 'banheira', emoji: '🛁' },
        { id: 'soap', text: 'jabón', translation: 'sabonete', emoji: '🧼' },
        { id: 'towel', text: 'toalla', translation: 'toalha', emoji: '🛁' },
        { id: 'mirror', text: 'espejo', translation: 'espelho', emoji: '🪞' },
        { id: 'toothbrush', text: 'cepillo', translation: 'escova de dente', emoji: '🪥' },
      ],
      pt: [
        { id: 'bath', text: 'banheira', translation: 'bath', emoji: '🛁' },
        { id: 'soap', text: 'sabonete', translation: 'soap', emoji: '🧼' },
        { id: 'towel', text: 'toalha', translation: 'towel', emoji: '🛁' },
        { id: 'mirror', text: 'espelho', translation: 'mirror', emoji: '🪞' },
        { id: 'toothbrush', text: 'escova', translation: 'toothbrush', emoji: '🪥' },
      ],
    },
  },
  {
    meta: {
      id: 'forest',
      title: 'Floresta',
      subtitle: 'Explorar a floresta',
      emoji: '🌲',
      group: 'nature',
      skyColor: '#1B5E20',
      groundColor: '#2E7D32',
      accentColor: '#A5D6A7',
      decor: [
        { emoji: '🌳', x: 8, y: 30, size: 40 },
        { emoji: '🌳', x: 88, y: 28, size: 36 },
        { emoji: '☁️', x: 55, y: 8, size: 30 },
      ],
      introLine: 'Aventura na floresta em 3D!',
    },
    layouts: [
      { id: 'tree', emoji: '🌳', position: { x: 26, y: 48 } },
      { id: 'bird', emoji: '🐦', position: { x: 66, y: 22 } },
      { id: 'flower', emoji: '🌸', position: { x: 46, y: 72 } },
      { id: 'sun', emoji: '☀️', position: { x: 80, y: 12 } },
      { id: 'bug', emoji: '🐛', position: { x: 56, y: 56 } },
    ],
    words: {
      en: [
        { id: 'tree', text: 'tree', translation: 'árvore', emoji: '🌳' },
        { id: 'bird', text: 'bird', translation: 'pássaro', emoji: '🐦' },
        { id: 'flower', text: 'flower', translation: 'flor', emoji: '🌸' },
        { id: 'sun', text: 'sun', translation: 'sol', emoji: '☀️' },
        { id: 'bug', text: 'bug', translation: 'inseto', emoji: '🐛' },
      ],
      de: [
        { id: 'tree', text: 'Baum', translation: 'árvore', emoji: '🌳' },
        { id: 'bird', text: 'Vogel', translation: 'pássaro', emoji: '🐦' },
        { id: 'flower', text: 'Blume', translation: 'flor', emoji: '🌸' },
        { id: 'sun', text: 'Sonne', translation: 'sol', emoji: '☀️' },
        { id: 'bug', text: 'Käfer', translation: 'inseto', emoji: '🐛' },
      ],
      it: [
        { id: 'tree', text: 'albero', translation: 'árvore', emoji: '🌳' },
        { id: 'bird', text: 'uccello', translation: 'pássaro', emoji: '🐦' },
        { id: 'flower', text: 'fiore', translation: 'flor', emoji: '🌸' },
        { id: 'sun', text: 'sole', translation: 'sol', emoji: '☀️' },
        { id: 'bug', text: 'insetto', translation: 'inseto', emoji: '🐛' },
      ],
      es: [
        { id: 'tree', text: 'árbol', translation: 'árvore', emoji: '🌳' },
        { id: 'bird', text: 'pájaro', translation: 'pássaro', emoji: '🐦' },
        { id: 'flower', text: 'flor', translation: 'flor', emoji: '🌸' },
        { id: 'sun', text: 'sol', translation: 'sol', emoji: '☀️' },
        { id: 'bug', text: 'insecto', translation: 'inseto', emoji: '🐛' },
      ],
      pt: [
        { id: 'tree', text: 'árvore', translation: 'tree', emoji: '🌳' },
        { id: 'bird', text: 'pássaro', translation: 'bird', emoji: '🐦' },
        { id: 'flower', text: 'flor', translation: 'flower', emoji: '🌸' },
        { id: 'sun', text: 'sol', translation: 'sun', emoji: '☀️' },
        { id: 'bug', text: 'inseto', translation: 'bug', emoji: '🐛' },
      ],
    },
  },
  {
    meta: {
      id: 'beach',
      title: 'Praia',
      subtitle: 'Explorar a praia',
      emoji: '🏖️',
      group: 'nature',
      skyColor: '#0277BD',
      groundColor: '#F9A825',
      accentColor: '#4FC3F7',
      decor: [
        { emoji: '☁️', x: 20, y: 10, size: 28 },
        { emoji: '☁️', x: 70, y: 8, size: 24 },
        { emoji: '🌊', x: 50, y: 38, size: 36 },
      ],
      introLine: 'Dia de praia em 3D!',
    },
    layouts: [
      { id: 'sand', emoji: '🏖️', position: { x: 50, y: 76 } },
      { id: 'sea', emoji: '🌊', position: { x: 50, y: 36 } },
      { id: 'shell', emoji: '🐚', position: { x: 28, y: 62 } },
      { id: 'ball', emoji: '⚽', position: { x: 72, y: 66 } },
      { id: 'sun', emoji: '☀️', position: { x: 78, y: 12 } },
    ],
    words: {
      en: [
        { id: 'sand', text: 'sand', translation: 'areia', emoji: '🏖️' },
        { id: 'sea', text: 'sea', translation: 'mar', emoji: '🌊' },
        { id: 'shell', text: 'shell', translation: 'concha', emoji: '🐚' },
        { id: 'ball', text: 'ball', translation: 'bola', emoji: '⚽' },
        { id: 'sun', text: 'sun', translation: 'sol', emoji: '☀️' },
      ],
      de: [
        { id: 'sand', text: 'Sand', translation: 'areia', emoji: '🏖️' },
        { id: 'sea', text: 'Meer', translation: 'mar', emoji: '🌊' },
        { id: 'shell', text: 'Muschel', translation: 'concha', emoji: '🐚' },
        { id: 'ball', text: 'Ball', translation: 'bola', emoji: '⚽' },
        { id: 'sun', text: 'Sonne', translation: 'sol', emoji: '☀️' },
      ],
      it: [
        { id: 'sand', text: 'sabbia', translation: 'areia', emoji: '🏖️' },
        { id: 'sea', text: 'mare', translation: 'mar', emoji: '🌊' },
        { id: 'shell', text: 'conchiglia', translation: 'concha', emoji: '🐚' },
        { id: 'ball', text: 'palla', translation: 'bola', emoji: '⚽' },
        { id: 'sun', text: 'sole', translation: 'sol', emoji: '☀️' },
      ],
      es: [
        { id: 'sand', text: 'arena', translation: 'areia', emoji: '🏖️' },
        { id: 'sea', text: 'mar', translation: 'mar', emoji: '🌊' },
        { id: 'shell', text: 'concha', translation: 'concha', emoji: '🐚' },
        { id: 'ball', text: 'pelota', translation: 'bola', emoji: '⚽' },
        { id: 'sun', text: 'sol', translation: 'sol', emoji: '☀️' },
      ],
      pt: [
        { id: 'sand', text: 'areia', translation: 'sand', emoji: '🏖️' },
        { id: 'sea', text: 'mar', translation: 'sea', emoji: '🌊' },
        { id: 'shell', text: 'concha', translation: 'shell', emoji: '🐚' },
        { id: 'ball', text: 'bola', translation: 'ball', emoji: '⚽' },
        { id: 'sun', text: 'sol', translation: 'sun', emoji: '☀️' },
      ],
    },
  },
  {
    meta: {
      id: 'playground',
      title: 'Parque',
      subtitle: 'Explorar o parque',
      emoji: '🎠',
      group: 'nature',
      skyColor: '#1565C0',
      groundColor: '#558B2F',
      accentColor: '#FFD54F',
      decor: [
        { emoji: '🌳', x: 10, y: 25, size: 34 },
        { emoji: '🌳', x: 90, y: 22, size: 30 },
        { emoji: '☀️', x: 75, y: 8, size: 26 },
      ],
      introLine: 'Hora de brincar no parque em 3D!',
    },
    layouts: [
      { id: 'slide', emoji: '🛝', position: { x: 28, y: 52 } },
      { id: 'swing', emoji: '🎠', position: { x: 66, y: 46 } },
      { id: 'ball', emoji: '⚽', position: { x: 50, y: 72 } },
      { id: 'tree', emoji: '🌳', position: { x: 14, y: 36 } },
      { id: 'bench', emoji: '🪑', position: { x: 82, y: 56 } },
    ],
    words: {
      en: [
        { id: 'slide', text: 'slide', translation: 'escorregador', emoji: '🛝' },
        { id: 'swing', text: 'swing', translation: 'balanço', emoji: '🎠' },
        { id: 'ball', text: 'ball', translation: 'bola', emoji: '⚽' },
        { id: 'tree', text: 'tree', translation: 'árvore', emoji: '🌳' },
        { id: 'bench', text: 'bench', translation: 'banco', emoji: '🪑' },
      ],
      de: [
        { id: 'slide', text: 'Rutsche', translation: 'escorregador', emoji: '🛝' },
        { id: 'swing', text: 'Schaukel', translation: 'balanço', emoji: '🎠' },
        { id: 'ball', text: 'Ball', translation: 'bola', emoji: '⚽' },
        { id: 'tree', text: 'Baum', translation: 'árvore', emoji: '🌳' },
        { id: 'bench', text: 'Bank', translation: 'banco', emoji: '🪑' },
      ],
      it: [
        { id: 'slide', text: 'scivolo', translation: 'escorregador', emoji: '🛝' },
        { id: 'swing', text: 'altalena', translation: 'balanço', emoji: '🎠' },
        { id: 'ball', text: 'palla', translation: 'bola', emoji: '⚽' },
        { id: 'tree', text: 'albero', translation: 'árvore', emoji: '🌳' },
        { id: 'bench', text: 'panchina', translation: 'banco', emoji: '🪑' },
      ],
      es: [
        { id: 'slide', text: 'tobogán', translation: 'escorregador', emoji: '🛝' },
        { id: 'swing', text: 'columpio', translation: 'balanço', emoji: '🎠' },
        { id: 'ball', text: 'pelota', translation: 'bola', emoji: '⚽' },
        { id: 'tree', text: 'árbol', translation: 'árvore', emoji: '🌳' },
        { id: 'bench', text: 'banco', translation: 'banco', emoji: '🪑' },
      ],
      pt: [
        { id: 'slide', text: 'escorregador', translation: 'slide', emoji: '🛝' },
        { id: 'swing', text: 'balanço', translation: 'swing', emoji: '🎠' },
        { id: 'ball', text: 'bola', translation: 'ball', emoji: '⚽' },
        { id: 'tree', text: 'árvore', translation: 'tree', emoji: '🌳' },
        { id: 'bench', text: 'banco', translation: 'bench', emoji: '🪑' },
      ],
    },
  },
  {
    meta: {
      id: 'farm',
      title: 'Fazenda',
      subtitle: 'Explorar a fazenda',
      emoji: '🚜',
      group: 'nature',
      skyColor: '#4FC3F7',
      groundColor: '#8D6E63',
      accentColor: '#FFB74D',
      decor: [
        { emoji: '☁️', x: 18, y: 10, size: 26 },
        { emoji: '☁️', x: 65, y: 12, size: 22 },
        { emoji: '🌾', x: 45, y: 78, size: 28 },
      ],
      introLine: 'Vamos à fazenda em 3D!',
    },
    layouts: [
      { id: 'cow', emoji: '🐄', position: { x: 24, y: 56 } },
      { id: 'barn', emoji: '🏠', position: { x: 72, y: 40 } },
      { id: 'tractor', emoji: '🚜', position: { x: 44, y: 66 } },
      { id: 'hay', emoji: '🌾', position: { x: 56, y: 52 } },
      { id: 'duck', emoji: '🦆', position: { x: 18, y: 72 } },
    ],
    words: {
      en: [
        { id: 'cow', text: 'cow', translation: 'vaca', emoji: '🐄' },
        { id: 'barn', text: 'barn', translation: 'celeiro', emoji: '🏠' },
        { id: 'tractor', text: 'tractor', translation: 'trator', emoji: '🚜' },
        { id: 'hay', text: 'hay', translation: 'feno', emoji: '🌾' },
        { id: 'duck', text: 'duck', translation: 'pato', emoji: '🦆' },
      ],
      de: [
        { id: 'cow', text: 'Kuh', translation: 'vaca', emoji: '🐄' },
        { id: 'barn', text: 'Scheune', translation: 'celeiro', emoji: '🏠' },
        { id: 'tractor', text: 'Traktor', translation: 'trator', emoji: '🚜' },
        { id: 'hay', text: 'Heu', translation: 'feno', emoji: '🌾' },
        { id: 'duck', text: 'Ente', translation: 'pato', emoji: '🦆' },
      ],
      it: [
        { id: 'cow', text: 'mucca', translation: 'vaca', emoji: '🐄' },
        { id: 'barn', text: 'fienile', translation: 'celeiro', emoji: '🏠' },
        { id: 'tractor', text: 'trattore', translation: 'trator', emoji: '🚜' },
        { id: 'hay', text: 'fieno', translation: 'feno', emoji: '🌾' },
        { id: 'duck', text: 'anatra', translation: 'pato', emoji: '🦆' },
      ],
      es: [
        { id: 'cow', text: 'vaca', translation: 'vaca', emoji: '🐄' },
        { id: 'barn', text: 'granero', translation: 'celeiro', emoji: '🏠' },
        { id: 'tractor', text: 'tractor', translation: 'trator', emoji: '🚜' },
        { id: 'hay', text: 'heno', translation: 'feno', emoji: '🌾' },
        { id: 'duck', text: 'pato', translation: 'pato', emoji: '🦆' },
      ],
      pt: [
        { id: 'cow', text: 'vaca', translation: 'cow', emoji: '🐄' },
        { id: 'barn', text: 'celeiro', translation: 'barn', emoji: '🏠' },
        { id: 'tractor', text: 'trator', translation: 'tractor', emoji: '🚜' },
        { id: 'hay', text: 'feno', translation: 'hay', emoji: '🌾' },
        { id: 'duck', text: 'pato', translation: 'duck', emoji: '🦆' },
      ],
    },
  },
];

export const ENVIRONMENT_IDS: EnvironmentId[] = ENVIRONMENT_DEFINITIONS.map(
  (item) => item.meta.id
);

export const ENVIRONMENT_TEMPLATES = ENVIRONMENT_DEFINITIONS.map((item) => ({
  id: `env-${item.meta.id}` as const,
  environmentId: item.meta.id,
  title: item.meta.title,
  emoji: item.meta.emoji,
  meta: item.meta,
  words: Object.fromEntries(
    ALL_LANGUAGES.map((language) => [
      language,
      withPositions(item.layouts, item.words[language]),
    ])
  ) as WordSet,
}));

export function getEnvironmentMeta(environmentId: EnvironmentId): EnvironmentMeta {
  const found = ENVIRONMENT_DEFINITIONS.find((item) => item.meta.id === environmentId);
  if (!found) throw new Error(`Ambiente não encontrado: ${environmentId}`);
  return found.meta;
}

export function getEnvironmentWords(
  environmentId: EnvironmentId,
  language: LanguageId
): Word[] {
  const found = ENVIRONMENT_TEMPLATES.find((item) => item.environmentId === environmentId);
  if (!found) return [];
  return found.words[language];
}

export function getEnvironmentsForAge(age: number): EnvironmentMeta[] {
  if (age > 3) return [];
  return ENVIRONMENT_DEFINITIONS.map((item) => item.meta);
}

export function getEnvironmentsByGroup(group: 'house' | 'nature'): EnvironmentMeta[] {
  return ENVIRONMENT_DEFINITIONS.filter((item) => item.meta.group === group).map(
    (item) => item.meta
  );
}

export function environmentLessonId(environmentId: EnvironmentId): string {
  return `env-${environmentId}`;
}
