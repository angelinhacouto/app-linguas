export type AgeGroupId = '3-4' | '4-5' | '5-6';

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  minAge: number;
  maxAge: number;
  description: string;
  emoji: string;
}

export interface Word {
  id: string;
  text: string;
  translation: string;
  emoji: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  ageGroupId: AgeGroupId;
  language: string;
  words: Word[];
}

export type PronunciationResult = 'excellent' | 'good' | 'try_again';

export interface PronunciationFeedback {
  result: PronunciationResult;
  score: number;
  message: string;
  encouragement: string;
}
