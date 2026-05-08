using KitchenFlow.Domain.Entities;
using KitchenFlow.Domain.Exceptions;

namespace KitchenFlow.UnitTests.Domain.Entities;

public class OrderTest
{
    [Fact]
    public void AddOrderItem_WhenOrderIsDelivered_ShouldThrowDomainException()
    {
        var order = new Order(tableNumber: 12);
        order.MarkAsDelivered();

        var exception = Assert.Throws<DomainException>(() =>
        {
            order.AddOrdenItem(dishId: 1, quantity: 2, notes: "no onion");
        });
        Assert.Equal("Cannot add items to a canceled or delivered order.", exception.Message);
    }
}