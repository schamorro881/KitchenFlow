import { Dish } from '../models/dish.model';

export const MOCK_DISHES: Dish[] = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Hamburguesa jugosa con lechuga, tomate, queso y salsa especial.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    category: 'Principales'
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    description: 'Pizza tradicional con tomate fresco, queso mozzarella y albahaca.',
    price: 14.50,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    category: 'Principales'
  },
  {
    id: 3,
    name: 'Ensalada Cesar',
    description: 'Lechuga romana fresca, queso parmesano, crutones y aderezo Cesar.',
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80',
    category: 'Entradas'
  },
  {
    id: 4,
    name: 'Salmon a la Parrilla',
    description: 'Filete de salmon a la parrilla con vegetales de temporada.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=500&q=80',
    category: 'Principales'
  },
  {
    id: 5,
    name: 'Pasta Carbonara',
    description: 'Espaguetis con salsa cremosa de huevo, panceta y pimienta negra.',
    price: 13.99,
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80',
    category: 'Principales'
  }
];
