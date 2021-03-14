using AzureFunction.GraphQL.API;
using GraphQL;
using GraphQL.NewtonsoftJson;
using GraphQL.Server;
using GraphQL.Types;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(Startup))]
namespace AzureFunction.GraphQL.API
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton<DistanceQuery>();
            builder.Services.AddSingleton<DistanceType>();
            builder.Services.AddSingleton<ISchema, DistancelySchema>();

            builder.Services.AddSingleton<IDocumentExecuter>(sp => new DocumentExecuter());
            builder.Services.AddSingleton<IDocumentWriter>(new DocumentWriter());
            builder.Services.AddGraphQL();
        }
    }
}
