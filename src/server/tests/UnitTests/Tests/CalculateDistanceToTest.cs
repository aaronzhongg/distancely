﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Application.UseCases.CalculateDistanceTo;
using Domain;
using FluentAssertions;
using UnitTests.AutoFixture;
using Xunit;

namespace UnitTests.Tests
{
    public class CalculateDistanceToTest
    {
        [Theory, UseCaseTest]
        public async Task Given_single_valid_from_and_to_address_When_calculating_distance_to_Then_should_return_single_distance(
            CalculateDistanceToPresenter presenter,
            CalculateDistanceToUseCase sut
            )
        {
            // Given
            var fromAddress = "96 Holly Street, Avondale, New Zealand";
            var toAddress = "1 Nelson Street, Auckland, New Zealand";
            sut.SetOutputPort(presenter);

            // When
            await sut.Execute(fromAddress, toAddress);

            // Then
            presenter.Distances.Should().ContainSingle();

        }

         [Theory, UseCaseTest]
        public async Task Given_multiple_destination_addresses_When_calculating_distance_to_Then_should_return_list_of_distances_at_current_time(
            CalculateDistanceToPresenter presenter,
            CalculateDistanceToUseCase sut
            )
        {
            // Given
            var fromAddress = "96 Holly Street, Avondale, New Zealand";
            var destinationAddresses = new string[] 
            {
                "1 Nelson Street, Auckland, New Zealand", 
                "2 Nelson Street, Auckland, New Zealand", 
                "3 Nelson Street, Auckland, New Zealand"
            };


            sut.SetOutputPort(presenter);

            // When
            await sut.Execute(fromAddress, destinationAddresses);

            // Then
            presenter.Distances.Should().HaveCount(destinationAddresses.Length);
        }
    }
}
