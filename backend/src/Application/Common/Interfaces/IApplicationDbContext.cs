using Microsoft.EntityFrameworkCore;

namespace KitchenFlow.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    // Add your DbSets here

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
