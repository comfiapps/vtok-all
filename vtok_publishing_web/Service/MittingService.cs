using System;
using vtok_publishing_web.Models;
using vtok_publishing_web.Repository;


using Microsoft.Extensions.Logging;


namespace vtok_publishing_web.Service
{
    public interface IMittingService
    {
        Time GetTime();
        transactionModel Sitin(SitinDto addr);
        MittingAddr CheckAddr(string Walletaddress);
        string GetMintingTime();
        string Approval(MittingDto add);
        int GetCount(int round);
        int GetResult();
    }

    public class MittingService : IMittingService
    {
        private IMittingRepository _repo;
        private IRedisRepository _redis;
        private ILogger _logger;
        public MittingService(IMittingRepository repo, IRedisRepository redis, ILoggerFactory loggerFactory)
        {
            _repo = repo;
            _redis = redis;
            _logger = loggerFactory.CreateLogger(nameof(MittingService));
        }

        public Time GetTime()
        {
            return _redis.GetTime();
        }
        public string GetMintingTime()
        {
            _redis.SetMintingTime();

            return _redis.GetMintingTime();

        }
        public int GetResult()
        {
            return _repo.GetResult(); 
        }
        public transactionModel Sitin(SitinDto sitinDto)
        {
            transactionModel transaction = new transactionModel();
            var  time = _redis.CheckTime();
      
            if ( time == null )
            {
                transaction.Msg = "{type:6,msg:민팅 시간이 아닙니다.}";
                return null;
            }

            var cnt = Convert.ToInt32(_redis.GetKey("Mitting" + time.Round));
            
            if ( cnt >= time.Count )
            {
                transaction.Msg = "{type:1,msg:민팅 수량이 모두 소진되었습니다}";
            }

            _repo.Sitin(sitinDto.Addr);

            if (time.Group == "prive")
            {
                var White = _repo.CheckWhitelist(sitinDto.Addr);
                if ( White == null)
                {
                    transaction.Msg = "{type:3, msg:화이트리스트 대상자가 아닙니다}";
                }
                else
                {
                    time.Approvalcount = White.Count;
                }
            }

           int Resultcount = _repo.CheckAddr(time.Round, sitinDto.Addr);

            if ( (time.Approvalcount - Resultcount) - sitinDto.Count < 1 )
            {
                transaction.Msg = "{type:4, msg:내게 남은 수량보다 더 많이 민팅할 수 없습니다} ";
            }

            transaction.Count = sitinDto.Count;
            return transaction;
        }

        public MittingAddr CheckAddr(string addr)
        {
            transactionModel transaction = new transactionModel();

            MittingAddr mittingaddr = new MittingAddr();

            var time = _redis.CheckTime();

            mittingaddr.Approvalcount = time.Approvalcount;

            mittingaddr.Resultcount = _repo.CheckAddr(time.Round, addr);


            if (time == null)
            {
                mittingaddr.Msg = "{type:6,msg:민팅 시간이 아닙니다.}";
                return null;
            }

            var cnt = Convert.ToInt32(_redis.GetKey("Mitting" + time.Round));

            if (cnt >= time.Count)
            {
                mittingaddr.Msg = "{type:1,msg:민팅 수량이 모두 소진되었습니다}";
            }

            if (time.Group == "prive")
            {
                var White = _repo.CheckWhitelist(addr);
                if (White == null)
                {
                    mittingaddr.Msg = "{type:3, msg:화이트리스트 대상자가 아닙니다}";
                }
                else
                {

                    mittingaddr.Approvalcount = White.Count;

                }
            }


            //참여한 수량구하기


            //남은수량체

            return mittingaddr;
        }


        public string Approval(MittingDto add)
        {
            Mitting  result = _repo.Approval(add);
            var cnt =  _repo.CheckCount(add.Round).ToString();
             _redis.SetKey("Mitting" + add.Round , cnt );

            return cnt;
        }

        public  int GetCount(int round)
        {
            var cnt = Convert.ToInt32( _redis.GetKey( "Mitting" + round ));
            return cnt;
        }

     
       
    }
}