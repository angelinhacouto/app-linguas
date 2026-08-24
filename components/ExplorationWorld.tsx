import { ExplorationArena } from '@/components/ExplorationArena';
import { EnvironmentMeta, Word } from '@/types';

export interface ExplorationWorldProps {
  environment: EnvironmentMeta;
  words: Word[];
  discoveredIds: Set<string>;
  practicedIds: Set<string>;
  activeWordId?: string | null;
  onObjectSelect: (word: Word) => void;
}

/** Fallback nativo: arena 2D com os mesmos callbacks do mundo 3D web. */
export function ExplorationWorld({
  environment,
  words,
  discoveredIds,
  practicedIds,
  activeWordId,
  onObjectSelect,
}: ExplorationWorldProps) {
  return (
    <ExplorationArena
      environment={environment}
      words={words}
      discoveredIds={discoveredIds}
      practicedIds={practicedIds}
      activeWordId={activeWordId}
      onWordPress={onObjectSelect}
    />
  );
}
