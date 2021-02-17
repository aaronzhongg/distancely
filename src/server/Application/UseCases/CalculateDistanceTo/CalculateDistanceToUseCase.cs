using System;
using System.Threading.Tasks;
using Application.Services;
using Domain;

namespace Application.UseCases.CalculateDistanceTo
{
    public class CalculateDistanceToUseCase: ICalculateDistanceToUseCase
    {
        private readonly IDistanceCalculator _distanceCalculator;

        private IOutputPort _outputPort;

        public CalculateDistanceToUseCase(IDistanceCalculator distanceCalculator)
        {
            _distanceCalculator = distanceCalculator;
            _outputPort = new CalculateDistanceToPresenter();
        }

        public async Task Execute(string fromAddress, string toAddress)
        {
            var distance = await _distanceCalculator.GetDistanceAsync(fromAddress, toAddress);

            _outputPort.Ok(distance);

            return;
        }

        public void SetOutputPort(IOutputPort outputPort)
        {
            _outputPort = outputPort;
        }
    }
}
