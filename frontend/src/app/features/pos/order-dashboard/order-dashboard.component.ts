import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-dashboard.component.html',
  styleUrl: './order-dashboard.component.scss'
})
export class OrderDashboardComponent {
  // Mock data for skeleton
  activeOrders = signal([
    { id: 101, tableNumber: 3, status: 'Active', itemCount: 4, total: 45.99, timeElapsed: '15m' },
    { id: 102, tableNumber: 5, status: 'Pending', itemCount: 2, total: 24.50, timeElapsed: '5m' },
    { id: 103, tableNumber: 1, status: 'Ready', itemCount: 6, total: 89.00, timeElapsed: '32m' },
  ]);

  isCreatingOrder = signal(false);

  openCreatePanel() {
    this.isCreatingOrder.set(true);
  }

  closeCreatePanel() {
    this.isCreatingOrder.set(false);
  }
}
