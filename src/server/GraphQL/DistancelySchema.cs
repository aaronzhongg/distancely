using System;
using GraphQL.Common.Queries;
using GraphQL.Types;
using GraphQL.Utilities;

namespace GraphQL
{
    public class DistancelySchema : Schema
    {
        public DistancelySchema(IServiceProvider provider)
            : base(provider)
        {
            Query = provider.GetRequiredService<DestinationsQuery>();
            // Mutation = provider.GetRequiredService<StarWarsMutation>();
        }
    }
}
