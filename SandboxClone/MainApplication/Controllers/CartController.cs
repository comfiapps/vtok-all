using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace;

[ApiController]
[Route("[Controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public ActionResult<List<CartItem>> GetCart(int userId) 
    {
        if (userId == null || userId == 0) return NotFound();
        
        var result = cartService.GetUserCart(userId);
        // if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public IActionResult AddItemToCart(CartItemSub obj)
    {
        try 
        {
            if (obj == null)
            {
                return BadRequest("Model required");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Model not valid");
            }       

            cartService.Add(obj);

            return CreateAtAction("Get", new {id = obj.Id});

            //return Ok(cartService.Add(obj));
        }
        catch (NullReferenceException nullEx)
        {
            return Conflict(nullEx.Message);
        }
        catch (FileNotFoundException notFound) 
        {
            return NotFound(notFound.Message);
        } 
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    //X[HttpPatch]
    [HttpPut]
    public IActionResult EditQuantity(int userId, int groupId, int quantity)
    {
        try {
            cartService.Edit(userId, groupId, quantity);
            return NoContent();
        } catch (FileNotFoundException notFound) {
            return NotFound(notFound.Message);
        } catch (IndexOutOfRangeException range) {
            return Conflict(range.Message);
        } catch (Exception e) {
            return StatusCode(500);
        }
    }

    [HttpDelete]
    public IActionResult DeleteItemFromCart(int userId, int groupId)
    {
        try {
            cartService.Delete(userId, groupId);
            return Ok();
        } catch {
            return BadRequest();
        }
    }

}
