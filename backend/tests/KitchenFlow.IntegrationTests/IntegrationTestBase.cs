using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using KitchenFlow.Infrastructure.Persistence;
using KitchenFlow.Api;

namespace KitchenFlow.IntegrationTests;

public class IntegrationTestBase : IClassFixture<WebApplicationFactory<Program>>
{
    protected readonly WebApplicationFactory<Program> _factory;
    protected readonly HttpClient _httpClient;

    public IntegrationTestBase(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Aquí podrías reemplazar la DB real por una de test o en memoria
                // si no deseas usar la de Docker directamente.
                
                // var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
                // if (descriptor != null) services.Remove(descriptor);
                // services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("TestDb"));
            });
        });

        _httpClient = _factory.CreateClient();
    }

    protected async Task<T> GetServiceAsync<T>() where T : notnull
    {
        using var scope = _factory.Services.CreateScope();
        return scope.ServiceProvider.GetRequiredService<T>();
    }
}
