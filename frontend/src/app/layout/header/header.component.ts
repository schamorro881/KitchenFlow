import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="logo">
        <a routerLink="/"><span class="logo-accent">Kitchen</span>Flow</a>
      </div>
      <nav class="nav">
        @if (auth.isAuthenticated()) {
          <div class="user-pill">
            <span class="user">{{ auth.currentUser()?.userName }}</span>
            <button class="logout-btn" (click)="auth.logout()">Salir</button>
          </div>
        } @else {
          <a routerLink="/login" routerLinkActive="active" class="login-link">Acceso Portal</a>
        }
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 2rem;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo a {
      font-size: 1.25rem;
      font-weight: 900;
      color: white;
      text-decoration: none;
      letter-spacing: -0.5px;
    }
    .logo-accent { color: #6366f1; }
    .nav { display: flex; align-items: center; }
    .login-link {
        background: rgba(99, 102, 241, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 10px;
        color: #818cf8 !important;
        font-weight: 600;
        border: 1px solid rgba(99, 102, 241, 0.2);
        transition: all 0.3s ease;
        &:hover { background: rgba(99, 102, 241, 0.2); transform: translateY(-2px); }
    }
    .user-pill {
        background: rgba(255, 255, 255, 0.05);
        padding: 0.25rem 0.25rem 0.25rem 1rem;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .user { font-size: 0.875rem; font-weight: 600; color: #e2e8f0; }
    .logout-btn {
        background: #ef4444;
        color: white;
        border: none;
        padding: 0.4rem 1rem;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 700;
        cursor: pointer;
        transition: opacity 0.2s;
        &:hover { opacity: 0.9; }
    }
  `]
})
export class HeaderComponent {
  auth = inject(AuthService);
}
