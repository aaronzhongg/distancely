using Application.Services;
using Application.UseCases.CalculateDistanceTo;
using AzureFunction.GraphQL.API;
using GraphQL;
using GraphQL.Common.Queries;
using GraphQL.Common.Types;
using GraphQL.NewtonsoftJson;
using GraphQL.Server;
using GraphQL.Types;
using Infrastructure.DistanceCalculator;
using Infrastructure.Options;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(Startup))]
namespace AzureFunction.GraphQL.API
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddScoped<DistanceQuery>();
            builder.Services.AddScoped<DistanceType>();
            builder.Services.AddScoped<ISchema, DistancelySchema>();

            builder.Services.AddSingleton<IDocumentExecuter>(sp => new DocumentExecuter());
            builder.Services.AddSingleton<IDocumentWriter>(new DocumentWriter());
            builder.Services.AddGraphQL();

            builder.Services.AddHttpClient();
            builder.Services.AddScoped<ICalculateDistanceToUseCase, CalculateDistanceToUseCase>();
            builder.Services.AddScoped<IDistanceCalculator, GoogleDistanceService>();

            builder.Services.AddOptions<GoogleOptions>()
                .Configure<IConfiguration>((settings, configuration) =>
                {
                    configuration.GetSection(nameof(GoogleOptions)).Bind(settings);
                });
        }
    }
}
