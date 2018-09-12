using System;
using System.Threading.Tasks;
using AzureFunctions.RestApi;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Table;

namespace AzureFunctions.REST_API
{
    public class ScheduledFunction : RestApi.RestApiBaseClass
    {
        [FunctionName("ScheduledFunction")]
        public static async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer,
            [Table(RestApi.TodoRestApi.AZURE_TABLE, Connection = RestApi.TodoRestApi.AZURE_TABLE_CONNECTION_STRING)] CloudTable table,
            TraceWriter log)
        {
            log.Info($"Deleting all items at {DateTime.Now}");
            AzureTableHelper.DeleteAll(table);            
        }
    }
}
