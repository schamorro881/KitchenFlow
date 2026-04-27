import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'; // Importamos tu header

@Component({
  selector: 'app-layout',
  standalone: true,
  // ¡Acá le decimos a Angular qué otras piezas usamos en el HTML!
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}