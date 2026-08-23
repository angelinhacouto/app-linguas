import { LANGUAGES } from '@/constants/languages';
import { ENVIRONMENT_TEMPLATES } from '@/data/environments';
import { ALL_LANGUAGES, LESSON_TEMPLATES } from '@/data/wordSets';
import { AgeGroupId, LanguageId, Lesson } from '@/types';

const THEME_LESSONS: Lesson[] = ALL_LANGUAGES.flatMap((language) =>
  LESSON_TEMPLATES.map((template) => ({
    id: template.id,
    title: template.title,
    emoji: template.emoji,
    ageGroupId: '3-4' as AgeGroupId,
    language,
    words: template.words[language],
    kind: 'theme' as const,
  }))
);

const ENVIRONMENT_LESSONS: Lesson[] = ALL_LANGUAGES.flatMap((language) =>
  ENVIRONMENT_TEMPLATES.map((template) => ({
    id: template.id,
    title: template.title,
    emoji: template.emoji,
    ageGroupId: '3-4' as AgeGroupId,
    language,
    words: template.words[language],
    kind: 'environment' as const,
    environmentId: template.environmentId,
  }))
);

export const LESSONS: Lesson[] = [...THEME_LESSONS, ...ENVIRONMENT_LESSONS];

export function getLessonsByAge(ageGroupId: string, language: LanguageId): Lesson[] {
  return LESSONS.filter(
    (lesson) => lesson.ageGroupId === ageGroupId && lesson.language === language
  );
}

export function getLessonById(lessonId: string, language: LanguageId): Lesson | undefined {
  return LESSONS.find(
    (lesson) => lesson.id === lessonId && lesson.language === language
  );
}

export { LANGUAGES };
