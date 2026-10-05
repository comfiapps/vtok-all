namespace DefaultNamespace;

public interface IContractRepository
{
    Boolean Exists(String address);
    List<Contract> GetAll();
    void Insert(String address);
    void Delete(String address);
}

public class ContractRepository : IContractRepository
{
    private readonly ApplicationDbContext _db;
    
    public ContractRepository(ApplicationDbContext db)
    {
        _db = db;
    }
    
    public Boolean Exists(String address)
    {
        var data = _db.Contracts.Any(o => o.Address == address);
        return data;
    }

    public List<Contract> GetAll()
    {
        var data = _db.Contracts.OrderByDescending(x => x.CreatedDate).ToList();
        return data;
    }

    public void Insert(String address) {
        _db.Contracts.Add(new Contract {Address = address});
        _db.SaveChanges();
    }

    public void Delete(String address) {
        var obj = _db.Contracts.Find(address);
        if (obj == null) throw new Exception();

        _db.Contracts.Remove(obj);
        _db.SaveChanges();
    }
}