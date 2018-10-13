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
    
    public class RestApiBaseClass
    {
        public const string METHOD_GET    = "GET";
        public const string METHOD_POST   = "POST";
        public const string METHOD_PUT    = "PUT";
        public const string METHOD_DELETE = "DELETE";

        public const string TEST_RESET_ROUTE = "test/reset";

        public const string MQTT_PASSWORD = "";

        internal static async Task<T> Deserialize<T>(HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<T>(requestBody);
            return input;
        }
    }
    
}
