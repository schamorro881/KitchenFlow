import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-box">
      <h2>Login</h2>
      <p>Login functionality coming soon...</p>
    </div>
  `,
  styles: [`
    .login-box { max-width: 400px; margin: 4rem auto; padding: 2rem; background: #fff; border: 1px solid #ddd; }
  `]
})
export class LoginComponent {}
