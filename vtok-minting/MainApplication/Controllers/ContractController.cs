using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class ContractController : ControllerBase
{
    private readonly IContractService _service;

    public ContractController(IContractService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<Contract>> GetContracts() 
    {
        var result = _service.GetAll();
        // return CreatedAtAction("Get", new {data = result});
        return Ok(result);
    }

    // [HttpGet]
    // [Route("{address}")]
    // public IActionResult GetContract(String address) 
    // {
    //     _service.Get(address);
    //     return Ok();
    // }

    [HttpPost]
    public IActionResult AddContract(String contractAddress)
    {
        try { 
            _service.Add(contractAddress).Wait();
            return Ok();

        } catch (Exception e) {    
            if (e.ToString().Contains("Duplicate")) return Conflict("Already in contract"); 
            if (e.ToString().Contains("Invalid address")) return BadRequest("Invalid address"); 
            return BadRequest(e.ToString());
        }
    }

    [HttpDelete]
    [Route("{contractAddress}")]
    public IActionResult DeleteContract(String contractAddress)
    {
        try { 
            _service.Delete(contractAddress);
            return Ok();

        } catch (Exception e) {
            if (e.ToString().Contains("not found")) return NotFound("Address not found");
            return BadRequest(e.ToString());
        }
    }
    
}
