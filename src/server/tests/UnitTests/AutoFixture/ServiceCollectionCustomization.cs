using System;
using AutoFixture;
using Microsoft.Extensions.DependencyInjection;

namespace UnitTests.AutoFixture
{
    /// <summary>
    /// Integrates service collection with auto fixture IoC:
    /// given a service collection container: auto fixture will resolve using the services
    /// registered in the container
    /// </summary>
    public class ServiceCollectionCustomization : ICustomization
    {
        private readonly Action<IServiceCollection> _registerComponents;
        private readonly IServiceCollection _collection;
        private readonly IServiceProvider _provider;

        public ServiceCollectionCustomization(Action<IServiceCollection> registerComponents)
        {
            _registerComponents = registerComponents;
            _collection = new ServiceCollection();
        }

        public ServiceCollectionCustomization(IServiceCollection collection)
        {
            _collection = collection;
        }

        public ServiceCollectionCustomization(IServiceProvider provider)
        {
            _provider = provider;
        }

        public void Customize(IFixture fixture)
        {
            var provider = _provider;
            if (_collection != null)
            {
                _registerComponents?.Invoke(_collection);
                provider = _collection.BuildServiceProvider();
            }
            fixture.ResidueCollectors.Add(new ServiceProviderBasedSpecimenBuilder(provider));
        }
    }
}
