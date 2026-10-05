namespace DefaultNamespace;

public interface ITokenRepository
{
    List<Token> Reserve(String address);
    long CountAll();
    List<Token> GetAll();
    void Insert(String contractAdress, int tokenId);
    void Delete(String contractAddress, int tokenId);
}

public class TokenRepository : ITokenRepository
{
    private readonly ApplicationDbContext _db;
    
    public TokenRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public List<Token> Reserve(String address)
    {
        int reservedCount = _db.Tokens.Count(o => o.Receiver == address);
        var whitelist = _db.Whitelists.Find(address);
        
        if (whitelist == null) throw new Exception("Not Whitelisted");

        int offset = whitelist.Quantity - reservedCount;
        if (offset <= 0) throw new Exception("Done Minting");

        Random rand = new Random();

        for (int i = 0; i < offset; i++)
        {
            Token random = _db.Tokens.Where(e => e.Receiver == null)
                            .OrderBy(r => Guid.NewGuid())
                            .Skip(rand.Next(0, _db.Tokens.Count(e => e.Receiver == null)))
                            .First();
            random.Receiver = address;
            _db.SaveChanges();
        }

        return _db.Tokens.Where(x => x.Receiver == address).ToList();
    }

    public long CountAll()
    {
        var data = _db.Tokens.Count();
        return data;
    }
    
    public List<Token> GetAll()
    {
        var data = _db.Tokens.OrderByDescending(x => x.CreatedDate).ToList();
        return data;
    }

    public void Insert(String contractAdress, int tokenId) {
        var exists = _db.Tokens.Any(e => e.Contract == contractAdress && e.Id == tokenId);

        if (!exists)
        {
            _db.Tokens.Add(new Token {Contract = contractAdress, Id = tokenId});
            _db.SaveChanges();
        }
    }

    public void Delete(String contractAdress, int tokenId) {
        var obj = _db.Tokens.Find(contractAdress, tokenId);
        if (obj == null) throw new Exception("Not Found");
        if (obj.Receiver != null) throw new Exception("Reserved Token");

        _db.Tokens.Remove(obj);
        _db.SaveChanges();
    }
}