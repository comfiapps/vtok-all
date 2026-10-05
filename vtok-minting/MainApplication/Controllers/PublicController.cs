using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class PublicController : ControllerBase // 분리 예정
{
    private readonly IMintService _service;

    public PublicController(IMintService service)
    {
        _service = service;
    }
    
    [Route("Mint")]
    [HttpPost]
    public IActionResult RequestMinting(String address)
    {
        try {
            var success = _service.Mint(address);
            return Ok(success);
        } catch (Exception e) {
            if (e.ToString().Contains("Duplicate"))
            {
                return Conflict("Already Minted"); 
            }
            return BadRequest(e.ToString());
        }
    }
    
}
