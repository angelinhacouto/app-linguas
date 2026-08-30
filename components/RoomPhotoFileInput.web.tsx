import { RoomPhotoFileInputProps } from '@/components/RoomPhotoFileInput';

export function RoomPhotoFileInput({ inputRef, onFile }: RoomPhotoFileInputProps) {
  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => {
        onFile(e.target.files?.[0] ?? null);
        e.target.value = '';
      }}
    />
  );
}
