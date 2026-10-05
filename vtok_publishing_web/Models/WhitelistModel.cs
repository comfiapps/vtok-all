using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace vtok_publishing_web.Models
{

    public class SitinEntity
    {
        public int Id { get; set; }
        public string Addr { get; set; }
        public string Date { get; set; }

        public static SitinEntity ToSitin(string Addr)
        {
            //인증완료업데이트 

            SitinEntity sitin = new SitinEntity();

            sitin.Addr = Addr;
            sitin.Date = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");

            return sitin;
        }

    }
    public class SitinDto
    {
        public string Addr { get; set; }
        public int Count { get; set; }

       
    }
    public class Whitelist
    {

        public string Walletaddress { get; set; }
        public int Count { get; set; }
    }

    public class transactionModel
    {
        public string Gas { get; set; }
        public string To
        {
            get
            {
                string to = "0xc095f858dd6a0d87cb9755e11caba1ec6305a136";
                return to;
            }
        }
        public string Value { get; set; }
        public int Count { get; set; }
        public string Msg { get; set; }
    }



    public class WhitelistModel
    {

        public List<Whitelist> list
        {
            get
            {
                return _list;
            }
        }


        private List<Whitelist> _list
        {
            get
            {
                List<Whitelist> wlist = new List<Whitelist>()
                {
                    new Whitelist() {Walletaddress = "0xc095f858dd6a0d87cb9755e11caba1ec6305a136",Count = 2 },
                    new Whitelist() {Walletaddress = "0x0d52e72e4c6163f3c970e9a257caf5e43898db4c",Count = 2 },
                    new Whitelist() {Walletaddress = "0x3",Count = 2 },
                    new Whitelist() {Walletaddress = "0x4",Count = 2 },
                    new Whitelist() {Walletaddress = "0x5",Count = 2 },
                    new Whitelist() {Walletaddress = "0x6",Count = 2 },
                    new Whitelist() {Walletaddress = "0x7",Count = 2 },
                    new Whitelist() {Walletaddress = "0x9",Count = 2 },
                    new Whitelist() {Walletaddress = "081x",Count = 2 },
                    new Whitelist() {Walletaddress = "0x11",Count = 2 },
                    new Whitelist() {Walletaddress = "0x12",Count = 2 },
                    new Whitelist() {Walletaddress = "0xa",Count = 2 },
                    new Whitelist() {Walletaddress = "0xsdasdf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xfadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xdf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xdaf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xafd",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadfadf",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadfadfa",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadfadfas",Count = 2 },
                    new Whitelist() {Walletaddress = "0xadfadfadfasf",Count = 2 },

                };

                return wlist;
            }

        }

    }

}