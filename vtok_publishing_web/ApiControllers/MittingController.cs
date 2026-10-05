
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vtok_publishing_web.Models;
using vtok_publishing_web.Service;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Hubs;

namespace vtok_publishing_web.ApiControllers
{
    [ApiController]
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api")]
    public class MittingController : Controller
    {
        private IMittingService _services;
        private readonly IHubContext<ChatHub> _hubContext;

        public MittingController(IMittingService services,  IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
  
            _services = services;

        }
        [HttpGet("/api/time")]
        public IActionResult Time()
        {
            Time time = _services.GetTime();
            if( time.Round < 1)
            {
                return Ok("result");

            }

            return Ok(_services.GetTime());

        }
        [HttpGet("/api/mitting")]
        public IActionResult Mitting()
        {

            return Ok(_services.GetMintingTime());

        }
        [HttpGet("/api/result")]
        public IActionResult GetResult()
        {

            return Ok(_services.GetResult());

        }

        [HttpGet("/api/addr/{id}")]
        public IActionResult Addr(string id)
        {

            return Ok(_services.CheckAddr(id));

        }

        [HttpGet("/api/count/{round}")]
        public async Task<IActionResult> Count(int round)
        {
            var cnt =  _services.GetCount(round);
            await  _hubContext.Clients.All.SendAsync("Receive", "Count", cnt);
            return Ok(cnt);

        }
        [HttpPost("/api/sitin/{id}")]
        public IActionResult sitin(string id ,SitinDto addr)
        {

            return Ok(_services.Sitin(addr));


        }
        [HttpPost("/api/approval/{id}")]
        public async Task<IActionResult> Approval(string id , [FromBody] MittingDto add)
        {
            var cnt = _services.Approval(add);
            
            await _hubContext.Clients.All.SendAsync("Receive", "Count", cnt);
            return Ok(cnt);
        }

       
    }
}
