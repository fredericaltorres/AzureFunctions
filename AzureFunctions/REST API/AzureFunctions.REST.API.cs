using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using AzureFunctions;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;


namespace AzureFunctions.RestApi
{
    public class RestApiBaseClass
    {
        public const string METHOD_GET    = "GET";
        public const string METHOD_POST   = "POST";
        public const string METHOD_PUT    = "PUT";
        public const string METHOD_DELETE = "DELETE";

        public const string TEST_RESET_ROUTE = "test/reset";
           
        internal static async Task<T> Deserialize<T>(HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<T>(requestBody);
            return input;
        }
    }
    public class TodoRestApi : RestApiBaseClass
    {
        /// <summary>
        /// Authorization Level
        /// </summary>
        public const AuthorizationLevel AUTH_LEVEL = AuthorizationLevel.Anonymous;
        /// <summary>
        /// Api url keyword
        /// </summary>
        public const string ROUTE = "todo";

        public const string AZURE_TABLE = "todos";
        public const string AZURE_TABLE_PARTITION_KEY = "TODO";
        public const string AZURE_TABLE_CONNECTION_STRING = "AzureWebJobsStorage";
      
     
        [FunctionName("GetTestReset")]
        public static IActionResult GetTestRest(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = TEST_RESET_ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("test reset");            
            return new OkResult();
        }

        [FunctionName("CreateItem")]
        public static async Task<IActionResult> CreateItem(
            [HttpTrigger(AUTH_LEVEL, METHOD_POST, Route = ROUTE)]
            HttpRequest req, 
            [Table(AZURE_TABLE, Connection = AZURE_TABLE_CONNECTION_STRING)] IAsyncCollector<TodoTableEntity> todoTable,
            TraceWriter log)
        {
            log.Info("Creating a new item");
            var inputModel = await Deserialize<TodoUpdateModel>(req);
            var item = new Todo() { TaskDescription = inputModel.TaskDescription };
            var r = todoTable.AddAsync(item.ToTableEntity()).GetAwaiter().IsCompleted;
            return new OkObjectResult(item);
        }

        [FunctionName("GetItems")]
        public static async Task<IActionResult> GetItems(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = ROUTE)]
            HttpRequest req, 
            [Table(AZURE_TABLE, Connection = AZURE_TABLE_CONNECTION_STRING)] CloudTable todoTable,
            TraceWriter log)
        {
            log.Info("Getting todo list items");
            var query = new TableQuery<TodoTableEntity>();
            var segment = await todoTable.ExecuteQuerySegmentedAsync(query, null);
            return new OkObjectResult(segment.Select(Mappings.ToTodo));
        }

        [FunctionName("GetItemById")]
        public static IActionResult GetItemById(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = ROUTE+"/{id}")]HttpRequest req, 
            [Table(AZURE_TABLE, AZURE_TABLE_PARTITION_KEY, "{id}", Connection = AZURE_TABLE_CONNECTION_STRING)] TodoTableEntity todo,
            TraceWriter log, 
            string id)
        {
            log.Info("Getting todo item by id");
            if (todo == null) // << The todo is loaded automatically
            {
                log.Info($"Item {id} not found");
                return new NotFoundResult();
            }
            return new OkObjectResult(todo.ToTodo());
        }

        [FunctionName("UpdateItem")]
        public static async Task<IActionResult> UpdateItem(
            [HttpTrigger(AUTH_LEVEL, METHOD_PUT, Route = ROUTE+"/{id}")]HttpRequest req, 
            [Table(AZURE_TABLE, Connection = AZURE_TABLE_CONNECTION_STRING)] CloudTable todoTable,
            TraceWriter log, string id)
        {
            var updatedItem = await Deserialize<TodoUpdateModel>(req);
            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //var updated = JsonConvert.DeserializeObject<TodoUpdateModel>(requestBody);
            var findOperation = TableOperation.Retrieve<TodoTableEntity>(AZURE_TABLE_PARTITION_KEY, id);
            var findResult = await todoTable.ExecuteAsync(findOperation);
            if (findResult.Result == null)
                return new NotFoundResult();

            var existingRow = (TodoTableEntity)findResult.Result;
            existingRow.IsCompleted = updatedItem.IsCompleted;
            if (!string.IsNullOrEmpty(updatedItem.TaskDescription))
                existingRow.TaskDescription = updatedItem.TaskDescription;

            var replaceOperation = TableOperation.Replace(existingRow);
            await todoTable.ExecuteAsync(replaceOperation);
            return new OkObjectResult(existingRow.ToTodo());
        }

        [FunctionName("DeleteItem")]
        public static async Task<IActionResult> DeleteItem(
            [HttpTrigger(AUTH_LEVEL, METHOD_DELETE, Route = ROUTE + "/{id}")]HttpRequest req,
            [Table("todos", Connection = "AzureWebJobsStorage")] CloudTable todoTable,
            TraceWriter log, 
            string id)
        {
            var entity = new TableEntity(){ PartitionKey = AZURE_TABLE_PARTITION_KEY, RowKey = id, ETag = "*" };
            var deleteOperation = TableOperation.Delete(entity);
            try
            {
                var deleteResult = await todoTable.ExecuteAsync(deleteOperation);
            }
            catch (StorageException e) when (e.RequestInformation.HttpStatusCode == 404)
            {
                return new NotFoundResult();
            }
            return new OkResult();
        }
    }
}
