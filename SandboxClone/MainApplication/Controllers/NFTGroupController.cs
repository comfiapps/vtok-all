using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class NFTGroupController : ControllerBase
{
    private readonly INFTGroupService nftGroupService;
    
    public NFTGroupController(INFTGroupService _nftGroupService)
    {
        nftGroupService = _nftGroupService;
    }

    [HttpGet]
    public ActionResult<List<NFTGroup>> GetNFTGroup(int groupId) 
    {
        if (groupId == null || groupId == 0) return NotFound();
        var result = nftGroupService.Get(groupId);
        return Ok(result);
    }

    [HttpPost]
    public ActionResult<NFTGroup> CreateNFTGroup(NFTGroupSub nftGroup)
    {
        if (!ModelState.IsValid) return BadRequest("model is not valid form");

        try {
            return Ok(nftGroupService.Add(nftGroup));
        } catch (NullReferenceException nullEx) {
            return BadRequest(nullEx.Message);
        } catch (IndexOutOfRangeException range) {
            return BadRequest(range.Message);
        } catch (FileNotFoundException notFound) {
            return NotFound(notFound.Message);
        } catch (Exception e) {    
            if (e.ToString().Contains("Duplicate")) return Conflict("name already in use"); 
            return StatusCode(413);
        }
    }
    
}
