using System.Threading.Tasks;
using Application.UseCases.CalculateDistanceTo;
using Domain;
using FluentAssertions;
using UnitTests.AutoFixture;
using Xunit;

namespace UnitTests.Tests
{
    public class CalculateTravelTimesTest
    {
        [Theory, UseCaseTest]
        public async Task Given_valid_from_and_to_address_When_calculating_distance_to_Then_should_return_distance_at_current_time(CalculateDistanceToUseCase sut)
        {
            // Given
            var fromAddress = "96 Holly Street, Avondale, New Zealand";
            var toAddress = "1 Nelson Street, Auckland, New Zealand";
            CalculateDistanceToPresenter presenter = new CalculateDistanceToPresenter(); // todo: PreCondition
            sut.SetOutputPort(presenter);

            // When
            await sut.Execute(fromAddress, toAddress);

            // Then
            presenter.Distance.Should().BeEquivalentTo(
                new Distance
                {
                    DistanceMeters = 1,
                    TravelTime = 1.2
                });

        }
    }
}
