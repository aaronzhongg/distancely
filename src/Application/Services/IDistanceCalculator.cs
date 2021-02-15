using System;
using System.Threading.Tasks;
using Domain;

namespace Application.Services
{
    public interface IDistanceCalculator
    {
        Task<Distance> GetDistanceAsync(string fromAddress, string toAddress);
    }
}
