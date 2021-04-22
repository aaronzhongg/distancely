using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Services
{
    public interface IDistanceCalculator
    {
        Task<IReadOnlyCollection<Domain.Destination>> GetDistancesAsync(string fromAddress, params string[] destinationAddresses);
    }
}
