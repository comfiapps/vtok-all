using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService userService;
    
    public UserController(IUserService _userService)
    {
        userService = _userService;
    }

    [HttpGet]
    public ActionResult<User> GetUser(int userId) 
    {
        if (userId == null) return BadRequest("user id required");

        var result = userService.Get(userId);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public ActionResult<User> Register(UserSub user)
    {
        if (user == null) return BadRequest("model required");
        if (!ModelState.IsValid) return BadRequest("model is not valid form");

        try {
            return Ok(userService.Add(user));
        } catch (NullReferenceException nullEx) {
            return BadRequest(nullEx.Message);
        } catch (Exception e) {     
            return StatusCode(413);
        }
    }

    [HttpPatch]
    public IActionResult EditUser(int userId, UserSub modifyData)
    {
        if (userId == null) return BadRequest("user id required");
        if (modifyData == null) return BadRequest("model required");
        if (!ModelState.IsValid) return BadRequest("model is not valid form");

        try {
            return Ok(userService.Edit(userId, modifyData));
        } catch (FileNotFoundException notFound) {
            return NotFound(notFound.Message);
        } catch (Exception e) {
            return StatusCode(500);
        }
    }
    
}
