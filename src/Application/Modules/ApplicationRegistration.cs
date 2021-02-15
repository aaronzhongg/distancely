using Application.UseCases.CalculateDistanceTo;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Modules
{
    public static class ApplicationRegistration
    {
        public static IServiceCollection RegisterUseCases(this IServiceCollection collection)
        {
            collection.AddTransient<ICalculateDistanceToUseCase, CalculateDistanceToUseCase>();

            return collection;
        }
    }
}
