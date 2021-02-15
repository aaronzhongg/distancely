using AutoFixture;

namespace UnitTests.AutoFixture
{
    internal class UseCaseTestCustomization : ICustomization
    {
        public void Customize(IFixture fixture)
        {
            var startup = new TestStartup();
            fixture.Customize(new ServiceCollectionCustomization(startup.CustomizeContainer));
            startup.CustomizeSpecimens(fixture);
        }
    }
}