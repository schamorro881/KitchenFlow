using MediatR;


namespace KitchenFlow.Application.Commands.AddOrderItem;

public record AddOrderItemCommand(int OrderId, int DishId, int Quantity, string Notes) : IRequest<int>;