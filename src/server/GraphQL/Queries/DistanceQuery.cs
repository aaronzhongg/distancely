using Application.UseCases.CalculateDistanceTo;
using GraphQL.Common.Types;
using GraphQL.Types;

namespace GraphQL.Common.Queries
{
    public class DistanceQuery : ObjectGraphType
    {
        private readonly CalculateDistanceToPresenter _presenter;

        public DistanceQuery(ICalculateDistanceToUseCase calculateDistanceToUseCase)
        {
            _presenter = new CalculateDistanceToPresenter();

            FieldAsync<DistanceType>(
              "distance",
              resolve: async context =>
              {
                  calculateDistanceToUseCase.SetOutputPort(_presenter);
                  await calculateDistanceToUseCase.Execute("1 Nelson Street, Auckland", "96 Holly Street, Avondale");
                  return _presenter.Distance;
              }

            );
        }
    }
}
