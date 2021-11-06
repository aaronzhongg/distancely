using System.Threading.Tasks;
using Application.Distance.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceCalculatorController : ControllerBase
    {
        private readonly ISender _mediator;
        private readonly ILogger<DistanceCalculatorController> _logger;

        public DistanceCalculatorController(ISender sender, ILogger<DistanceCalculatorController> logger)
        {
            _logger = logger;
            _mediator = sender;
        }

        [HttpGet]
        public async Task<DistanceDto> GetAsync([FromQuery]GetDistanceQuery query)
        {
            return await _mediator.Send(query);
        }
    }
}
