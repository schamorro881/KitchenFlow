import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // 1. Rutas de Autenticación (Sin Layout)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
/*  {
    path: 'register',
    //loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  }, */

  // 2. Rutas con Layout (El simulador y futuras herramientas)
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'simulator',
        loadComponent: () => import('./features/kitchen-simulator/kitchen-simulator.component').then(m => m.KitchenSimulatorComponent)
      },
      // Aquí podés agregar más rutas "hijas" que compartan el mismo Layout
      {
        path: '',
        redirectTo: 'simulator',
        pathMatch: 'full'
      }
    ]
  },

  // 3. Comodín (Redirect por si el usuario escribe cualquier cosa)
  {
    path: '**',
    redirectTo: 'simulator'
  }
];