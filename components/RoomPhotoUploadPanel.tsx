import { Platform, StyleSheet, Text, View } from 'react-native';
import { TechButton } from '@/components/TechButton';
import { COLORS } from '@/constants';

interface RoomPhotoUploadPanelProps {
  hasPhoto: boolean;
  viewMode: '3d' | 'photo';
  setupComplete: boolean;
  placedCount: number;
  totalWords: number;
  isUploading: boolean;
  uploadError: string | null;
  onUpload: () => void;
  onSwitch3d: () => void;
  onSwitchPhoto: () => void;
  onResetPlacement: () => void;
  onRemovePhoto: () => void;
}

export function RoomPhotoUploadPanel({
  hasPhoto,
  viewMode,
  setupComplete,
  placedCount,
  totalWords,
  isUploading,
  uploadError,
  onUpload,
  onSwitch3d,
  onSwitchPhoto,
  onResetPlacement,
  onRemovePhoto,
}: RoomPhotoUploadPanelProps) {
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.box}>
        <Text style={styles.title}>📷 Quarto real</Text>
        <Text style={styles.hint}>
          Abra o site no Chrome ou Edge para enviar uma foto do quarto e marcar os objetos.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <Text style={styles.title}>📷 Seu ambiente real</Text>
      <Text style={styles.hint}>
        Envie uma foto do quarto e toque nos objetos para colocar os nomes em inglês.
      </Text>

      <View style={styles.row}>
        <TechButton
          label={hasPhoto ? 'Trocar foto' : 'Enviar foto'}
          emoji="📷"
          variant="secondary"
          onPress={onUpload}
          disabled={isUploading}
          style={styles.btn}
        />
        {hasPhoto ? (
          <>
            <TechButton
              label={viewMode === 'photo' ? 'Mundo 3D' : 'Minha foto'}
              emoji={viewMode === 'photo' ? '🎮' : '🏠'}
              onPress={viewMode === 'photo' ? onSwitch3d : onSwitchPhoto}
              style={styles.btn}
            />
            {setupComplete ? (
              <TechButton
                label="Recolocar"
                emoji="📍"
                variant="secondary"
                onPress={onResetPlacement}
                style={styles.btn}
              />
            ) : null}
          </>
        ) : null}
      </View>

      {hasPhoto ? (
        <Text style={styles.status}>
          {setupComplete
            ? `${placedCount} objetos marcados — pronto para explorar!`
            : `${placedCount}/${totalWords} objetos marcados na foto`}
        </Text>
      ) : null}

      {uploadError ? <Text style={styles.error}>{uploadError}</Text> : null}

      {hasPhoto ? (
        <Text style={styles.remove} onPress={onRemovePhoto}>
          Remover foto
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
  },
  hint: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  btn: {
    minWidth: 140,
  },
  status: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  error: {
    marginTop: 8,
    color: '#E53935',
    fontSize: 13,
  },
  remove: {
    marginTop: 10,
    color: COLORS.textLight,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
