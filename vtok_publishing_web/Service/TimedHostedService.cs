using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using vtok_publishing_web.Models;
using vtok_publishing_web.Repository;
using SignalRChat.Hubs;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace vtok_publishing_web.Service
{
    public class TimedHostedService : IHostedService, IDisposable
    {
        private int executionCount = 0;
        private readonly ILogger<TimedHostedService> _logger;
        private Timer _timer;
        private readonly IRedisRepository _redis;

        private readonly IHubContext<ChatHub> _hubContext;
        public TimedHostedService(ILogger<TimedHostedService> logger, IRedisRepository redis,  IHubContext<ChatHub> hubContext)
        {
            _logger = logger;
            _redis = redis;
            _hubContext = hubContext;
        }
        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");


            _redis.SetMintingTime();
            _timer = new Timer(DoWork, null, TimeSpan.Zero,
               TimeSpan.FromSeconds(5));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {

            string mitting =  _redis.GetMintingTime();

            if (mitting == "End")
            {
                _hubContext.Clients.All.SendAsync("Receive", "Web", mitting);
                _timer.Dispose();
            }
            else if (mitting == "Start")
            {
                var response = _redis.GetTime();
                if (response.Round > 0)
                {
                    string json = JsonConvert.SerializeObject(response);
                    _hubContext.Clients.All.SendAsync("Receive", "Time", response);
                }
                else
                {
                    _hubContext.Clients.All.SendAsync("Receive", "Api", "result");
            
                }
            } else
            {
                _hubContext.Clients.All.SendAsync("Receive", "Web", mitting);
            }
              
          

          ;
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}