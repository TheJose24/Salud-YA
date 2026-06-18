/** Nivel de triaje según el protocolo de clasificación por colores. */
export enum TriageLevel {
  /** Urgente — requiere derivación / atención inmediata. */
  Red = 'RED',
  /** Programada — monitoreo y derivación programada. */
  Yellow = 'YELLOW',
  /** Ambulatorio — seguimiento, no requiere derivación inmediata. */
  Green = 'GREEN',
}
