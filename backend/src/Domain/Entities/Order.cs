using KitchenFlow.Domain.Entities.Enums;
using KitchenFlow.Domain.Exceptions;

namespace KitchenFlow.Domain.Entities;

public class Order
{
    public int Id { get; private set; }
    public int TableNumber { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public OrderState OrderState {get; private set;}
    public string Comments { get; private set; }
    
    
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();


    public Order(int id, int tableNumber, DateTime createdAt, OrderState orderState, string comments)
    {
        Id = id;
        TableNumber = tableNumber;
        CreatedAt = createdAt;
        OrderState = orderState;
        Comments = comments;
    }

    public Order(int tableNumber)
    {
        TableNumber = tableNumber;
        Comments = string.Empty;
        CreatedAt = DateTime.UtcNow;
    }

    public void AddOrdenItem(int dishId, int quantity, string notes = "")
    {
        if(OrderState == OrderState.Canceled || OrderState == OrderState.Delivered)
        {
            throw new DomainException("Cannot add items to a canceled or delivered order.");
        }

        var newItem = new OrderItem(dishId, quantity, notes);
        _items.Add(newItem);
    }
    
    public void MarkAsDelivered()
    {
        if (OrderState == OrderState.Canceled)
        {
            throw new DomainException("Cannot mark a canceled order as delivered.");
        }
        
        OrderState = OrderState.Delivered;
    }
    
}