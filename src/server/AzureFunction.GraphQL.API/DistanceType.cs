using System;
using Application.UseCases.CalculateDistanceTo;
using Domain;
using GraphQL.Types;
using GraphQL.Utilities;

namespace AzureFunction.GraphQL.API
{
    // todo: break this up. should it be in another GraphQL project to decouple the types, query and schemas with az funcs?
    // todo: how will resolvers use the application use cases to resolve a distance object based on inputs?
    public class DistanceType : ObjectGraphType<Distance>
    {
        public DistanceType()
        {
            Field(x => x.DistanceMeters).Description("Distance in meters.");
            Field(x => x.TravelTime).Description("Travel time in seconds.");
        }
    }

    public class DistanceQuery : ObjectGraphType
    {
        CalculateDistanceToPresenter presenter;

        public DistanceQuery(ICalculateDistanceToUseCase calculateDistanceToUseCase)
        {
            presenter = new CalculateDistanceToPresenter();

            FieldAsync<DistanceType>(
              "distance",
              resolve: async context =>
              {
                  calculateDistanceToUseCase.SetOutputPort(presenter);
                  await calculateDistanceToUseCase.Execute("1 Nelson Street, Auckland", "96 Holly Street, Avondale");
                  return presenter.Distance;
              }
                  
            );
        }
    }

    public class DistancelySchema : Schema
    {
        public DistancelySchema(IServiceProvider provider)
            : base(provider)
        {
            Query = provider.GetRequiredService<DistanceQuery>();
            // Mutation = provider.GetRequiredService<StarWarsMutation>();
        }
    }
}
