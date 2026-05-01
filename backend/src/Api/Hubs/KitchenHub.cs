using Microsoft.AspNetCore.SignalR;

namespace KitchenFlow.Api.Hubs; 

public class KitchenHub : Hub
{
    // Este nombre de método tiene que coincidir EXACTAMENTE con el que pusimos en el invoke() de Angular
    public async Task TurnOffStationAsync(int stationId)
    {
        // 1. Lógica de negocio (El futuro):
        // Acá más adelante inyectarías tu servicio de aplicación (ej. _stationService.TurnOff(stationId)) 
        // para guardar el cambio en PostgreSQL usando Entity Framework.

        // 2. El Grito al Frontend:
        // Le decimos a TODOS los navegadores conectados (Clients.All) que escuchen el evento "StationUpdated".
        // Le pasamos el ID de la estación y la nueva temperatura (0).
        await Clients.All.SendAsync("StationUpdated", stationId, 0);
    }
}