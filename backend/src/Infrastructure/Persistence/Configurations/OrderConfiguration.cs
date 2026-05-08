using KitchenFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KitchenFlow.Infrastructure.Persistence.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        // 1. Nombre de la tabla en PostgreSQL
        builder.ToTable("Orders");

        // 2. Clave primaria
        builder.HasKey(x => x.Id);

        // 3. Reglas de las columnas
        builder.Property(x => x.TableNumber)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.OrderState)
            .HasConversion<string>()
            .IsRequired();

        builder.Property(x => x.Comments)
            .HasMaxLength(500);

        // 4. DDD Magic: Mapear la navegación privada Items al campo _items
        // Esto le dice a EF Core que aunque Items es IReadOnlyCollection pública,
        // para escribir datos use el campo privado _items subyacente.
        builder.Metadata.FindNavigation(nameof(Order.Items))!
               .SetPropertyAccessMode(PropertyAccessMode.Field);

        // 5. Relación 1:N con OrderItems
        // Usamos HasForeignKey con string porque OrderId es una shadow property en OrderItem
        builder.HasMany(x => x.Items)
               .WithOne()
               .HasForeignKey("OrderId");
    }
}

