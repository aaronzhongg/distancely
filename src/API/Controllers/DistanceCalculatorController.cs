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

        [HttpGet]
        public async Task<Distance> GetAsync([FromServices] ICalculateDistanceToUseCase useCase, string fromAddress, string toAddress)
        {
            useCase.SetOutputPort(_calculateDistanceToPresenter);
            await useCase.Execute(fromAddress,toAddress);

            return _calculateDistanceToPresenter.Distance;
        }
    }
}
