using System.Diagnostics;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KitchenFlow.Application.Common.Behaviors;

public sealed class PerformanceBehavior<TRequest, TResponse>(
    ILogger<PerformanceBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private const int SlowRequestThresholdMs = 500;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var timer = Stopwatch.StartNew();
        var response = await next(cancellationToken);
        timer.Stop();

        var elapsedMs = timer.ElapsedMilliseconds;
        if (elapsedMs > SlowRequestThresholdMs)
            logger.LogWarning(
                "KitchenFlow SLOW request: {Name} ({Elapsed}ms) {@Request}",
                typeof(TRequest).Name, elapsedMs, request);

        return response;
    }
}
