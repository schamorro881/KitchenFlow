import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  // Nuestro estado local, que ahora será un reflejo de lo que diga el servidor
  stations = signal([
    { id: 1, name: 'Plancha Principal', currentTemp: 180 },
    { id: 2, name: 'Horno de Pizzas', currentTemp: 220 },
    { id: 3, name: 'Freidora', currentTemp: 170 }
  ]);

  private hubConnection: HubConnection | undefined;

  constructor() {
    this.iniciarConexion();
  }

  private iniciarConexion() {
    // 1. Construimos el puente hacia tu backend en .NET (Ajustá el puerto si tu .NET usa otro)
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5062/hubs/kitchen') // URL donde vivirá nuestro Hub
      .withAutomaticReconnect()
      .build();

    // 2. Iniciamos la conexión
    this.hubConnection.start()
      .then(() => {
        console.log('🔌 Conectado al motor en tiempo real de KitchenFlow');
        this.escucharEventosDelServidor();
      })
      .catch(err => console.error('Error al conectar con SignalR:', err));
  }

  private escucharEventosDelServidor() {
    // Esta es la "antena" de Angular. Escucha cuando C# envía el mensaje "StationUpdated"
    this.hubConnection?.on('StationUpdated', (stationId: number, newTemp: number) => {
      console.log(`El servidor dice: Estación ${stationId} cambió a ${newTemp}°C`);

      // Actualizamos nuestro Signal, lo que hará que la tarjeta en la pantalla se redibuje sola
      this.stations.update(currentStations =>
        currentStations.map(station =>
          station.id === stationId
            ? { ...station, currentTemp: newTemp }
            : station
        )
      );
    });
  }

  // 3. El método que llama tu componente cuando hacés clic en el botón
  turnOffStation(stationId: number) {
    if (this.hubConnection?.state === 'Connected') {
      // En vez de mutar los datos locales, le disparamos un misil al backend
      this.hubConnection.invoke('TurnOffStationAsync', stationId)
        .catch(err => console.error('Error al enviar el comando:', err));
    } else {
      console.warn('No hay conexión con el servidor.');
    }
  }
}