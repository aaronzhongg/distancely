using System.Collections.Generic;
using System.Threading.Tasks;
using Application.UseCases.CalculateDistanceTo;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceCalculatorController : ControllerBase
    {
        private readonly ILogger<DistanceCalculatorController> _logger;

        private readonly CalculateDistanceToPresenter _calculateDistanceToPresenter;

        public DistanceCalculatorController(ILogger<DistanceCalculatorController> logger)
        {
            _logger = logger;
            _calculateDistanceToPresenter = new CalculateDistanceToPresenter();
        }


        // todo: fix params binding - use request body?
        [HttpGet]
        public async Task<IReadOnlyCollection<Destination>> GetAsync([FromServices] ICalculateDistanceToUseCase useCase, string fromAddress, params string[] destinationAddresses)
        {
            useCase.SetOutputPort(_calculateDistanceToPresenter);
            await useCase.Execute(fromAddress,destinationAddresses);

            return _calculateDistanceToPresenter.Distances;
        }
    }
}
