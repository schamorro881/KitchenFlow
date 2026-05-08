import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CookingStationCardComponent } from './components/cooking-station-card/cooking-station-card.component';
import { KitchenService } from './services/kitchen.service';
import { TuiButton } from '@taiga-ui/core';

interface MealNotification {
  id: number;
  dishName: string;
  stationId: number;
}

@Component({
  selector: 'app-kitchen-simulator',
  standalone: true,
  imports: [CookingStationCardComponent, TuiButton],
  templateUrl: './kitchen-simulator.component.html',
  styleUrl: './kitchen-simulator.component.scss'
})
export class KitchenSimulatorComponent {
  private readonly kitchenService = inject(KitchenService);
  
  // Estado de las estaciones
  stations = this.kitchenService.stations;
  
  // Notificaciones locales (reemplaza al TuiAlertService que fallaba)
  notifications = signal<MealNotification[]>([]);
  private nextNotificationId = 0;

  constructor() {
    // Escuchar el servicio
    this.kitchenService.mealReady$
      .pipe(takeUntilDestroyed())
      .subscribe(({ dishName, stationId }) => {
        this.addNotification(dishName, stationId);
      });
  }

  private addNotification(dishName: string, stationId: number) {
    const id = this.nextNotificationId++;
    const newNotification = { id, dishName, stationId };
    
    this.notifications.update(prev => [...prev, newNotification]);

    // Desaparecer despuÃ©s de 6 segundos
    setTimeout(() => {
      this.removeNotification(id);
    }, 6000);
  }

  removeNotification(id: number) {
    this.notifications.update(prev => prev.filter(n => n.id !== id));
  }

  handleTurnOff(stationId: number) {
    this.kitchenService.turnOffStation(stationId);
  }

  handleOrderDish(stationId: number, orderData: { dishName: string, time: number }) {
    this.kitchenService.placeOrder(stationId, orderData.dishName, orderData.time);
  }
}
