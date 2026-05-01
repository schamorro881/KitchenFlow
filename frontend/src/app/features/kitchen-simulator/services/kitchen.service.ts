import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  // Envolvemos tu lista en un signal() para que Angular sepa cuándo cambia
  stations = signal([
    { id: 1, name: 'Plancha Principal', currentTemp: 180 },
    { id: 2, name: 'Horno de Pizzas', currentTemp: 220 },
    { id: 3, name: 'Freidora', currentTemp: 170 }
  ]);

  constructor() { }

  // La lógica que antes estaba en el componente, ahora vive acá
  turnOffStation(stationId: number) {
    // Actualizamos el signal modificando solo la estación indicada
    this.stations.update(currentStations =>
      currentStations.map(station =>
        station.id === stationId
          ? { ...station, currentTemp: 0 }
          : station
      )
    );
  }
}