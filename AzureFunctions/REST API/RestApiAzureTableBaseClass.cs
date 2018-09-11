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
    public class RestApiAzureTableBaseClass : RestApiBaseClass
    {
        internal static async Task<bool> AzTableDeleteRow(CloudTable todoTable, string id, string partitionKey)
        {
            var entity = new TableEntity() { PartitionKey = partitionKey, RowKey = id, ETag = "*" };
            var deleteOperation = TableOperation.Delete(entity);
            try
            {
                var deleteResult = await todoTable.ExecuteAsync(deleteOperation);
            }
            catch (StorageException e) when (e.RequestInformation.HttpStatusCode == 404)
            {
                return false;
            }
            return true;
        }
       
        internal static async Task<bool> AzTableDeleteAll(CloudTable todoTable)
        {
            try
            {
                return true;
            }
            catch (System.Exception ex)
            {
                return false;
            }            
        }
        internal static async Task<IEnumerable<Todo>> AzTableQuery(CloudTable todoTable) {
            var query = new TableQuery<TodoTableEntity>();
            var segment = await todoTable.ExecuteQuerySegmentedAsync(query, null);
            IEnumerable<Todo> s = segment.Select(Mappings.ToTodo);
            return s;
        }
    }
    
}
