using Domain;
using GraphQL.Types;

namespace GraphQL.Common.Types
{
    public class DistanceType : ObjectGraphType<Distance>
    {
        public DistanceType()
        {
            Field(x => x.DistanceMeters).Description("Distance in meters.");
            Field(x => x.TravelTime).Description("Travel time in seconds.");
        }
    }
}
