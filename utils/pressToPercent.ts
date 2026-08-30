import { GestureResponderEvent, Platform } from 'react-native';

export interface PressLayout {
  width: number;
  height: number;
}

/** Converte toque/clique em coordenadas % dentro do quadro (web + nativo). */
export function pressToPercent(
  event: GestureResponderEvent,
  layout: PressLayout,
  element?: unknown
): { x: number; y: number } | null {
  const { width, height } = layout;
  if (width <= 0 || height <= 0) return null;

  const nativeEvent = event.nativeEvent as {
    locationX?: number;
    locationY?: number;
    pageX?: number;
    pageY?: number;
    clientX?: number;
    clientY?: number;
  };

  let localX = nativeEvent.locationX ?? 0;
  let localY = nativeEvent.locationY ?? 0;

  if (Platform.OS === 'web') {
    const dom = element as HTMLElement | null | undefined;
    if (dom?.getBoundingClientRect) {
      const rect = dom.getBoundingClientRect();
      const pageX = nativeEvent.pageX ?? nativeEvent.clientX;
      const pageY = nativeEvent.pageY ?? nativeEvent.clientY;
      if (pageX != null && pageY != null) {
        localX = pageX - rect.left;
        localY = pageY - rect.top;
      }
    }
  }

  return {
    x: Math.max(4, Math.min(96, (localX / width) * 100)),
    y: Math.max(4, Math.min(96, (localY / height) * 100)),
  };
}
