import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { Dish } from '../../../core/models/dish.model';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss'
})
export class OrderCreateComponent implements OnInit {
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);

  dishes = signal<Dish[]>([]);
  selectedDish = signal<Dish | null>(null);
  
  orderForm: FormGroup;
  isSubmitting = signal(false);

  // orderId asignado dinámicamente
  currentOrderId: number | null = null;
  availableOrders = signal<any[]>([]);

  notifications = signal<{id: number, type: 'success'|'error', message: string}[]>([]);
  private nextNotifId = 0;

  constructor() {
    this.orderForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  ngOnInit() {
    this.orderService.getDishes().subscribe({
      next: (data) => this.dishes.set(data),
      error: (err) => console.error("Error fetching dishes", err)
    });

    this.orderService.getActiveOrders().subscribe({
      next: (orders) => {
        this.availableOrders.set(orders);
        if (orders.length > 0) {
          this.currentOrderId = orders[0].id;
        } else {
          this.addNotification('error', 'No se encontraron mesas/órdenes activas en la BD.');
        }
      },
      error: (err) => console.error("Error fetching orders", err)
    });
  }

  selectDish(dish: Dish) {
    this.selectedDish.set(dish);
    this.orderForm.reset({ quantity: 1, notes: '' });
  }

  closePanel() {
    this.selectedDish.set(null);
  }

  onSubmit() {
    if (this.orderForm.invalid || !this.selectedDish() || !this.currentOrderId) {
      if (!this.currentOrderId) this.addNotification('error', 'No hay una mesa seleccionada.');
      return;
    }

    this.isSubmitting.set(true);
    const dish = this.selectedDish()!;
    const formValue = this.orderForm.value;

    const request = {
      dishId: dish.id,
      quantity: formValue.quantity,
      notes: formValue.notes || ''
    };

    this.orderService.addItemToOrder(this.currentOrderId, request).subscribe({
      next: (itemId) => {
        this.addNotification('success', `¡${formValue.quantity}x ${dish.name} enviado a la Mesa ${this.currentOrderId}!`);
        this.isSubmitting.set(false);
        this.closePanel();
      },
      error: (err) => {
        console.error(err);
        this.addNotification('error', `Error al enviar ${dish.name}. Verifica que el backend esté corriendo.`);
        this.isSubmitting.set(false);
      }
    });
  }

  private addNotification(type: 'success' | 'error', message: string) {
    const id = this.nextNotifId++;
    this.notifications.update(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      this.notifications.update(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }
}

