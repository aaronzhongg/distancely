using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Services;
using Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace Infrastructure.DistanceCalculator
{
    public class GoogleDistanceService : IDistanceCalculator
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IOptionsMonitor<GoogleOptions> _googleOptions;

        // todo: register google distance api typed http client and inject here
        public GoogleDistanceService(IHttpClientFactory clientFactory, IOptionsMonitor<GoogleOptions> googleOptions)
        {
            _clientFactory = clientFactory;
            _googleOptions = googleOptions;
        }

        public async Task<Domain.Distance> GetDistanceAsync(string fromAddress, string toAddress)
        {
            var httpClient = _clientFactory.CreateClient();

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={Uri.EscapeDataString(fromAddress)}&destinations={Uri.EscapeDataString(toAddress)}&key={_googleOptions.CurrentValue.ApiKey}");
            var response = await httpClient.SendAsync(request);

            var responseString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }; // todo: set global prop case insensitive 

            var googleDistanceResponse = JsonSerializer.Deserialize<GoogleDistanceResponse>(responseString, options);

            var distance = googleDistanceResponse.Rows.First().Elements.First();

            return new Domain.Distance
            {
                DistanceMeters = distance.Distance.Value,
                TravelTime = distance.Duration.Value
            };
        }
    }
}
