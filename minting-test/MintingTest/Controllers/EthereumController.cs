using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class EthereumController : ControllerBase
{

    private readonly IEthereumService _service;

    public EthereumController(IEthereumService service)
    {
        _service = service;
    }
    
    [HttpPost]
    public IActionResult StartNFTTransfer() 
    {
        _service.ManualTransfer();
        return Ok();
    }
    
}
