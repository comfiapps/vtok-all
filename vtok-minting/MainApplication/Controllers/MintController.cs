using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class MintController : ControllerBase
{
    private readonly IMintService _service;

    public MintController(IMintService service)
    {
        _service = service;
    }
    
    [HttpPost]
    public IActionResult Mint(String contractAddress, NFTMeta data, int quantity = 1)
    {
        try {
            _service.CreateToken(contractAddress, data, quantity).Wait();
            return Ok();
        } catch (Exception e) {
            if (e.ToString().Contains("Not Found")) return Conflict("Contract Address Not Found"); 
            return BadRequest(e.ToString());
        }
    }
    
}
