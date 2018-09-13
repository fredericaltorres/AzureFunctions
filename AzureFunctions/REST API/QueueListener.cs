using System;
using System.Threading.Tasks;
using AzureFunctions.RestApi;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage;
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
            var storage = new AzureStorageHelper(Environment.GetEnvironmentVariable(RestApi.TodoRestApi.AZURE_TABLE_CONNECTION_STRING));
            var r = await storage.UploadTextFile(RestApi.TodoRestApi.AZURE_TABLE, $"{todo.Id}.txt", $"Created a new task: {todo.TaskDescription}");

            var fileName = $"{todo.Id}.txt";
            var localPath = @"c:\d";
            var rr = await storage.DownloadBinaryFile(RestApi.TodoRestApi.AZURE_TABLE, fileName, localPath);
            if(rr)
            {
                var text = System.IO.File.ReadAllText(System.IO.Path.Combine(localPath, fileName));
                var text2 = text;
            }
        }
    }
}
