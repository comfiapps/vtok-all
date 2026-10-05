using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class MintController : ControllerBase
{
    private readonly IWhitelistService _service;

    public MintController(IWhitelistService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<Whitelist>> GetMintedUser(int page = 1, int itemsPerPage = 50) 
    {
        var result = _service.GetAll(page, itemsPerPage);
        // return CreatedAtAction("Get", new {data = result});
        return Ok(result);
    }

    [HttpPost]
    public IActionResult RequestMinting(String address)
    {
        if (address == null || address.Trim().Length < 0)
        {
            return BadRequest("Account address required");
        }
        
        try { 
            _service.Add(address);
            return Ok();
        } catch (Exception e) {    
            if (e.ToString().Contains("Duplicate"))
            {
                return Conflict("Duplicate: Already Minted"); 
            }
            return StatusCode(413);
        }

    }

}
