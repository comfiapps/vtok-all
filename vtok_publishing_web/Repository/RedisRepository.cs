
using Microsoft.Extensions.Logging;
using StackExchange.Redis;



using vtok_publishing_web.Models;
using System.Linq;

using System.Data;
using vtok_publishing_web.Data;
using Microsoft.Extensions.Configuration;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace vtok_publishing_web.Repository
{

    public interface IRedisRepository
    {
        string SetKey(string key, string val);
        string GetKey(string key);
        string DelKey(string key);
        Time GetTime();
        Time CheckTime();
        string GetMintingTime();
        void SetMintingTime();




    }

    public class RedisRepository : IRedisRepository
    {
        private ILogger _logger;
        private IDatabase _db;
        private IConfiguration _Configuration;


        public RedisRepository(IConnectionMultiplexer connMulti, ILoggerFactory loggerFactory , IConfiguration configuration)
        {
            _db = connMulti.GetDatabase();
            _Configuration = configuration;
            _logger = loggerFactory.CreateLogger(nameof(RedisRepository));
        }

        
        public string SetKey(string key, string val)
        {

            _db.StringSet(key,val);
            return "1";

        }
        public string GetKey(string key)
        {

            return  _db.StringGet(key);

        }
        public string DelKey(string key)
        {
            _db.KeyDelete(key);
            return "1";
        }
        public void SetMintingTime()
        {

            string json = "" +
             "{ " +
             "  'OpenTime': '2022-02-13 16:40:00', " +
             "  'EndTime': '2022-02-28 14:00:00', " +
             "  'Price':'50', " +
             "  'Times': [ " +
             "               { 'Group': 'prive', " +
             "                 'Startdate': '2022-02-12 14:00:00', " +
             "                 'Enddate': '2022-02-12 10:00:00', " +
             "                 'Count': 2500, " +
             "                 'Round': 1, " +
             "                 'Approvalcount': 5 " +
             "               }, " +
             "               { 'Group': 'public', " +
             "                 'Startdate': '2022-02-12 14:00:00', " +
             "                 'Enddate': '2022-02-12 18:00:00', " +
             "                 'Count': 2500, " +
             "                 'Round': 2, " +
             "                 'Approvalcount': 5 " +
             "               }, " +
             "               { 'Group': 'public', " +
             "                 'Startdate': '2022-02-12 14:00:00', " +
             "                 'Enddate': '2022-02-17 10:00:00', " +
             "                 'Count': 2500, " +
             "                 'Round': 3, " +
             "                 'Approvalcount': 5 " +
             "               }, " +
             "             ] " +
             "}";


            JObject jObject = JObject.Parse(json);


            string OpenTime = (string)jObject["OpenTime"];
            string EndTime  =  (string)jObject["EndTime"];
            string Price = (string)jObject["Price"];


            _db.StringSet("OpenTime", Time.DateTimeToUnixTimestamp(OpenTime));
            _db.StringSet("EndTime", Time.DateTimeToUnixTimestamp(EndTime));
            _db.StringSet("Price", Price);



            int index = 0;

            foreach ( JToken time in jObject["Times"])
            {
                //Console.WriteLine(time.index);
                jObject["Times"][index]["Startdate"] = Time.DateTimeToUnixTimestamp((string)time["Startdate"]);
                jObject["Times"][index]["Enddate"] = Time.DateTimeToUnixTimestamp((string)time["Enddate"]);
                index++;
            }

            string serializeResult = JsonConvert.SerializeObject(jObject);
            _db.StringSet("Times", serializeResult);

        }
        public string GetMintingTime()
        {
            Time times = new Time();
            Int32 basicdate = times.Nowdate;

            Int32 OpenTime = (Int32)_db.StringGet("OpenTime");
            Int32 EndTime = (Int32)_db.StringGet("EndTime");

            if (OpenTime <= basicdate && EndTime >= basicdate)
            {
                return "Start";

            }
            else if (EndTime <= basicdate)
            {

                return "End";

            }
            else
            { 

                return "Wait";

            }

        }


        public Time GetTime()
        {
          
            string  minting   = GetMintingTime();
            if (minting == "Start")
            {
                string Times = _db.StringGet("Times");

                JObject jObject = JObject.Parse(Times);

                Time times = new Time();
                Int32 basicdate = times.Nowdate;

                foreach (JToken time_ in jObject["Times"])
                {
                    if ((int)time_["Enddate"] >= basicdate)
                    {
                        Time time = Time.JTokenToTime(time_);
                        return time;
                    }
                }

                return new Time();
            }

            return null;

        }
        public Time CheckTime()
        {

            string Times = _db.StringGet("Times");

            JObject jObject = JObject.Parse(Times);

            Time times = new Time();
            Int32 basicdate = times.Nowdate;

            foreach (JToken time_ in jObject["Times"])
            {
                if ((int)time_["Startdate"] <= basicdate && (int)time_["Enddate"] >= basicdate )
                {
                    Time time = Time.JTokenToTime(time_);
                    return time;
                }
            }
            return null;
        }

    }
}