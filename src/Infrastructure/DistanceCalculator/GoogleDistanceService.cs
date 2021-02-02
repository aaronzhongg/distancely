using System;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Application.Services;

namespace Infrastructure.DistanceCalculator
{
    public class GoogleDistanceService : IDistanceCalculator
    {
        // todo: register google distance api typed http client and inject here
        public GoogleDistanceService()
        {

        }

        public async Task GetDistanceAsync()
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri("https://maps.googleapis.com/");
                var key = "";
                var response = await httpClient.GetAsync($"maps/api/distancematrix/json?origins=96+Holly+Street+Avondale&destinations=1+Nelson+Street+Auckland&key={key}");

                var responseString = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }; // todo: set global prop case insensitive 

                var googleDistanceResponse = JsonSerializer.Deserialize<GoogleDistanceResponse>(responseString, options);
            }
        }
    }
}
