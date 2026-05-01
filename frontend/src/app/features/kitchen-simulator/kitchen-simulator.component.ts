import { Component, inject } from '@angular/core';
import { CookingStationCardComponent } from './components/cooking-station-card/cooking-station-card.component';
import { KitchenService } from './services/kitchen.service'; // Importamos el servicio

@Component({
  selector: 'app-kitchen-simulator',
  standalone: true,
  imports: [CookingStationCardComponent],
  templateUrl: './kitchen-simulator.component.html',
  styleUrl: './kitchen-simulator.component.scss'
})
export class KitchenSimulatorComponent {
  // Inyectamos el servicio = (C#) private readonly IKitchenService _kitchenService;
  private kitchenService = inject(KitchenService);

  // Exponemos el signal del servicio para que el HTML lo pueda leer
  stations = this.kitchenService.stations;

  handleTurnOff(stationId: number) {
    // Ya no modificamos el array acá, le delegamos la responsabilidad al servicio
    this.kitchenService.turnOffStation(stationId);
  }
}