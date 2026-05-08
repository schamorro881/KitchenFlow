import { inject, Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  // Estado de las estaciones
  stations = signal([
    { id: 1, name: 'Plancha Principal', currentTemp: 180 },
    { id: 2, name: 'Horno de Pizzas', currentTemp: 220 },
    { id: 3, name: 'Freidora', currentTemp: 170 }
  ]);

  // Evento para que los componentes reaccionen cuando un plato está listo
  readonly mealReady$ = new Subject<{ stationId: number, dishName: string }>();

  private hubConnection: HubConnection | undefined;

  constructor() {
    this.iniciarConexion();
  }

  private iniciarConexion() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5062/hubs/kitchen')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('🔌 Conectado al motor SignalR');
        this.escucharEventosDelServidor();
      })
      .catch((err: any) => console.error('Error SignalR:', err));
  }

  private escucharEventosDelServidor() {
    this.hubConnection?.on('StationUpdated', (stationId: number, newTemp: number) => {
      this.stations.update(currentStations =>
        currentStations.map(station =>
          station.id === stationId ? { ...station, currentTemp: newTemp } : station
        )
      );
    });

    this.hubConnection?.on('MealReady', (stationId: number, dishName: string) => {
      console.log(`🍳 Servidor: Plato listo -> ${dishName}`);
      this.mealReady$.next({ stationId, dishName });
    });
  }

  turnOffStation(stationId: number) {
    if (this.hubConnection?.state === 'Connected') {
      this.hubConnection.invoke('TurnOffStationAsync', stationId)
        .catch((err: any) => console.error('Error TurnOff:', err));
    }
  }

  async placeOrder(stationId: number, dishName: string, time: number) {
    if (this.hubConnection?.state === 'Connected') {
      try {
        await this.hubConnection.invoke('PlaceAnOrderAsync', stationId, dishName, time);
      } catch (err: any) {
        console.error("Error PlaceOrder:", err);
      }
    }
  }
}