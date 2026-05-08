using KitchenFlow.Application.Common.Exceptions;
using KitchenFlow.Application.Common.Interfaces;
using MediatR;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace KitchenFlow.Application.Commands.AddOrderItem;

public class AddOrderItemCommandHandler : IRequestHandler<AddOrderItemCommand, int>
{

    private readonly IApplicationDbContext _context;
    
    public AddOrderItemCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<int> Handle(AddOrderItemCommand request, CancellationToken cancellationToken)
    {
        var order = await _context.Orders.Include(o => o.Items).
            FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);

        if (order is null)
        {
            throw new Exception($"Order with ID {request.OrderId} not found.");
        }

        order.AddOrdenItem(request.DishId, request.Quantity, request.Notes);

        await _context.SaveChangesAsync(cancellationToken);

        var addedItemId = order.Items.Last().Id;
        return addedItemId;
    }
    
    
    
}