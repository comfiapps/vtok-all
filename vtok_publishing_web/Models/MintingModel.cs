using System;

namespace vtok_publishing_web.Models
{

    public class MittingEntity
    {
        public int Id { get; set; }
        public string Addr { get; set; }
        public string Tx_id { get; set; }
        public string Value { get; set; }
        public string Date { get; set; }
        public int Count { get; set; }
        public int Round { get; set; }

        public static MittingEntity ToMitting(MittingDto row)
        {
            MittingEntity mitt = new MittingEntity();

            mitt.Addr = row.Addr;
            mitt.Tx_id = row.Tx_id;
            mitt.Value = row.Value;
            mitt.Count = row.Count;
            mitt.Round = row.Round;
            mitt.Date = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");

            return mitt;
        }
    }


    public class MittingDto
    {
        public string Addr { get; set; }
        public string Tx_id { get; set; }
        public string Value { get; set; }
        public int Count { get; set; }
        public int Round { get; set; }
    }

    public class Mitting
    {
        public string Addr { get; set; }
        public string Tx_id { get; set; }
        public string Value { get; set; }
    }

    public class MittingAddr
    {
        public string Msg { get; set; }
        public int Approvalcount { get; set; }
        public int Resultcount { get; set; }
    }

}

