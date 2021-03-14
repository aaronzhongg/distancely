using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using GraphQL.Server.Internal;
using GraphQL.Types;
using Example;
using GraphQL;

namespace AzureFunction.GraphQL.API
{
    public class GraphQL
    {
        private readonly IGraphQLExecuter<ISchema> _graphQLExecuter;

        public GraphQL(IGraphQLExecuter<ISchema> graphQLExecuter)
        {
            _graphQLExecuter = graphQLExecuter;
        }

        [FunctionName("GraphQL")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                ExecutionResult executionResult = await _graphQLExecuter.ExecuteAsync(req, log);

                if (executionResult.Errors != null)
                {
                    log.LogError("GraphQL execution error(s): {Errors}", executionResult.Errors);
                }

                return new GraphQLExecutionResult(executionResult);
            }
            catch (GraphQLBadRequestException ex)
            {
                return new BadRequestObjectResult(new { message = ex.Message });
            }
            //  log.LogInformation("C# HTTP trigger function processed a request.");
            //
            //  string name = req.Query["name"];
            //
            //  string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //  dynamic data = JsonConvert.DeserializeObject(requestBody);
            //  name = name ?? data?.name;
            //
            //  string responseMessage = string.IsNullOrEmpty(name)
            //      ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            //      : $"Hello, {name}. This HTTP triggered function executed successfully.";
            //
            //  return new OkObjectResult(responseMessage);
        }
    }
}
