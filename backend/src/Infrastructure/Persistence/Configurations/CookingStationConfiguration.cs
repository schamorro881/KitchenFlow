using KitchenFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
// using KitchenFlow.Domain.Entities; // Ajustá a tu namespace real

namespace KitchenFlow.Infrastructure.Persistence.Configurations;

public class CookingStationConfiguration : IEntityTypeConfiguration<CookingStation>
{
    public void Configure(EntityTypeBuilder<CookingStation> builder)
    {
        // 1. Nombre de la tabla en PostgreSQL
        builder.ToTable("CookingStations");

        // 2. Clave primaria
        builder.HasKey(x => x.Id);

        // 3. Reglas de las columnas
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.CurrentTemperature)
            .IsRequired();

        builder.Property(x => x.TargetTemperature)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .IsRequired();
    }
}