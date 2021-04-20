using System;
using System.Collections.Generic;
using Application.UseCases.CalculateDistanceTo;
using GraphQL.Common.Types;
using GraphQL.Types;

namespace GraphQL.Common.Queries
{
    public class DistanceQuery : ObjectGraphType
    {
        private readonly CalculateDistanceToPresenter _presenter;

        // todo: Input types
        public DistanceQuery(ICalculateDistanceToUseCase calculateDistanceToUseCase)
        {
            _presenter = new CalculateDistanceToPresenter();

            FieldAsync<ListGraphType<DistanceType>>(
              "distances", // todo: distances?
              arguments: new QueryArguments(
                  new QueryArgument<StringGraphType> { Name = "fromAddress" },  // todo: how to clean this up i.e. Input classes? - make strongly typed
                  new QueryArgument<ListGraphType<StringGraphType>> { Name = "destinationAddresses" }),
              //arguments: new QueryArguments(
              //    new QueryArgument<NonNullGraphType<DistanceInput>> { Name = "distanceInput" }
              //  ),
              resolve: async context =>
              {
                  // todo: input validation
                  Console.WriteLine(context.GetArgument<string>("fromAddress"));
                  Console.WriteLine(context.GetArgument<List<string>>("destinationAddresses"));
                  //Console.WriteLine(context.GetArgument<DistanceInput>("distanceInput").Fields);

                  calculateDistanceToUseCase.SetOutputPort(_presenter);
                  await calculateDistanceToUseCase.Execute(
                      context.GetArgument<string>("fromAddress"), 
                      context.GetArgument<List<string>>("destinationAddresses").ToArray());
                  return _presenter.Distances;
              }
            );
        }
    }
}


// context.Argument["di"]
//context.GetArgument<object>("distanceInput")

//context.GetArgument<DistanceInput>("distanceInput")
//query($distanceInput: DistanceInput!) {
//    distance(di: $distanceInput) {
//        distanceMeters
//        travelTime
//    }
//}


//{
//    "distanceInput": {
//        "fromAddress": "106 Glenmore Road",
//    "toAddress": "1 Nelson Street"
//    }
//}