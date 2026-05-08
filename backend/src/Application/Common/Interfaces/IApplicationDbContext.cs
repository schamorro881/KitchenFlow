using Microsoft.EntityFrameworkCore;
using KitchenFlow.Domain.Entities;

namespace KitchenFlow.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    // Add your DbSets here
    DbSet<CookingStation> CookingStations { get; }
    DbSet<Order> Orders { get; }
    DbSet<OrderItem> OrderItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
