using KitchenFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KitchenFlow.Infrastructure.Persistence.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        // 1. Nombre de la tabla en PostgreSQL
        builder.ToTable("OrderItems");

        // 2. Clave primaria
        builder.HasKey(x => x.Id);

        // 3. Reglas de las columnas
        builder.Property(x => x.DishId)
            .IsRequired();

        builder.Property(x => x.Quantity)
            .IsRequired();

        builder.Property(x => x.Notes)
            .HasMaxLength(500);

        // 4. ItemState como string en la BD para facilitar consultas manuales
        builder.Property(x => x.ItemState)
            .HasConversion<string>()
            .IsRequired();
    }
}

