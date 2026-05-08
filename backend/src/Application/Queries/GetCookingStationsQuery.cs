using KitchenFlow.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

 // using KitchenFlow.Application.DTOs; // Lo ideal sería devolver un DTO, pero para simplificar ahora devolveremos anónimos o la entidad.

namespace KitchenFlow.Application.Queries;

// 1. El "Mensaje" de la Query
// IRequest indica qué va a devolver esta query (una lista de estaciones)
public record GetCookingStationsQuery : IRequest<List<CookingStationDto>>;

// Un DTO simple para no exponer la entidad de dominio completa al frontend
public record CookingStationDto(int Id, string Name, int CurrentTemp);

// 2. El "Manejador" que ejecuta el trabajo
public class GetCookingStationsQueryHandler : IRequestHandler<GetCookingStationsQuery, List<CookingStationDto>>
{
    private readonly IApplicationDbContext _context;

    public GetCookingStationsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CookingStationDto>> Handle(GetCookingStationsQuery request, CancellationToken cancellationToken)
    {
        // Vamos a la base de datos, mapeamos a DTO y devolvemos
        return await _context.CookingStations
            .Select(s => new CookingStationDto(s.Id, s.Name, s.CurrentTemperature))
            .ToListAsync(cancellationToken);
    }
}