using System;
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
              arguments: new QueryArguments( 
                  new QueryArgument<StringGraphType> { Name = "fromAddress" },  // todo: how to clean this up i.e. Input classes? - make strongly typed
                  new QueryArgument<StringGraphType> { Name = "toAddress" }),
              resolve: async context =>
              {
                  // todo: input validation
                  Console.WriteLine(context.GetArgument<string>("fromAddress"));
                  Console.WriteLine(context.GetArgument<string>("toAddress"));
                  
                  calculateDistanceToUseCase.SetOutputPort(_presenter);
                  await calculateDistanceToUseCase.Execute(
                      context.GetArgument<string>("fromAddress"), 
                      context.GetArgument<string>("toAddress"));
                  return _presenter.Distance;
              }

            );
        }
    }
}
