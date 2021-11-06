using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Services
{
    // TODO: Review where this interface lives... Application or Domain layer?
    public interface IDistanceCalculator
    {
        Task<IReadOnlyCollection<Destination>> GetDistancesAsync(string fromAddress, params string[] destinationAddresses);
    }
}
