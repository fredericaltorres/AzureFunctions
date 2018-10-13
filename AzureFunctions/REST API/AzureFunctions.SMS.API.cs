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
using MQTTManagerLib;

namespace AzureFunctions.RestApi
{
    /// <summary>
    /// Visual Studio Extension needed
    ///     https://marketplace.visualstudio.com/items?itemName=VisualStudioWebandAzureTools.AzureFunctionsandWebJobsTools
    /// Reference
    ///     Microsoft.NET.Sdk.Functions
    ///     Microsoft.Azure.WebJobs.Extensions.Storage
    /// Breaking Changes deployed on 2018.08
    ///     https://github.com/Azure/app-service-announcements/issues/129
    /// 
    /// Azure Deployed Calls
    ///     http://azurefunctionsfred.azurewebsites.net/api/todo
    ///     https://azurefunctionsfred.azurewebsites.net/api/todo
    ///     
    /// Trouble Shooting
    ///     Go to console management
    ///     D:\home\LogFiles\Application\Functions 
    /// </summary>
    public class SmsRestApi : RestApiBaseClass
    {
        public const AuthorizationLevel AUTH_LEVEL = AuthorizationLevel.Anonymous;
        public const string SMS_ROUTE              = "sms";
        static MQTTManager smsMqttManager          = null;
        const string channel                       = "/sms-update";

        static SmsRestApi()
        {
            string connectionString = "tcp://m15.cloudmqtt.com:10989";
            string username         = "user1";
            string password         = MQTT_PASSWORD;
            var clientId            = MQTTManager.BuildClientId();
            
            if(smsMqttManager == null)
            {
                Console.WriteLine("Open MQTT");
                smsMqttManager = new MQTTManager(connectionString, clientId, username, password);
                smsMqttManager.Start(channel);
                smsMqttManager.Publish(channel, $"New SMS rest api instance running on {Environment.MachineName} {Environment.UserDomainName} {Environment.UserName}");
            }                
        }

        // http://localhost:7071/api/sms/19787606031/Hello1
        // https://azurefunctionsfred.azurewebsites.net/api/sms/19787606031/HelloFromAzure
        [FunctionName("SendSms")]
        public static IActionResult SendSms(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = SMS_ROUTE+"/{to}/{text}")]
            HttpRequest req, 
            TraceWriter log, 
            string to, string text)
        {
            log.Info($"SendSms {to}, {text}");
            var msg = new TwilioManager().SendSms(to, text);
            return new OkObjectResult(msg);
        }

        // http://localhost:7071/api/sms/receive
        // https://azurefunctionsfred.azurewebsites.net/api/sms/receive
        [FunctionName("ReceiveSms")]
        public static IActionResult ReceiveSms(
            [HttpTrigger(AUTH_LEVEL, METHOD_POST, Route = SMS_ROUTE+"/receive")]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info($"ReceiveSms ");
            var d = new Dictionary<string, string>();
            foreach(var e in req.Form)
            {
                Console.WriteLine($"{e.Key} = {e.Value}");
                d.Add(e.Key, e.Value);
            }
            var jsonValues = JsonConvert.SerializeObject(d);
            smsMqttManager.Publish(channel, jsonValues);
            return new OkResult();
        } 
    }
}
