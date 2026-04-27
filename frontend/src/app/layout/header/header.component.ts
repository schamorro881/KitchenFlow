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
        <a routerLink="/">KitchenFlow</a>
      </div>
      <nav class="nav">
        @if (auth.isAuthenticated()) {
          <span class="user">{{ auth.currentUser()?.userName }}</span>
          <button (click)="auth.logout()">Logout</button>
        } @else {
          <a routerLink="/login" routerLinkActive="active">Login</a>
        }
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #1a1a1a;
      color: white;
    }
    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ff9800;
      text-decoration: none;
    }
    .nav a {
      color: white;
      text-decoration: none;
      margin-left: 1.5rem;
    }
    .nav a.active {
      color: #ff9800;
    }
    .user { margin-left: 1.5rem; color: #ccc; }
    button { margin-left: 1rem; background: transparent; border: 1px solid #ff9800; color: #ff9800; cursor: pointer; padding: 0.2rem 0.5rem; }
  `]
})
export class HeaderComponent {
  auth = inject(AuthService);
}
