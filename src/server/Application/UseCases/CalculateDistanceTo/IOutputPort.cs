using Domain;

namespace Application.UseCases.CalculateDistanceTo
{
    public interface IOutputPort
    {
        /// <summary>
        ///     Invalid input.
        /// </summary>
        void Invalid();

        /// <summary>
        ///     Calculated distances 
        /// </summary>
        void Ok(params Destination[] distance);
    }
}
