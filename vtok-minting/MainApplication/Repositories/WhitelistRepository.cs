namespace DefaultNamespace;

public interface IWhitelistRepository
{
    Boolean IsWhitelist(String address);
    long QuantitySum();
    Whitelist Get(String address);
    List<Whitelist> GetAll();
    void Insert(String address, int quantity);
    void Edit(String address, int quantity);
    void Delete(String address);
}

public class WhitelistRepository : IWhitelistRepository
{
    private readonly ApplicationDbContext _db;
    
    public WhitelistRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public Boolean IsWhitelist(String address)
    {
        var data = _db.Whitelists.Find(address);
        return data != null;
    }
    
    public long QuantitySum()
    {
        var data = _db.Whitelists.Sum(e => e.Quantity);
        return data;
    }

    public Whitelist Get(String address)
    {
        var data = _db.Whitelists.Find(address);
        if (data == null) throw new Exception("Not Found");
        
        return data;
    }

    public List<Whitelist> GetAll()
    {
        var data = _db.Whitelists.OrderByDescending(x => x.CreatedDate).ToList();
        return data;
    }

    public void Insert(String address, int quantity) {
        _db.Whitelists.Add(new Whitelist {Address = address, Quantity = quantity});
        _db.SaveChanges();
    }

    public void Edit(String address, int quantity) {
        var obj = _db.Whitelists.Find(address);
        if (obj == null) throw new Exception("Not Found");

        obj.Quantity = quantity;
        _db.Whitelists.Update(obj);
        _db.SaveChanges();
    }

    public void Delete(String address) {
        var obj = _db.Whitelists.Find(address);
        if (obj == null) throw new Exception("not found");

        _db.Whitelists.Remove(obj);
        _db.SaveChanges();
    }
}