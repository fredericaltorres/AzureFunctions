using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureFunctions.REST_API
{
    public static class QueueListener
    {
        [FunctionName("QueueListener")]
        public static async Task Run(
            [QueueTrigger(RestApi.TodoRestApi.AZURE_TABLE, Connection = RestApi.TodoRestApi.AZURE_TABLE_CONNECTION_STRING)]
            Todo todo, 
            [Blob(RestApi.TodoRestApi.AZURE_TABLE, Connection = RestApi.TodoRestApi.AZURE_TABLE_CONNECTION_STRING)]
            CloudBlobContainer container,
            TraceWriter log)
        {
            await container.CreateIfNotExistsAsync();
            var blob = container.GetBlockBlobReference($"{todo.Id}.txt");
            await blob.UploadTextAsync($"Created a new task: {todo.TaskDescription}");
            log.Info($"C# Queue trigger function processed: {todo.TaskDescription}");
        }
    }
}
