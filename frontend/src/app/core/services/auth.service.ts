import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { User, Result } from '../models/api.models';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  
  currentUser = signal<User | null>(this.getUserFromStorage());
  isAuthenticated = signal<boolean>(!!this.currentUser());

  login(credentials: any) {
    return this.api.post<User>('auth/login', credentials).pipe(
      tap(user => this.setCurrentUser(user))
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  private setCurrentUser(user: User) {
    if (user.token) {
      localStorage.setItem('token', user.token);
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
