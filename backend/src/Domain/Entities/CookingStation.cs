using KitchenFlow.Domain.Exceptions;

namespace KitchenFlow.Domain.Entities;

public class CookingStation
{
    public int Id {get; private set; }
    public string Name { get; private set; }
    public int TargetTemperature { get; private set; }
    public int CurrentTemperature { get; private set; }
    public bool IsActive { get; private set; } = false;


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

    public CookingStation(string name, int targetTemperature, int currentTemperature, bool isActive)
    {
        Name = name;
        TargetTemperature = targetTemperature;
        CurrentTemperature = currentTemperature;
        IsActive = isActive;
    }

    public void SetTargetTemperature(int targetTemperature)
    {
            if (targetTemperature < 0)
            {
                throw new DomainException("The temperature cannot be below zero");
            }
            
            TargetTemperature = targetTemperature;
    }


    public void TurnOff()
    {
        if (IsActive)
        {
            this.IsActive = false;
            this.TargetTemperature = 0;
        }
        else
        {
            throw new DomainException("The station is already off");
        }
       
    }
}