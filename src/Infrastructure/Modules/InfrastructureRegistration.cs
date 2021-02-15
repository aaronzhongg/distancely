using System;
using Application.Services;
using Infrastructure.DistanceCalculator;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Modules
{
    public static class InfrastructureRegistration
    {
        public static IServiceCollection RegisterInfrastructure(this IServiceCollection collection)
        {
            collection.AddTransient<IDistanceCalculator, GoogleDistanceService>();

            return collection;
        }
    }
}
