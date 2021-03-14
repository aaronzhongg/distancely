using System;
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
        public DistanceQuery()
        {
            Field<DistanceType>(
              "distance",
              resolve: context => new Distance { DistanceMeters= 1, TravelTime = 1 }
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
