using System;
using Domain;
using GraphQL.Types;

namespace GraphQL.Common.Types
{
    public class DistanceInput : InputObjectGraphType
    {

        public DistanceInput()
        {
            Name = "distanceInput";
            Field<NonNullGraphType<StringGraphType>>("fromAddress");
            Field<StringGraphType>("toAddress");
        }
    }
}
