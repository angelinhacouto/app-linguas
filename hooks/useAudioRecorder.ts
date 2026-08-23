import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

export function useAudioRecorder() {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        setError('Precisamos de permissão para usar o microfone.');
        return false;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      return true;
    } catch {
      setError('Não foi possível acessar o microfone.');
      return false;
    }
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    const hasPermission = await requestPermission();
    if (!hasPermission) return false;

    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      const recording = new Audio.Recording();

      const options = Platform.select({
        web: Audio.RecordingOptionsPresets.HIGH_QUALITY,
        default: Audio.RecordingOptionsPresets.HIGH_QUALITY,
      });

      await recording.prepareToRecordAsync(options!);
      await recording.startAsync();
      recordingRef.current = recording;
      setIsRecording(true);
      return true;
    } catch {
      setError('Erro ao iniciar gravação.');
      setIsRecording(false);
      return false;
    }
  }, [requestPermission]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!recordingRef.current) return null;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      setIsRecording(false);
      setAudioUri(uri);
      return uri;
    } catch {
      setError('Erro ao parar gravação.');
      setIsRecording(false);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setAudioUri(null);
    setError(null);
  }, []);

  return {
    isRecording,
    audioUri,
    error,
    startRecording,
    stopRecording,
    reset,
  };
}
