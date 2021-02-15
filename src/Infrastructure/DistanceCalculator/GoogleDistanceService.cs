using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Services;

namespace Infrastructure.DistanceCalculator
{
    public class GoogleDistanceService : IDistanceCalculator
    {
        private readonly IHttpClientFactory _clientFactory;

        // todo: register google distance api typed http client and inject here
        public GoogleDistanceService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<Domain.Distance> GetDistanceAsync(string fromAddress, string toAddress)
        {
            var httpClient = _clientFactory.CreateClient();
            var key = "";

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={Uri.EscapeDataString(fromAddress)}&destinations={Uri.EscapeDataString(toAddress)}&key={key}");
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
