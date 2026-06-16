import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../services/auth.service';

@Component({
  selector: 'app-triaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triaje.component.html',
  styleUrl: './triaje.component.css',
})
export class TriajeComponent {
  currentUser: Account | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  startTriaje(): void {
    // Esta función puede expandirse para ir a un componente de triaje completo
    console.log('Iniciando triaje para:', this.currentUser?.codigo);
    // this.router.navigate(['/triaje-form']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
