/*
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
        
        private static IStore _store = null;
        /// <summary>
        /// 
        /// </summary>
        private static IStore Store
        {
            get
            {
                if(_store == null)
                    _store = new InMemoryStore();
                return _store;
            }
        }
     
        [FunctionName("GetTestReset")]
        public static IActionResult GetTestRest(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = TEST_RESET_ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("test reset");
            Store.Clear();
            return new OkResult();
        }

        [FunctionName("CreateItem")]
        public static async Task<IActionResult> CreateItem(
            [HttpTrigger(AUTH_LEVEL, METHOD_POST, Route = ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("Creating a new item");
            var inputModel = await Deserialize<TodoUpdateModel>(req);
            var item = new Todo() { TaskDescription = inputModel.TaskDescription };
            Store.Add(item);
            return new OkObjectResult(item);
        }

        [FunctionName("GetItems")]
        public static IActionResult GetItems(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("Getting todo list items");
            return new OkObjectResult(Store.GetItems());
        }

        [FunctionName("GetItemById")]
        public static IActionResult GetItemById(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = ROUTE+"/{id}")]
            HttpRequest req, 
            TraceWriter log, 
            string id)
        {
            log.Info($"GetItemById {id}");
            var item = Store.GetItem(id);
            if (item == null)
                return new NotFoundResult();

            return new OkObjectResult(item);
        }

        [FunctionName("UpdateItem")]
        public static async Task<IActionResult> UpdateItem(
            [HttpTrigger(AUTH_LEVEL, METHOD_PUT, Route = ROUTE+"/{id}")]
            HttpRequest req,
            TraceWriter log, 
            string id)
        {
            var item = Store.GetItem(id);
            if (item == null)
                return new NotFoundResult();

            var updatedItem = await Deserialize<TodoUpdateModel>(req);
            item.IsCompleted = updatedItem.IsCompleted;
            if (!string.IsNullOrEmpty(updatedItem.TaskDescription))
                item.TaskDescription = updatedItem.TaskDescription;

            return new OkObjectResult(item);
        }

        [FunctionName("DeleteItem")]
        public static IActionResult DeleteItem(
            [HttpTrigger(AUTH_LEVEL, METHOD_DELETE, Route = ROUTE + "/{id}")]
            HttpRequest req,
            TraceWriter log, 
            string id)
        {
            var item = Store.GetItem(id);
            if (item == null)
                return new NotFoundResult();

            Store.Remove(item);
            return new OkResult();
        }
    }
}
*/