import { EnvironmentId } from '@/types';

export interface RoomHotspot {
  x: number;
  y: number;
}

export interface CustomRoomData {
  photoUri: string;
  hotspots: Record<string, RoomHotspot>;
}

const photoKey = (envId: EnvironmentId) => `linguas-room-photo-${envId}`;
const hotspotsKey = (envId: EnvironmentId) => `linguas-room-hotspots-${envId}`;

export function loadCustomRoom(envId: EnvironmentId): CustomRoomData | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const photoUri = localStorage.getItem(photoKey(envId));
    if (!photoUri) return null;
    const raw = localStorage.getItem(hotspotsKey(envId));
    const hotspots = raw ? (JSON.parse(raw) as Record<string, RoomHotspot>) : {};
    return { photoUri, hotspots };
  } catch {
    return null;
  }
}

export function saveCustomRoomPhoto(envId: EnvironmentId, photoUri: string) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(photoKey(envId), photoUri);
}

export function saveCustomRoomHotspots(envId: EnvironmentId, hotspots: Record<string, RoomHotspot>) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(hotspotsKey(envId), JSON.stringify(hotspots));
}

export function clearCustomRoom(envId: EnvironmentId) {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(photoKey(envId));
  localStorage.removeItem(hotspotsKey(envId));
}
