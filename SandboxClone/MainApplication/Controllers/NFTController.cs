using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class NFTController : ControllerBase
{
    private readonly INFTService nftService;
    
    public NFTController(INFTService _nftService)
    {
        nftService = _nftService;
    }

    
}
 