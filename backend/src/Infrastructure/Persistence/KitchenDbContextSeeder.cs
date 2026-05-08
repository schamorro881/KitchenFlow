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
        // Verificamos si ya hay datos de CookingStations
        if (!await _context.CookingStations.AnyAsync())
        {
            var stations = new List<CookingStation>
            {
                new CookingStation("Grill Station", 200, 0, false),
                new CookingStation("Fryer Station", 180, 0, false),
                new CookingStation("Oven Station", 220, 0, false)
            };
            await _context.CookingStations.AddRangeAsync(stations);
        }

        // Mocks de Orders para pruebas de AddItem
        if (!await _context.Orders.AnyAsync())
        {
            var orders = new List<Order>
            {
                new Order(1), // Mesa 1
                new Order(2), // Mesa 2
                new Order(3)  // Mesa 3
            };
            await _context.Orders.AddRangeAsync(orders);
        }

        // Guardamos los cambios si se agregó algo
        if (_context.ChangeTracker.HasChanges())
        {
            await _context.SaveChangesAsync();
        }
    }
}