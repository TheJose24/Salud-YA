export type Sex = 'M' | 'F';

/** Datos del paciente atendido en la posta. */
export interface Patient {
  fullName: string;
  /** Documento Nacional de Identidad / Código Único de Identificación. */
  dni: string;
  age: number;
  sex: Sex;
}
