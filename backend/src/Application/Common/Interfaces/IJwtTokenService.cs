namespace KitchenFlow.Application.Common.Interfaces;

public interface IJwtTokenService
{
    string GenerateToken(string userId, string email, IEnumerable<string> roles);
    string? ValidateToken(string token);
}
