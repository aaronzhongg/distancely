using System;
using System.Threading.Tasks;
using Application.UseCases.CalculateTravelTimes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceCalculatorController : ControllerBase
    {
        private readonly ILogger<DistanceCalculatorController> _logger;

        public DistanceCalculatorController(ILogger<DistanceCalculatorController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task GetAsync([FromServices] ICalculateDistanceToUseCase useCase)
        {
            await useCase.TestAsync();
        }
    }
}
