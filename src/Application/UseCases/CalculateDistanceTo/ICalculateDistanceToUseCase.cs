using System;
using System.Threading.Tasks;

namespace Application.UseCases.CalculateDistanceTo
{
    public interface ICalculateDistanceToUseCase
    {
        /// <summary>
        ///     Executes the Use Case
        /// </summary>
        /// <param name="accountId">Account Id.</param>
        Task Execute(string fromAddress, string toAddress);

        /// <summary>
        ///     Executes the Use Case.
        /// </summary>
        /// <param name="outputPort"></param>
        void SetOutputPort(IOutputPort outputPort);
    }
}
