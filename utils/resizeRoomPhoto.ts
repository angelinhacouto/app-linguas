/** Fallback nativo — retorna data URL básica se necessário no futuro. */
export async function resizeRoomPhoto(_file: File): Promise<string> {
  throw new Error('Envio de foto disponível na versão web.');
}
