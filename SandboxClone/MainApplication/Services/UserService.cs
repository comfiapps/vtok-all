namespace DefaultNamespace;

// https://www.tutorialsteacher.com/csharp/csharp-exception
// https://exceptionnotfound.net/the-repository-service-pattern-with-dependency-injection-and-asp-net-core/
public interface IUserService
{
    User Get(int userId);
    User Add(UserSub user);
    User Edit(int userId, UserSub user);
    void Delete(int userId);
}

public class UserService : IUserService
{
    private readonly ApplicationDbContext db;
    
    public UserService(ApplicationDbContext _db)
    {
        db = _db;
    }

    public User Get(int userId) {
        var user = db.Users.FirstOrDefault(o => o.UserId == userId);
        return user;
    }

    public User Add (UserSub form) {
        if (form.Name == null || form.Email == null) throw new NullReferenceException("name and email required");
        
        var user = new User {Name = form.Name, Email = form.Email};
        db.Users.Add(user);
        db.SaveChanges();
        return user;
    }

    public User Edit(int userId, UserSub form) {
        var user = db.Users.FirstOrDefault(o => o.UserId == userId);
        if (user == null) throw new FileNotFoundException("Object with userId cannot be found");
        
        if (form.Name != null) user.Name = form.Name;
        if (form.Email != null) user.Email = form.Email;

        db.Users.Update(user);
        db.SaveChanges();
        return user;
    }

    public void Delete(int userId) {
        var user = db.Users.FirstOrDefault(o => o.UserId == userId);
        if (user == null) throw new FileNotFoundException("Object with userId cannot be found");

        db.Users.Remove(user);
        db.SaveChanges();
    }

}