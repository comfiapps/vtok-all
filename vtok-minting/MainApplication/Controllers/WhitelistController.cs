using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class WhitelistController : ControllerBase
{
    private readonly IWhitelistService _service;

    public WhitelistController(IWhitelistService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public ActionResult<List<Whitelist>> GetWhitelists() 
    {
        var result = _service.GetAll();
        // return CreatedAtAction("Get", new {data = result});
        return Ok(result);
    }
    
    [HttpPost]
    public IActionResult AddWhitelist(String address, int quantity)
    {
        try { 
            _service.Add(address, quantity);
            return Ok();

        } catch (Exception e) {
            if (e.ToString().Contains("Duplicate")) return Conflict("Already in whitelist"); 
            if (e.ToString().Contains("Invalid address")) return BadRequest("Invalid address"); 
            return BadRequest(e.ToString());
        }
    }

    [HttpPost]
    [Route("{address}")]
    public IActionResult EditWhitelist(String address, int quantity)
    {
        try { 
            _service.Edit(address, quantity);
            return Ok();

        } catch (Exception e) {
            if (e.ToString().Contains("Duplicate")) return Conflict("Already in whitelist"); 
            if (e.ToString().Contains("Invalid address")) return BadRequest("Invalid address"); 
            return BadRequest(e.ToString());
        }
    }

    [HttpDelete]
    [Route("{address}")]
    public IActionResult DeleteWhitelist(String address)
    {
        try { 
            _service.Delete(address);
            return Ok();

        } catch (Exception e) {    
            if (e.ToString().Contains("not found")) return NotFound("Address not found");
            return BadRequest(e.ToString());
        }
    }

}
