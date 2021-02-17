using System;
using System.Threading.Tasks;
using Application.Services;
using Domain;

namespace UnitTests.TestDoubles
{
    public class FakeDistanceCalculator: IDistanceCalculator
    {
        public FakeDistanceCalculator()
        {
        }

        // todo: how to fake APIs effectively? i.e. return results based on different inputs
        public Task<Distance> GetDistanceAsync(string fromAddress, string toAddress)
        {
            return Task.FromResult(new Distance
            {
                DistanceMeters = 1,
                TravelTime = 1.2
            });
        }
    }
}
