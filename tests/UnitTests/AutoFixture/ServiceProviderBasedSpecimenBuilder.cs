using System;
using AutoFixture.Kernel;

namespace UnitTests.AutoFixture
{
    internal class ServiceProviderBasedSpecimenBuilder : ISpecimenBuilder
    {
        private readonly IServiceProvider _provider;

        public ServiceProviderBasedSpecimenBuilder(IServiceProvider provider)
        {
            _provider = provider;
        }

        public object Create(object request, ISpecimenContext context)
        {
            if (!(request is Type requestedType))
                return new NoSpecimen();
            return Resolve(requestedType);
        }

        private object Resolve(Type type)
        {
            return _provider.GetService(type);
        }
    }
}
