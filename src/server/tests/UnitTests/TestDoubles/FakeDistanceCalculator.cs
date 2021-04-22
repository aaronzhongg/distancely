using System;
using System.Collections.Generic;
using System.Linq;
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

        public Task<IReadOnlyCollection<Destination>> GetDistancesAsync(string fromAddress, params string[] destinationAddresses)
        {
            var ran = new Random();

            return Task.FromResult((IReadOnlyCollection<Destination>)destinationAddresses.Select(dest => new Destination(new Place("dummy address"), ran.Next(), ran.NextDouble())).ToList());
        }
    }
}
