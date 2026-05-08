using KitchenFlow.Application.Commands.AddOrderItem;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KitchenFlow.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : Controller
{
    private readonly ISender _mediator;

    public OrdersController(ISender mediator)
    {
        _mediator = mediator;
    }
    
    public IActionResult Index()
    {
        return View();
    }
    
    [HttpGet]
    public async Task<IActionResult> GetOrders([FromServices] KitchenFlow.Application.Common.Interfaces.IApplicationDbContext context)
    {
        var orders = await Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.ToListAsync(context.Orders);
        return Ok(orders);
    }
    
    [HttpPost("{orderId}/items")]
    public async Task<IActionResult> AddItem(int orderId, [FromBody] AddItemRequest request)
    {
       var commandOrder = new AddOrderItemCommand(
              orderId,
              request.DishId,
              request.Quantity,
              request.Notes
           
       );
           var newItemId = await _mediator.Send(commandOrder);
           return Ok(newItemId);
    }
    public record AddItemRequest(int DishId, int Quantity, string Notes);
}