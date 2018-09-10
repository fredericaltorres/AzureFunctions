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
    public class InMemoryStore : IStore
    {
        List<Todo> items = new List<Todo>() {
             new Todo { TaskDescription = "Task 0" }
        };
        
        public List<Todo> GetItems()
        {
            return this.items;
        }

        public Todo Add(Todo item)
        {
            items.Add(item);
            return item;
        }

        public Todo Remove(Todo item)
        {
            items.Remove(item);
            return item;
        }
        
        public Todo GetItem(string id)
        {
            var todo = items.FirstOrDefault(t => t.Id == id);
            return todo;
        }
        public void Clear()
        {
            items.Clear();
        }
    }
}