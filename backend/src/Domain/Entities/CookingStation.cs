using KitchenFlow.Domain.Exceptions;

namespace DefaultNamespace;

public class CookingStation
{
    private int Id {get; set; }
    private string Name { get; set; }
    public int TargetTemperature { get; private set; }


    public CookingStation(int id, string name, int targetTemperature)
    {
        Id = id;
        Name = name;
        TargetTemperature = targetTemperature;
    }

    public CookingStation(string name)
    {
        Name = name;
    }

    public void SetTargetTemperature(int targetTemperature)
    {
            if (targetTemperature < 0)
            {
                throw new DomainException("The temperature cannot be below zero");
            }
            
            TargetTemperature = targetTemperature;
    }
}