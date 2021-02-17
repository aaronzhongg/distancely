using System;
using Application.Modules;
using AutoFixture;
using Microsoft.Extensions.DependencyInjection;
using UnitTests.TestDoubles;

namespace UnitTests
{
    public class TestStartup
    {
        public TestStartup()
        {
        }

        internal void CustomizeContainer(IServiceCollection collection)
        {
            collection.RegisterUseCases()
                .RegisterFakeInfrastructure();
        }

        internal void CustomizeSpecimens(IFixture fixture)
        {
            
        }
    }
}
