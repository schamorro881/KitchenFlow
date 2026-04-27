import { inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/api.models';

export abstract class GenericDataService<T> {
  protected api = inject(ApiService);
  protected abstract endpoint: string;

  getAll(params: any = {}): Observable<T[]> {
    return this.api.get<T[]>(this.endpoint, params);
  }

  getPaginated(pageNumber: number = 1, pageSize: number = 10, extraParams: any = {}): Observable<PaginatedList<T>> {
    return this.api.get<PaginatedList<T>>(this.endpoint, { pageNumber, pageSize, ...extraParams });
  }

  getById(id: string): Observable<T> {
    return this.api.get<T>(`${this.endpoint}/${id}`);
  }

  create(entity: Partial<T>): Observable<any> {
    return this.api.post<any>(this.endpoint, entity);
  }

  update(id: string, entity: Partial<T>): Observable<void> {
    return this.api.put<void>(`${this.endpoint}/${id}`, { ...entity, id });
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
