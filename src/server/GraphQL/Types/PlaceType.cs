using System;
using Domain;
using GraphQL.Types;

namespace GraphQL.Common.Types
{
    public class PlaceType : ObjectGraphType<Place>
    {
        public PlaceType()
        {
            Field(p => p.Address).Description("The Place's Address");
        }
    }
}
