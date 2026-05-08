import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="login-page">
      <div class="deco-blob deco-1"></div>
      <div class="deco-blob deco-2"></div>

      <div class="login-card">
        <div class="brand">
          <div class="brand-icon">ðŸ³</div>
          <h1><span class="accent">Kitchen</span>Flow</h1>
          <p>Bienvenido de vuelta, chef</p>
        </div>

        <div class="form-placeholder">
          <div class="input-group">
            <label>Usuario</label>
            <input type="text" placeholder="tu@restaurante.com" />
          </div>
          <div class="input-group">
            <label>ContraseÃ±a</label>
            <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
          </div>
          <button class="btn-primary">Ingresar a la Cocina</button>
          <p class="coming-soon">ðŸš€ Sistema de autenticaciÃ³n en desarrollo</p>
        </div>
      </div>

      <div class="promo-panel">
        <div class="promo-content">
          <div class="promo-badge">Nuevo</div>
          <h2>Gestiona tu cocina<br/><span class="accent">en tiempo real</span></h2>
          <p>Control total de estaciones, temperaturas y comandas desde un solo lugar.</p>
          <div class="feature-list">
            <div class="feature-item">âœ… Simulador de cocina en vivo</div>
            <div class="feature-item">âœ… Punto de venta integrado</div>
            <div class="feature-item">âœ… Notificaciones en tiempo real</div>
          </div>
        </div>
        <div class="food-decoration">ðŸ•ðŸ”ðŸ¥—ðŸœ</div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: var(--kf-cream, #FFF8F0);
      display: flex;
      align-items: stretch;
      position: relative;
      overflow: hidden;
    }

    .deco-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.25;
      pointer-events: none;
    }
    .deco-1 {
      width: 500px; height: 500px;
      background: #FF6B35;
      top: -100px; left: -100px;
    }
    .deco-2 {
      width: 350px; height: 350px;
      background: #F4C430;
      bottom: -80px; right: 400px;
    }

    .login-card {
      width: 480px;
      min-height: 100vh;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem 3.5rem;
      box-shadow: 4px 0 30px rgba(61, 26, 0, 0.08);
      position: relative;
      z-index: 1;
    }

    .brand {
      text-align: center;
      margin-bottom: 3rem;

      .brand-icon {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #FF6B35, #E85520);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 1.25rem;
        box-shadow: 0 8px 24px rgba(255, 107, 53, 0.35);
      }

      h1 {
        margin: 0 0 0.5rem;
        font-size: 2rem;
        font-weight: 900;
        color: #2D1B0E;
      }

      p {
        color: #8B6A52;
        margin: 0;
        font-weight: 500;
      }
    }

    .accent { color: #FF6B35; }

    .form-placeholder {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-weight: 700;
        font-size: 0.875rem;
        color: #2D1B0E;
      }

      input {
        padding: 1rem 1.25rem;
        border: 2px solid #EDD5BC;
        border-radius: 14px;
        font-size: 1rem;
        font-family: 'Nunito', sans-serif;
        color: #2D1B0E;
        background: #FFFAF6;
        transition: all 0.2s;
        outline: none;

        &::placeholder { color: #C4A882; }

        &:focus {
          border-color: #FF6B35;
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
          background: white;
        }
      }
    }

    .btn-primary {
      padding: 1.1rem;
      background: linear-gradient(135deg, #FF6B35, #E85520);
      color: white;
      border: none;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 700;
      font-family: 'Nunito', sans-serif;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(255, 107, 53, 0.35);
      transition: all 0.25s;
      margin-top: 0.5rem;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(255, 107, 53, 0.45);
      }
    }

    .coming-soon {
      text-align: center;
      font-size: 0.8rem;
      color: #8B6A52;
      margin: 0;
      padding: 0.75rem;
      background: #FFF0E8;
      border-radius: 10px;
    }

    .promo-panel {
      flex: 1;
      background: linear-gradient(145deg, #FF6B35 0%, #E85520 50%, #C0392B 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 4rem;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -100px; right: -100px;
        width: 400px; height: 400px;
        background: rgba(255,255,255,0.05);
        border-radius: 50%;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -80px; left: -80px;
        width: 300px; height: 300px;
        background: rgba(255,255,255,0.05);
        border-radius: 50%;
      }
    }

    .promo-content {
      position: relative;
      z-index: 1;
      max-width: 500px;
    }

    .promo-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 0.35rem 1rem;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255,255,255,0.3);
    }

    .promo-content h2 {
      font-size: 3rem;
      font-weight: 900;
      color: white;
      line-height: 1.15;
      margin: 0 0 1.25rem;

      .accent { color: #FFE0A3; }
    }

    .promo-content p {
      color: rgba(255,255,255,0.8);
      font-size: 1.1rem;
      margin: 0 0 2rem;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .feature-item {
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }

    .food-decoration {
      font-size: 6rem;
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      opacity: 0.15;
      z-index: 0;
      letter-spacing: 0.5rem;
    }
  `]
})
export class LoginComponent {}

