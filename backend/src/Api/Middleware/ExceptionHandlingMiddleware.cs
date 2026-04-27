using KitchenFlow.Application.Common.Exceptions;
using System.Net;
using System.Text.Json;

namespace KitchenFlow.Api.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, message, errors) = exception switch
        {
            ValidationException ve => (
                HttpStatusCode.UnprocessableEntity,
                "Validation errors occurred.",
                (object)ve.Errors),
            NotFoundException nfe => (
                HttpStatusCode.NotFound,
                nfe.Message,
                (object)new { }),
            UnauthorizedAccessException => (
                HttpStatusCode.Unauthorized,
                "Unauthorized.",
                (object)new { }),
            _ => (
                HttpStatusCode.InternalServerError,
                "An unexpected error occurred.",
                (object)new { })
        };

        context.Response.StatusCode = (int)statusCode;

        var response = new
        {
            status = (int)statusCode,
            message,
            errors
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));
    }
}
