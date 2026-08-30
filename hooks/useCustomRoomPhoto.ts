import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  clearCustomRoom,
  loadCustomRoom,
  RoomHotspot,
  saveCustomRoomHotspots,
  saveCustomRoomPhoto,
} from '@/services/customRoomStorage';
import { EnvironmentId, Word } from '@/types';
import { resizeRoomPhoto } from '@/utils/resizeRoomPhoto';

export type ExploreViewMode = '3d' | 'photo';

export function useCustomRoomPhoto(environmentId: EnvironmentId, words: Word[]) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<Record<string, RoomHotspot>>({});
  const [viewMode, setViewMode] = useState<ExploreViewMode>('3d');
  const [setupWordIndex, setSetupWordIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = loadCustomRoom(environmentId);
    if (saved) {
      setPhotoUri(saved.photoUri);
      setHotspots(saved.hotspots);
    }
  }, [environmentId]);

  const placedCount = useMemo(
    () => words.filter((w) => hotspots[w.id]).length,
    [words, hotspots]
  );

  const setupComplete = placedCount >= words.length && words.length > 0;
  const setupWord = words[setupWordIndex] ?? null;
  const isSetupMode = viewMode === 'photo' && !!photoUri && !setupComplete;

  const persistHotspots = useCallback(
    (next: Record<string, RoomHotspot>) => {
      setHotspots(next);
      saveCustomRoomHotspots(environmentId, next);
    },
    [environmentId]
  );

  const openPhotoPicker = useCallback(() => {
    setUploadError(null);
    if (Platform.OS === 'web') {
      fileInputRef.current?.click();
      return;
    }
    setUploadError('Envie a foto pelo navegador (Chrome/Edge) no computador ou celular.');
  }, []);

  const handleFileSelected = useCallback(
    async (file: File | null) => {
      if (!file || !file.type.startsWith('image/')) {
        setUploadError('Escolha uma imagem (JPG ou PNG).');
        return;
      }
      setIsUploading(true);
      setUploadError(null);
      try {
        const dataUrl = await resizeRoomPhoto(file);
        setPhotoUri(dataUrl);
        setHotspots({});
        saveCustomRoomPhoto(environmentId, dataUrl);
        saveCustomRoomHotspots(environmentId, {});
        setSetupWordIndex(0);
        setViewMode('photo');
      } catch {
        setUploadError('Não foi possível carregar a foto. Tente outra imagem.');
      } finally {
        setIsUploading(false);
      }
    },
    [environmentId]
  );

  const placeHotspot = useCallback(
    (x: number, y: number) => {
      if (!setupWord) return;
      const next = { ...hotspots, [setupWord.id]: { x, y } };
      persistHotspots(next);
      setSetupWordIndex((i) => Math.min(i + 1, words.length - 1));
    },
    [setupWord, hotspots, persistHotspots, words.length]
  );

  const resetPlacement = useCallback(() => {
    persistHotspots({});
    setSetupWordIndex(0);
  }, [persistHotspots]);

  const removePhoto = useCallback(() => {
    clearCustomRoom(environmentId);
    setPhotoUri(null);
    setHotspots({});
    setSetupWordIndex(0);
    setViewMode('3d');
  }, [environmentId]);

  return {
    photoUri,
    hotspots,
    viewMode,
    setViewMode,
    setupComplete,
    isSetupMode,
    setupWord,
    setupWordIndex,
    placedCount,
    isUploading,
    uploadError,
    fileInputRef,
    openPhotoPicker,
    handleFileSelected,
    placeHotspot,
    resetPlacement,
    removePhoto,
  };
}
