using KitchenFlow.Domain.Entities.Enums;

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

    public void AddOrdenItem(int dishId, int quantity, string notes = "")
    {
        if(OrderState == OrderState.Canceled || OrderState == OrderState.Delivered)
        {
            throw new InvalidOperationException("Cannot add items to a canceled or delivered order.");
        }

        var newItem = new OrderItem(dishId, quantity, notes);
        _items.Add(newItem);
    }
    
}