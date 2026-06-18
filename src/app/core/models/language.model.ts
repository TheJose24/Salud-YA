/** Idiomas soportados por la app. */
export type LanguageCode = 'es' | 'qu' | 'ay';

export interface Language {
  code: LanguageCode;
  /** Nombre del idioma en su forma nativa (lo que ve el hablante). */
  nativeName: string;
  /** Nombre del idioma en español (referencia para el operador). */
  spanishName: string;
  /** Ícono RemixIcon representativo. */
  icon: string;
}

/** Catálogo de idiomas disponibles para el selector. */
export const AVAILABLE_LANGUAGES: readonly Language[] = [
  { code: 'es', nativeName: 'Español', spanishName: 'Español', icon: 'ri-translate-2' },
  { code: 'qu', nativeName: 'Runasimi', spanishName: 'Quechua', icon: 'ri-translate-2' },
  { code: 'ay', nativeName: 'Aymar aru', spanishName: 'Aymara', icon: 'ri-translate-2' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'es';

/** Clave de localStorage donde persistimos la preferencia de idioma. */
export const LANGUAGE_STORAGE_KEY = 'salud-ya.language';
