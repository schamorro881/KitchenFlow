import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Dish } from '../models/dish.model';
import { MOCK_DISHES } from '../mocks/dishes.mock';
import { AddItemRequest } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  // URL hardcodeada por ahora, se puede pasar a environment.ts luego
  private apiUrl = 'http://localhost:5062/api';

  getDishes(): Observable<Dish[]> {
    // Retornamos el array de mocks como si viniera del backend
    return of(MOCK_DISHES);
  }

  getActiveOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Orders`);
  }

  addItemToOrder(orderId: number, request: AddItemRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/Orders/${orderId}/items`, request);
  }
}

