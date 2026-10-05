using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace vtok_publishing_web.Models
{


    public class Time
    {
        public string Group { get; set; }
        public Int32 Startdate { get; set; }
        public Int32 Enddate { get; set; }
        public int Count { get; set; }
        public Int32 Nowdate
        {
            get
            {
                Int32 unixTimestamp = (Int32)(DateTime.Now.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
                return unixTimestamp;
            }
        }
        public int Round { get; set; }
        public int Approvalcount { get; set; }

        public static int DateTimeToUnixTimestamp(string sdate)
        {
            var dateTime = Convert.ToDateTime(sdate);
            return (Int32)(dateTime.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;

        }

        public static Time JTokenToTime(JToken token)
        {
            Time time = new Time();

            time.Group = (string)token["Group"];
            time.Startdate = (Int32)token["Startdate"];
            time.Enddate = (Int32)token["Enddate"];
            time.Count = (Int32)token["Count"];
            time.Round = (Int32)token["Round"];
            time.Approvalcount = (Int32)token["Approvalcount"];

            return time;

        }
    }


}
