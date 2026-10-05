using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
public class ProcessController : ControllerBase
{
    private readonly IControlService _service;

    public ProcessController(IControlService service)
    {
        _service = service;
    }

    [Route("/Start")]
    [HttpPost]
    public IActionResult StartMinting(DateTime? startDateTime, DateTime? endDateTime, double price = 0.001)
    {
        try {
            _service.Start(startDateTime??DateTime.Now, endDateTime??DateTime.MaxValue, price);
            return Ok();

        } catch (Exception e) {
            if (e.ToString().Contains("Start Less Than Now"))
            {
                return BadRequest("start time must be greater than now"); 
            }

            if (e.ToString().Contains("End Less Than Start"))
            {
                return BadRequest("end time must be greater than start time");
            }

            return BadRequest(e.ToString());
        }
    }

    [Route("/Pause")]
    [HttpPost]
    public IActionResult PauseMinting()
    {
        _service.Pause();
        return Ok();
    }

    [Route("/Resume")]
    [HttpPost]
    public IActionResult ResumeMinting()
    {
        try {
            _service.Resume();
            return Ok();

        } catch (Exception e) {
            if (e.ToString().Contains("Not Found"))
            {
                return NotFound("Nothing to resume"); 
            }

            return BadRequest(e.ToString());
        }
    }

    [Route("/End")]
    [HttpDelete]
    public IActionResult EndMinting()
    {
        _service.End();
        return Ok();
    }

}
