using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using MediatR;

namespace Application.Distance.Queries
{
    public class GetDistanceQuery : IRequest<DistanceDto>
    {
        public string FromAddress { get; set; }
        public string DestinationAddress { get; set; }
    }

    public class GetDistanceQueryHandler : IRequestHandler<GetDistanceQuery, DistanceDto>
    {
        private readonly IDistanceCalculator _distanceCalculator;

        public GetDistanceQueryHandler(IDistanceCalculator distanceCalculator)
        {
            _distanceCalculator = distanceCalculator;
        }

        public async Task<DistanceDto> Handle(GetDistanceQuery request, CancellationToken cancellationToken)
        {
            var destination = await _distanceCalculator.GetDistancesAsync(request.FromAddress, request.DestinationAddress);

            return new DistanceDto(destination.Single().Place, destination.Single().DistanceMeters, (int)destination.Single().TravelTime);
        }
    }
}
