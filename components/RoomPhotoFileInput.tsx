import { RefObject } from 'react';

export interface RoomPhotoFileInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onFile: (file: File | null) => void;
}

export function RoomPhotoFileInput(_props: RoomPhotoFileInputProps) {
  return null;
}
