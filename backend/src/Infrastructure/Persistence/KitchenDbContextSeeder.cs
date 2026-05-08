using KitchenFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
// using KitchenFlow.Domain.Entities; // Asegurate de importar tu entidad

namespace KitchenFlow.Infrastructure.Persistence;

public class KitchenDbContextSeeder
{
    private readonly ApplicationDbContext _context;

    // Inyectamos tu DbContext para poder hablar con PostgreSQL
    public KitchenDbContextSeeder(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        // Verificamos si ya hay datos para no duplicar
        if (await _context.CookingStations.AnyAsync())
            return;

        // Creamos algunas estaciones de cocina de ejemplo
        var stations = new List<CookingStation>
        {
            new CookingStation("Grill Station", 200, 0, false),
            new CookingStation("Fryer Station", 180, 0, false),
            new CookingStation("Oven Station", 220, 0, false)
        };

        // Agregamos a la base de datos
        await _context.CookingStations.AddRangeAsync(stations);
        await _context.SaveChangesAsync();
       
       
    }
}