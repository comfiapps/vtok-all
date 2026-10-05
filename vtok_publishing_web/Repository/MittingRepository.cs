using System;
using vtok_publishing_web.Models;
using System.Linq;
using vtok_publishing_web.Data;

using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace vtok_publishing_web.Repository
{

    public interface IMittingRepository
    {
        Whitelist CheckWhitelist(string walletaddress);
        transactionModel Sitin(string walletaddress);
        Mitting Approval(MittingDto add);
        int CheckAddr(int round, string add);
        int CheckCount(int round);
        int GetResult();
        
    }

    public class MittingRepository : IMittingRepository
    {
        private readonly ApiDataContext _context;
        private ILogger _logger;
        private IDbContextTransaction _transaction;
        private string _connectionString;

        public MittingRepository(ApiDataContext context, ILoggerFactory loggerFactory, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DbContext");

            _logger = loggerFactory.CreateLogger(nameof(MittingRepository));

        }

        private MySqlConnection _GetConnection()
        {
            return new MySqlConnection(_connectionString);
        }

        public Mitting Approval(MittingDto add)
        {

            try
            {
                MittingEntity addr = MittingEntity.ToMitting(add);
                _context.MittingEntity.Add(addr);
                _context.SaveChanges();

                Mitting mitting = new Mitting();
         
                return mitting;
            }
            catch (Exception ex)
            {
                _logger.LogError("error update");
                _logger.LogError(ex.Message);
                return null;
            }

        }

        //클릭 주소만 그냥 저장하기
        public transactionModel Sitin(string walletaddress)
        {


            try
            {
                SitinEntity sitin = SitinEntity.ToSitin(walletaddress);

                _context.SitinEntity.Add(sitin);
                _context.SaveChanges();

                transactionModel transaction = new transactionModel();


                return transaction;
            }
            catch (Exception ex)
            {
                

                return null;

            }
        }


        public Whitelist CheckWhitelist(string address)
        {
            WhitelistModel whitelist = new WhitelistModel();
      
            var raw = _context.MittingEntity.Where(m => m.Addr == address);
            if (raw.Count() > 0)
            {

                return null;

            };

            var rows = whitelist.list;

            try
            {
                Whitelist result = rows.Find(x => x.Walletaddress == address);

                if (string.IsNullOrEmpty(result.Walletaddress))
                {
                    return null;

                }
                else
                {
                    
                    return result;
                }

            }
            catch
            {

                return null;
            }
        }

        public int CheckCount(int round)
        {

            try
            {
                var cnt = _context.MittingEntity.Where(m => m.Round == round).Sum(i => i.Count);
                return cnt;
            }
            catch
            {

                return 0;
            }

        }
        public int CheckAddr(int round, string addr)
        { 

            try
            {
                var cnt = _context.MittingEntity.Where(m => m.Round == round && m.Addr == addr).Sum(i => i.Count);
                return cnt;
            }
            catch
            {

                return 0;
            }

        }
        public int GetResult()
        {

            try
            {
                var cnt = _context.MittingEntity.Sum(i => i.Count);
                return cnt;
            }
            catch
            {

                return 0;
            }

        }
    }
}