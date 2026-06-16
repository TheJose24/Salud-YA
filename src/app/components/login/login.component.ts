import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  codigo = signal('');
  pin = signal('');
  errorMessage = signal('');
  isLoading = signal(false);
  showTestAccounts = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage.set('');

    if (!this.codigo().trim() || !this.pin().trim()) {
      this.errorMessage.set('Por favor completa todos los campos');
      return;
    }

    if (this.pin().length !== 4) {
      this.errorMessage.set('El PIN debe tener 4 dígitos');
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      const success = this.authService.login(this.codigo(), this.pin());

      if (success) {
        this.router.navigate(['/triaje']);
      } else {
        this.errorMessage.set('Código o PIN incorrecto');
      }

      this.isLoading.set(false);
    }, 500);
  }

  toggleTestAccounts(): void {
    this.showTestAccounts.update(value => !value);
  }

  copyAccount(codigo: string, pin: string): void {
    this.codigo.set(codigo);
    this.pin.set(pin);
    this.showTestAccounts.set(false);
  }
}
