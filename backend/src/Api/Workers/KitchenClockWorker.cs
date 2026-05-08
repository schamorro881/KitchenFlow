using Microsoft.AspNetCore.SignalR;
using KitchenFlow.Api.Hubs; // Asegurate de usar tu namespace correcto

namespace KitchenFlow.Api.Workers;

// Heredamos de BackgroundService para que .NET lo corra de fondo
public class KitchenClockWorker : BackgroundService
{
    private readonly IHubContext<KitchenHub> _hubContext;
    private readonly ILogger<KitchenClockWorker> _logger;

    // Inyectamos el Hub de SignalR para poder emitir eventos a las pantallas
    public KitchenClockWorker(IHubContext<KitchenHub> hubContext, ILogger<KitchenClockWorker> logger)
    {
        _hubContext = hubContext;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("⏰ Reloj de la cocina encendido. Iniciando simulación...");

        var random = new Random();

        // Este es el ciclo infinito de nuestro reloj
        while (!stoppingToken.IsCancellationRequested)
        {
            // Hacemos que el reloj haga "tic" cada 3 segundos
            await Task.Delay(3000, stoppingToken);

            // Simulamos la lógica de negocio: la Plancha Principal (ID 1) fluctúa su temperatura
            int stationId = 1;
            int simulatedTemp = random.Next(175, 185); // Temperatura aleatoria entre 175 y 185

            _logger.LogInformation($"[Tic] Fluctuación térmica: Estación {stationId} a {simulatedTemp}°C");

            // ¡Magia! Le disparamos el evento "StationUpdated" a todos los navegadores conectados
            await _hubContext.Clients.All.SendAsync("StationUpdated", stationId, simulatedTemp, cancellationToken: stoppingToken);
        }
    }
}