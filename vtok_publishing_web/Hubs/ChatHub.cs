using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Threading.Tasks;
using vtok_publishing_web.Service;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {


        private IMittingService _services;
        public ChatHub(IMittingService services)
        {
            _services = services;
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("Receive", user, message);
        }


        public async Task GetTime()
        {
            var response = _services.GetTime();
            string json = JsonConvert.SerializeObject(response);
            await Clients.All.SendAsync("Receive", "Time", json);
        }



    }
}