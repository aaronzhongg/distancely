using System;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IDistanceCalculator
    {
        Task GetDistanceAsync();
    }
}
