import { useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
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
  onFileSelected: (file: File | null) => void;
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
  onFileSelected,
  onSwitch3d,
  onSwitchPhoto,
  onResetPlacement,
  onRemovePhoto,
}: RoomPhotoUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  return (
    <View style={[styles.box, !hasPhoto && styles.boxHighlight]}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => {
          onFileSelected(e.target.files?.[0] ?? null);
          e.target.value = '';
        }}
      />

      <Text style={styles.step}>PASSO 1</Text>
      <Text style={styles.title}>📷 Foto do seu quarto real</Text>
      <Text style={styles.hint}>
        {hasPhoto
          ? setupComplete
            ? 'Sua foto está pronta! Toque nos objetos para praticar inglês.'
            : `Marque ${totalWords} objetos na foto (cama, abajur, etc.) tocando onde estão.`
          : 'Envie uma foto do quarto da criança. Depois você marca cada objeto na imagem.'}
      </Text>

      <View style={styles.row}>
        <TechButton
          label={isUploading ? 'Carregando...' : hasPhoto ? 'Trocar foto' : 'Enviar foto'}
          emoji={isUploading ? '⏳' : '📷'}
          variant={hasPhoto ? 'secondary' : 'primary'}
          onPress={openPicker}
          disabled={isUploading}
          style={styles.btnPrimary}
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

      {isUploading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingText}>Preparando sua foto...</Text>
        </View>
      ) : null}

      {hasPhoto ? (
        <Text style={styles.status}>
          {setupComplete
            ? `✅ ${placedCount} objetos marcados — pronto para explorar!`
            : `📍 ${placedCount}/${totalWords} objetos marcados na foto`}
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
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  boxHighlight: {
    borderColor: COLORS.secondary,
    backgroundColor: 'rgba(255,61,0,0.06)',
  },
  step: {
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.secondary,
    fontWeight: '800',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
  },
  hint: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  btnPrimary: {
    minWidth: 180,
    flex: 1,
  },
  btn: {
    minWidth: 130,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  loadingText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  status: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  error: {
    marginTop: 10,
    color: '#E53935',
    fontSize: 13,
    fontWeight: '700',
  },
  remove: {
    marginTop: 10,
    color: COLORS.textLight,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
