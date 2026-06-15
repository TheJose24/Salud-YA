/** Tamaño de texto de la app (accesibilidad). Escala el font-size raíz. */
export type TextSize = 'normal' | 'large' | 'xlarge';

/** Ajustes persistentes de la posta. */
export interface PostaSettings {
  /** Volumen de la voz (Web Speech), 0–100. */
  voiceVolume: number;
  textSize: TextSize;
  /** PIN de administrador (4 dígitos). Mock de demo. */
  adminPin: string;
}

/** Valor en píxeles del font-size raíz por cada tamaño de texto. */
export const ROOT_FONT_SIZE: Record<TextSize, string> = {
  normal: '16px',
  large: '18px',
  xlarge: '20px',
};

export const DEFAULT_SETTINGS: PostaSettings = {
  voiceVolume: 80,
  textSize: 'normal',
  adminPin: '1234',
};

export const SETTINGS_STORAGE_KEY = 'salud-ya.settings';
