export type AgeGroupId = '3-4' | '4-5' | '5-6';

export type LanguageId = 'en' | 'de' | 'it' | 'es' | 'pt';

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  minAge: number;
  maxAge: number;
  description: string;
  emoji: string;
}

export interface StudentAge {
  age: number;
  ageGroupId: AgeGroupId;
}

export interface Word {
  id: string;
  text: string;
  translation: string;
  emoji: string;
  hint?: string;
  /** Posição no cenário de exploração (% da largura/altura) */
  position?: { x: number; y: number };
}

export type LessonKind = 'theme' | 'environment';

export type EnvironmentId =
  | 'bedroom'
  | 'kitchen'
  | 'living-room'
  | 'bathroom'
  | 'forest'
  | 'beach'
  | 'playground'
  | 'farm';

export interface EnvironmentMeta {
  id: EnvironmentId;
  title: string;
  subtitle: string;
  emoji: string;
  group: 'house' | 'nature';
  skyColor: string;
  groundColor: string;
  accentColor: string;
  decor: { emoji: string; x: number; y: number; size?: number }[];
  introLine: string;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  ageGroupId: AgeGroupId;
  language: LanguageId;
  words: Word[];
  kind?: LessonKind;
  environmentId?: EnvironmentId;
}

export type PronunciationResult = 'excellent' | 'good' | 'try_again';

export interface PronunciationFeedback {
  result: PronunciationResult;
  score: number;
  message: string;
  encouragement: string;
  heard?: string;
  target?: string;
}

export interface StudentProfile {
  name: string;
  age: number;
  ageGroupId: AgeGroupId;
}
