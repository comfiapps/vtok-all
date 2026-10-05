using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class TokenController : ControllerBase
{
    private readonly ITokenService _service;

    public TokenController(ITokenService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<Token>> GetAllTokens() 
    {
        var data = _service.GetAll();
        return Ok(data);
    }

    [HttpPost]
    public IActionResult AddToken(String contractAddress, int tokenId)
    {
        try {
            _service.Add(contractAddress, tokenId).Wait();
            return Ok();
        } catch (Exception e) {
            return BadRequest(e.ToString());
        }
    }
    
    [HttpDelete]
    public IActionResult RemoveToken(String contractAddress, int tokenId)
    {
        try {
            _service.Delete(contractAddress, tokenId);
            return Ok();
        } catch (Exception e) {
            return BadRequest(e.ToString());
        }
    }

}
