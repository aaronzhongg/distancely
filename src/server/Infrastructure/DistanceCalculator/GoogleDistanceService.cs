using System;
using System.Collections.Generic;
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

        public async Task<IReadOnlyCollection<Domain.Distance>> GetDistancesAsync(string fromAddress, params string[] destinationAddresses)
        {
            var httpClient = _clientFactory.CreateClient();

            var request = new HttpRequestMessage(HttpMethod.Get, ConstructGoogleApiUriString(fromAddress, destinationAddresses));
            var response = await httpClient.SendAsync(request);

            // todo: handle non success response codes
            var responseString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }; // todo: set global prop case insensitive 

            var googleDistanceResponse = JsonSerializer.Deserialize<GoogleDistanceResponse>(responseString, options);

            // Single row because only one fromAddress
            var distances = googleDistanceResponse.Rows.First()
                .Elements.Select(
                    dest => new Domain.Distance(distanceMeters: dest.Distance.Value, travelTime: dest.Duration.Value))
                .ToList();

            return distances;
        }

        private string ConstructGoogleApiUriString(string fromAddress, params string[] destinationAddresses) 
        {
            var uriEscapedDestinationAddresses = destinationAddresses.Select(d => Uri.EscapeDataString(d));
            var baseUri = "https://maps.googleapis.com";
            var route = "maps/api/distancematrix/json";
            var parameters = $"origins={Uri.EscapeDataString(fromAddress)}&destinations={string.Join('|', uriEscapedDestinationAddresses)}&key={_googleOptions.CurrentValue.ApiKey}";

            return $"{baseUri}/{route}?{parameters}";
        }
    }
}
