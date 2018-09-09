 //[FunctionName("Function1")]
 //       public static IActionResult Run(
 //           [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
 //               HttpRequest req, 
 //           TraceWriter log)
 //       {
 //           log.Info("C# HTTP trigger function processed a request.");

 //           string name = req.Query["name"];

 //           string requestBody = new StreamReader(req.Body).ReadToEnd();
 //           dynamic data = JsonConvert.DeserializeObject(requestBody);
 //           name = name ?? data?.name;

 //           return name != null
 //               ? (ActionResult) new OkObjectResult($"Hello, {name}")
 //               : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
 //       }

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

namespace ServerlessFuncs
{
    public static class TodoApi
    {
        static List<Todo> items = new List<Todo>() {
             new Todo { TaskDescription="Task 0" },
             //new Todo { TaskDescription="Task 2" },
             //new Todo { TaskDescription="Task 3" },
        };

        public const string ROUTE = "todo";
        public const string TEST_ROUTE = "test";

        private static async Task<T> Deserialize<T>(HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<T>(requestBody);
            return input;
        }

        private static Todo LoadResource(string id)
        {
            var todo = items.FirstOrDefault(t => t.Id == id);
            return todo;
        }
        

        [FunctionName("GetTestReset")]
        public static IActionResult GetTestRest(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = TEST_ROUTE + "/reset")]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("test reset");
            items.Clear();
            return new OkResult();
        }

        [FunctionName("CreateTodo")]
        public static async Task<IActionResult> CreateTodo(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("Creating a new item");

            var input = await Deserialize<TodoCreateModel>(req);
            var todo = new Todo() { TaskDescription = input.TaskDescription };
            items.Add(todo);
            return new OkObjectResult(todo);
        }

        [FunctionName("GetTodos")]
        public static IActionResult GetTodos(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ROUTE)]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info("Getting todo list items");
            return new OkObjectResult(items);
        }

        [FunctionName("GetTodoById")]
        public static IActionResult GetTodoById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ROUTE+"/{id}")]
            HttpRequest req, 
            TraceWriter log, 
            string id)
        {
            var todo = LoadResource(id);
            if (todo == null)
                return new NotFoundResult();

            return new OkObjectResult(todo);
        }

        [FunctionName("UpdateTodo")]
        public static async Task<IActionResult> UpdateTodo(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = ROUTE+"/{id}")]
            HttpRequest req,
            TraceWriter log, 
            string id)
        {
            var todo = LoadResource(id);
            if (todo == null)
                return new NotFoundResult();

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //var updated = JsonConvert.DeserializeObject<TodoUpdateModel>(requestBody);

            var updated = await Deserialize<TodoUpdateModel>(req);

            todo.IsCompleted = updated.IsCompleted;
            if (!string.IsNullOrEmpty(updated.TaskDescription))
            {
                todo.TaskDescription = updated.TaskDescription;
            }

            return new OkObjectResult(todo);
        }

        [FunctionName("DeleteTodo")]
        public static IActionResult DeleteTodo(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = ROUTE + "/{id}")]
            HttpRequest req,
            TraceWriter log, 
            string id)
        {
            var todo = LoadResource(id);
            if (todo == null)
                return new NotFoundResult();

            items.Remove(todo);
            return new OkResult();
        }
    }
}
