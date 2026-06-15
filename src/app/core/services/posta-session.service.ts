import { Injectable, signal } from '@angular/core';
import { Posta } from '../models/posta.model';

/** Posta y operador de la sesión actual (mock POSTA001). */
@Injectable({ providedIn: 'root' })
export class PostaSessionService {
  private readonly _posta = signal<Posta>({
    code: 'POSTA001',
    name: 'Posta Médica Huancavelica Norte',
    operator: 'María López',
  });

  readonly posta = this._posta.asReadonly();
}
