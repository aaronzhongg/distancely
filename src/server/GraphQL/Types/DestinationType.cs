using Domain;
using GraphQL.Types;

namespace GraphQL.Common.Types
{
    public class DestinationType : ObjectGraphType<Destination>
    {
        // 2021-04-20 TODO: Add place!!!
        public DestinationType()
        {
            Field<PlaceType>("place");
            Field(x => x.DistanceMeters).Description("Distance in meters.");
            Field(x => x.TravelTime).Description("Travel time in seconds.");
        }
    }
}
