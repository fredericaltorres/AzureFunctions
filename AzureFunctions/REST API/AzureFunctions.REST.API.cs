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
using System.Linq.Expressions;
using System;

namespace AzureFunctions.RestApi
{
    /// <summary>
    /// update https://marketplace.visualstudio.com/items?itemName=VisualStudioWebandAzureTools.AzureFunctionsandWebJobsTools
    /// Reference
    ///     Microsoft.NET.Sdk.Functions
    ///     Microsoft.Azure.WebJobs.Extensions.Storage
    /// Breaking Changes
    ///     https://github.com/Azure/app-service-announcements/issues/129
    /// 
    /// Azure Deployed Calls
    ///     http://azurefunctionsfred.azurewebsites.net/api/todo
    ///     https://azurefunctionsfred.azurewebsites.net/api/todo
    ///     
    /// Trouble Shooting
    /// Go to console management
    /// D:\home\LogFiles\Application\Functions 
    /// </summary>
    public class TodoRestApi : RestApiBaseClass
    {
        public const AuthorizationLevel AUTH_LEVEL        = AuthorizationLevel.Anonymous;
        public const string ROUTE                         = "todo";
        public const string AZURE_TABLE                   = "todos";
        public const string AZURE_TABLE_PARTITION_KEY     = "TODO";
        public const string AZURE_TABLE_CONNECTION_STRING = "AzureWebJobsStorage";

        //[FunctionName("GetTestReset")]
        //public static IActionResult GetTestReset(
        //    [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = TEST_RESET_ROUTE)]
        //    HttpRequest req,
        //    TraceWriter log)
        //{
        //    log.Info("test reset");
        //    return new OkResult();
        //}

        [FunctionName("GetTestReset")]
        public static async Task<IActionResult> GetTestReset(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = TEST_RESET_ROUTE)]HttpRequest req,
            [Table("todos", Connection = "AzureWebJobsStorage")] CloudTable todoTable,
            TraceWriter log)
        {
            var r = await AzureTableHelper.DeleteAll(todoTable);
            if(r)
                return new OkResult();
            else
                return new NotFoundResult();
        }

        // POST "http://localhost:7071/api/todo_queue"
        [FunctionName("CreateItemAndQueue")]
        public static async Task<IActionResult> CreateItemAndQueue(
            [HttpTrigger(AUTH_LEVEL, METHOD_POST, Route = ROUTE+"_queue")]
            HttpRequest req, 
            /* >> QUEUE >> */[Queue(AZURE_TABLE, Connection = AZURE_TABLE_CONNECTION_STRING)] IAsyncCollector<Todo> todoQueue,
            TraceWriter log)
        {
            log.Info("Creating a new item");
            var inputModel = await Deserialize<TodoUpdateModel>(req);
            var item = new Todo() { TaskDescription = inputModel.TaskDescription };

            await todoQueue.AddAsync(item);
            return new OkObjectResult(item);
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
            var task = todoTable.AddAsync(item.ToTableEntity());
            task.Wait();
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
            IEnumerable<Todo> s = await AzureTableHelper.Query(todoTable);
            var r = new OkObjectResult(s);
            return r;
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
            var r = await AzureTableHelper.DeleteRow(todoTable, id, AZURE_TABLE_PARTITION_KEY);
            if(r)
                return new OkResult();
            else
                return new NotFoundResult();
        }
    }
}
