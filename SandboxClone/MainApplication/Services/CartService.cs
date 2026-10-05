namespace DefaultNamespace;

// https://exceptionnotfound.net/the-repository-service-pattern-with-dependency-injection-and-asp-net-core/
public interface ICartService
{
    List<CartItem> GetUserCart(int userId);
    CartItem Add(CartItemSub cartItemSub);
    void Edit(int userId, int groupId, int quantity);
    void Delete(int userId, int groupId);
}

public class CartService : ICartService
{
    private readonly ApplicationDbContext db;
    
    public CartService(ApplicationDbContext _db)
    {
        db = _db;
    }

    // https://www.learnentityframeworkcore.com/dbset/querying-data
    public List<CartItem> GetUserCart(int userId) {        
        // var data = db.CartItems.Find(id);
        var data = db.CartItems.Where(o => o.CartOwner == userId).ToList();
        //var data = _db.Categories.FirstOrDefault(u=>u.Id==id);
        //var data = db.CartItems.SingleOrDefault(o => o.Id == id);
        return data;
    }
    
    public CartItem Add(CartItemSub form) {
        // if (obj.Name == obj.DisplayOrder.ToString())
        // {
            // ModelState.AddModelError("name", "The DisplayOrder cannot exactly match the Name.");
        // }

        if (form.User == null) throw new NullReferenceException("user id required");
        if (form.Group == null) throw new NullReferenceException("nft group id required");

        var oldCartItem = db.CartItems.FirstOrDefault(o => o.CartOwner == form.User && o.Group == form.Group);
        var finalCartItem = new CartItem();

        if (oldCartItem == null) {
            var user = db.Users.FirstOrDefault(o => o.UserId == form.User);
            if (user == null) throw new FileNotFoundException("Object with user id cannot be found"); 
            
            var group = db.NFTGroups.FirstOrDefault(o => o.GroupId == form.Group);
            if (group == null) throw new FileNotFoundException("Object with group id cannot be found");         

            var cartItem = new CartItem {CartOwner = form.User, Group = form.Group, Quantity = 1};
            db.CartItems.Add(cartItem);
            finalCartItem = cartItem;

        } else {
            oldCartItem.Quantity = oldCartItem.Quantity + 1;
            db.CartItems.Update(oldCartItem);
            finalCartItem = oldCartItem;
        }

        db.SaveChanges();
        return finalCartItem;
    }

    public void Edit(int userId, int groupId, int quantity) {
        var obj = db.CartItems.FirstOrDefault(o => o.CartOwner == userId && o.Group == groupId);
        if (obj == null) throw new FileNotFoundException("Object with userId and groupId cannot be found");
        if (quantity < 1) throw new IndexOutOfRangeException("quantity must be greater than 0");

        obj.Quantity = quantity;
        db.CartItems.Update(obj);
        db.SaveChanges();
    }

    public void Delete(int userId, int groupId) {
        var obj = db.CartItems.FirstOrDefault(o => o.CartOwner == userId && o.Group == groupId);
        if (obj == null) throw new Exception();

        db.CartItems.Remove(obj);
        db.SaveChanges();
    }

}