import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Account {
  codigo: string;
  pin: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accounts: Account[] = [
    { codigo: 'POSTA001', pin: '1234', nombre: 'Posta Médica 001' },
    { codigo: 'POSTA002', pin: '5678', nombre: 'Posta Médica 002' },
    { codigo: 'POSTA003', pin: '9012', nombre: 'Posta Médica 003' },
  ];

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<Account | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const user = JSON.parse(stored);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(codigo: string, pin: string): boolean {
    const account = this.accounts.find(
      acc => acc.codigo === codigo.toUpperCase() && acc.pin === pin
    );

    if (account) {
      this.currentUserSubject.next(account);
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('currentUser', JSON.stringify(account));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): Account | null {
    return this.currentUserSubject.value;
  }

  getTestAccounts(): Account[] {
    return this.accounts;
  }
}
