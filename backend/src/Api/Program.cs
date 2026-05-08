using KitchenFlow.Api.Extensions;
using KitchenFlow.Api.Middleware;
using KitchenFlow.Application;
using KitchenFlow.Infrastructure;
using Serilog;
using KitchenFlow.Api.Hubs;
using KitchenFlow.Api.Workers;
using KitchenFlow.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// ─── Logging ───────────────────────────────────────────────────────────────
builder.Host.UseSerilog((ctx, cfg) =>
    cfg.ReadFrom.Configuration(ctx.Configuration)
       .Enrich.FromLogContext()
       .WriteTo.Console());

// ─── Services ──────────────────────────────────────────────────────────────
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddCurrentUserService();
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerWithJwt();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()));

builder.Services.AddHostedService<KitchenClockWorker>();


// ─── Pipeline ──────────────────────────────────────────────────────────────
var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();
app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<KitchenHub>("/hubs/kitchen");

// --- INICIO DEL SEMBRADO DE DATOS ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        // Pedimos prestado el DbContext
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        // Instanciamos tu clase sembradora y le pasamos el contexto
        var seeder = new KitchenDbContextSeeder(context);
        
        // Ejecutamos la magia
        await seeder.SeedAsync();
    }
    catch (Exception ex)
    {
        // Si PostgreSQL está apagado o falla algo, lo anotamos en la consola para no volvernos locos
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error al inicializar la base de datos de Pan Comido.");
    }
}
// --- FIN DEL SEMBRADO ---


await app.RunAsync();
