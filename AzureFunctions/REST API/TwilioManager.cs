using System;
using System.Collections.Generic;
using System.Text;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace AzureFunctions
{
    class TwilioManager
    {
        const string ACCOUNT_SID = "ACaa703f534daa6a07ec98bfd319769588";
        const string AUTH_TOKEN = "9a27ac47919c398f3def1595c861afb2";

        // number config https://www.twilio.com/console/phone-numbers/PN1e8de26283e1a51e58b1de8a6c139ab0
        const string TWILLIO_BOUGHT_NUMBER = "+18573203667"; // SID PN1e8de26283e1a51e58b1de8a6c139ab0

        public TwilioManager()
        {
            TwilioClient.Init(ACCOUNT_SID, AUTH_TOKEN);
        }
        public MessageResource SendSms(string to, string text)
        {
            var message = MessageResource.Create(
                new PhoneNumber("+"+to),
                from: new PhoneNumber(TWILLIO_BOUGHT_NUMBER),
                body: text
            );
            return message;
        }
    }
}
