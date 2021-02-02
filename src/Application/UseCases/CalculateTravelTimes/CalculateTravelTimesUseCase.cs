using System;
using System.Threading.Tasks;
using Application.Services;

namespace Application.UseCases.CalculateTravelTimes
{
    public class CalculateTravelTimesUseCase: ICalculateTravelTimesUseCase
    {
        private readonly IDistanceCalculator _distanceCalculator;

        public CalculateTravelTimesUseCase(IDistanceCalculator distanceCalculator)
        {
            _distanceCalculator = distanceCalculator;
        }

        public async Task TestAsync()
        {
            await _distanceCalculator.GetDistanceAsync();
        }
    }
}
