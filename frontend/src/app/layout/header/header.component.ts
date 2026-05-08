import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <a routerLink="/" class="logo">
        <div class="logo-icon">KF</div>
        <span><span class="logo-accent">Kitchen</span>Flow</span>
      </a>

      <nav class="main-nav">
        <a routerLink="/simulator" routerLinkActive="active" class="nav-link">Simulador</a>
        <a routerLink="/orders" routerLinkActive="active" class="nav-link">Punto de Venta</a>
      </nav>

      <nav class="nav-actions">
        @if (auth.isAuthenticated()) {
          <div class="user-pill">
            <div class="user-avatar">{{ auth.currentUser()?.userName?.charAt(0)?.toUpperCase() }}</div>
            <span class="user-name">{{ auth.currentUser()?.userName }}</span>
            <button class="logout-btn" (click)="auth.logout()">Salir</button>
          </div>
        } @else {
          <a routerLink="/login" class="cta-btn">Iniciar Sesion</a>
        }
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 3rem;
      background: rgba(255, 248, 240, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 2px solid rgba(255, 107, 53, 0.12);
      position: sticky;
      top: 0;
      z-index: 50;
      gap: 2rem;
      font-family: 'Nunito', sans-serif;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 900;
      color: #2D1B0E;
      letter-spacing: -0.5px;
      font-family: 'Nunito', sans-serif;
    }

    .logo-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #FF6B35, #E85520);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 900;
      color: white;
      letter-spacing: -0.5px;
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.35);
      flex-shrink: 0;
    }

    .logo-accent { color: #FF6B35; }

    .main-nav {
      display: flex;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      padding: 0.6rem 1.25rem;
      border-radius: 50px;
      color: #7A4419;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s ease;
      font-family: 'Nunito', sans-serif;

      &:hover {
        background: rgba(255, 107, 53, 0.08);
        color: #FF6B35;
      }

      &.active {
        background: #FF6B35;
        color: white;
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
      }
    }

    .nav-actions { display: flex; align-items: center; }

    .cta-btn {
      background: linear-gradient(135deg, #FF6B35, #E85520);
      color: white;
      padding: 0.65rem 1.5rem;
      border-radius: 50px;
      font-weight: 800;
      font-size: 0.9rem;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(255, 107, 53, 0.35);
      transition: all 0.2s;
      font-family: 'Nunito', sans-serif;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
      }
    }

    .user-pill {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: white;
      padding: 0.4rem 0.75rem 0.4rem 0.4rem;
      border-radius: 50px;
      border: 1px solid #EDD5BC;
      box-shadow: 0 2px 8px rgba(61, 26, 0, 0.08);
    }

    .user-avatar {
      width: 34px;
      height: 34px;
      background: linear-gradient(135deg, #FF6B35, #E85520);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 900;
      font-size: 0.875rem;
    }

    .user-name {
      font-weight: 700;
      font-size: 0.875rem;
      color: #2D1B0E;
    }

    .logout-btn {
      background: #FFF0E8;
      border: none;
      color: #FF6B35;
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-weight: 800;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Nunito', sans-serif;

      &:hover {
        background: #FF6B35;
        color: white;
      }
    }
  `]
})
export class HeaderComponent {
  auth = inject(AuthService);
}
