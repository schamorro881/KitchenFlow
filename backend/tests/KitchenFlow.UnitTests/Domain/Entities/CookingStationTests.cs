using DefaultNamespace;
using FluentAssertions;
using KitchenFlow.Domain.Exceptions;
using Xunit;
// using KitchenFlow.Domain.Entities; // <-- Esto va a fallar pronto

namespace KitchenFlow.UnitTests.Domain.Entities;

public class CookingStationTests
{
    [Fact]
    public void SetTargetTemperature_WhenTemperatureIsBelowZero_ShouldThrowDomainException()
    {
        // Arrange (Preparar)
        // Intentamos crear una estación (ej: una plancha o un horno)
        var station = new CookingStation("Main board");

        // Act (Actuar)
        // Intentamos setear una temperatura inválida y capturamos la acción
        Action act = () => station.SetTargetTemperature(-10);

        // Assert (Afirmar)
        // Usamos FluentAssertions para decir: "Esta acción DEBE lanzar una excepción con este mensaje"
        act.Should().Throw<DomainException>()
           .WithMessage("The temperature cannot be below zero");
    }

    [Fact]
    public void SetTargetTemperature_WhenTemperatureIsValid_ShouldUpdateTargetTemperature()
    {
        var station = new CookingStation("Main board");
        
        station.SetTargetTemperature(180);
        
        station.TargetTemperature.Should().Be(180);
    }
    
}