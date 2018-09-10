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

namespace AzureFunctions.RestApi
{
    public static class TodoApi
    {
        public const string ROUTE = "todo";
        public const string TEST_RESET_ROUTE = "test/reset";

        private static IStore _store = null;
        private static IStore Store
        {
            get
            {
                if(_store == null)
                    _store = new InMemoryStore();
                return _store;
            }
        }
        
        private static async Task<T> Deserialize<T>(HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<T>(requestBody);
            return input;
        }

        
        [FunctionName("GetTestReset")]
        public static IActionResult GetTestRest(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = TEST_RESET_ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("test reset");
            Store.Clear();
            return new OkResult();
        }

        [FunctionName("CreateItem")]
        public static async Task<IActionResult> CreateItem(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("Creating a new item");

            var input = await Deserialize<TodoCreateModel>(req);
            var todo = new Todo() { TaskDescription = input.TaskDescription };
            Store.Add(todo);
            return new OkObjectResult(todo);
        }

        [FunctionName("GetItems")]
        public static IActionResult GetItems(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("Getting todo list items");
            return new OkObjectResult(Store.GetItems());
        }

        [FunctionName("GetItemById")]
        public static IActionResult GetItemById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ROUTE+"/{id}")]
            HttpRequest req, 
            TraceWriter log, 
            string id)
        {
            var todo = Store.GetItem(id);
            if (todo == null)
                return new NotFoundResult();

            return new OkObjectResult(todo);
        }

        [FunctionName("UpdateItem")]
        public static async Task<IActionResult> UpdateItem(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = ROUTE+"/{id}")]
            HttpRequest req,
            TraceWriter log, 
            string id)
        {
            var todo = Store.GetItem(id);
            if (todo == null)
                return new NotFoundResult();

            var updated = await Deserialize<TodoUpdateModel>(req);
            todo.IsCompleted = updated.IsCompleted;
            if (!string.IsNullOrEmpty(updated.TaskDescription))
                todo.TaskDescription = updated.TaskDescription;

            return new OkObjectResult(todo);
        }

        [FunctionName("DeleteItem")]
        public static IActionResult DeleteItem(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = ROUTE + "/{id}")]
            HttpRequest req,
            TraceWriter log, 
            string id)
        {
            var todo = Store.GetItem(id);
            if (todo == null)
                return new NotFoundResult();

            Store.Remove(todo);
            return new OkResult();
        }
    }
}
