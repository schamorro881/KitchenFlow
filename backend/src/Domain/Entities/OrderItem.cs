using KitchenFlow.Domain.Entities.Enums;

namespace KitchenFlow.Domain.Entities;

public class OrderItem
{
    public int Id { get; private set; }
    public int DishId  { get; private set; }
    public int Quantity { get; private set; }
    public string? Notes { get; private set; }
    public ItemState ItemState { get; private set; }


    public OrderItem(int id, int dishId, int quantity, string? notes, ItemState itemState)
    {
        if (quantity < 0)
        {
            throw new ArgumentException("Quantity cannot be negative.");
        }
        Id = id;
        DishId = dishId;
        Quantity = quantity;
        Notes = notes;
        ItemState = ItemState.Pending;
    }

    public OrderItem(int dishId, int quantity, string? notes)
    {
        DishId = dishId;
        Quantity = quantity;
        Notes = notes;
    }
}