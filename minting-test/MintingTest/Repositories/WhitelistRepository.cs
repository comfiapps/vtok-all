namespace DefaultNamespace;

public interface IWhitelistRepository
{
    List<Whitelist> GetAll(int page, int itemsPerPage);
    void Insert(String address);
}

public class WhitelistRepository : IWhitelistRepository
{
    private readonly ApplicationDbContext _db;
    
    public WhitelistRepository(ApplicationDbContext db)
    {
        _db = db;
    }
    
    public List<Whitelist> GetAll(int page, int itemsPerPage)
    {
        // todo: paging https://gunnarpeipman.com/ef-core-paging/
        var data = _db.Whitelists.ToList();
        return data;
    }

    public void Insert(String address) {
        _db.Whitelists.Add(new Whitelist {Address = address});
        _db.SaveChanges();
    }
}