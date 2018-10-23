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
using Twilio.Rest.Api.V2010.Account;

namespace AzureFunctions.RestApi
{
    /// <summary>
    /// REST API to send SMS text and receive SMS text answer from Twilio
    /// </summary>
    public class SmsRestApi : RestApiBaseClass
    {
        public const AuthorizationLevel AUTH_LEVEL  = AuthorizationLevel.Anonymous;
        public const string SMS_ROUTE               = "sms";
        static MQTTManager smsMqttManager           = null;
        const string channel                        = "/sms-update";

        static SmsRestApi()
        {
            string connectionString = MQTT_URL;
            string username         = MQTT_USER;
            string password         = MQTT_PASSWORD;
            var clientId            = MQTTManager.BuildClientId();
            
            if(smsMqttManager == null)
            {
                Console.WriteLine("Open MQTT");
                smsMqttManager = new MQTTManager(connectionString, clientId, username, password);
                smsMqttManager.Start(channel);
                smsMqttManager.Publish(channel, $"@@@ New SMS rest api instance running on {Environment.MachineName} {Environment.UserDomainName} {Environment.UserName}");
            }                
        }

        /// <summary>
        /// REST API to send SMS to a specific number
        /// Call Syntax:
        ///     http://localhost:7071/api/sms/19787606031/Hello1
        ///     https://xxxx.azurewebsites.net/api/sms/19787606031/HelloFromAzure
        /// </summary>
        /// <param name="req"></param>
        /// <param name="log"></param>
        /// <param name="to"></param>
        /// <param name="text"></param>
        /// <returns></returns>
        [FunctionName("SendSms")]
        public static IActionResult SendSms(
            [HttpTrigger(AUTH_LEVEL, METHOD_GET, Route = SMS_ROUTE+"/{to}/{text}")]
            HttpRequest req, 
            TraceWriter log, 
            string to, string text)
        {
            log.Info($"SendSms {to}, {text}");
            MessageResource msg = null;
            try {
                msg = new TwilioManager().SendSms(to, text);
                return new OkObjectResult(msg);
            }
            catch(System.Exception ex)
            {
                return new OkObjectResult(ex.Message); // https://exceptionnotfound.net/asp-net-core-demystified-action-results/
            }
        }

        
        /// <summary>
        /// REST API WebHook to be called by the Twilio server,
        /// when a text is sent to my Twillio number.
        /// When a SMS text to my Twilio phone number is received, the
        /// Twilio system is configured to call this REST API.
        /// This REST API then broadcast via MQTT the text message.
        /// The MQTT Client then analyse this notification has an user answer.
        /// Call Syntax:
        ///     http://localhost:7071/api/sms/receive
        ///     https://xxxxxx.azurewebsites.net/api/sms/receive
        /// The Request form contains a list of name/value related to the SMS.
        /// </summary>
        /// <param name="req"></param>
        /// <param name="log"></param>
        /// <returns></returns>
        [FunctionName("ReceiveSms")]
        public static IActionResult ReceiveSms(
            [HttpTrigger(AUTH_LEVEL, METHOD_POST, Route = SMS_ROUTE+"/receive")]
            HttpRequest req, 
            TraceWriter log)
        {
            log.Info($"ReceiveSms");
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
