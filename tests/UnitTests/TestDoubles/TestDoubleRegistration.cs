using System;
using Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace UnitTests.TestDoubles
{
    public static class TestDoubleRegistration
    {
        public static IServiceCollection RegisterFakeInfrastructure(this IServiceCollection collection)
        {
            collection.AddTransient<IDistanceCalculator, FakeDistanceCalculator>();
            return collection;
        }
    }
}
