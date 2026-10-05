namespace DefaultNamespace;

public interface IKeyValueRepository
{
    void Set(String key, String value);
    KeyValue Get(String key);
    void Delete(String key);
}

public class KeyValueRepository : IKeyValueRepository
{
    private readonly ApplicationDbContext _db;
    
    public KeyValueRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public void Set(String key, String value) {
        var obj = _db.KeyValues.Find(key);

        if (obj == null) _db.KeyValues.Add(new KeyValue {Key = key, Value = value});
        else {
            obj.Value = value;
            _db.KeyValues.Update(obj);
        }

        _db.SaveChanges();
    }

    public KeyValue Get(String key) {
        var obj = _db.KeyValues.Find(key);
        return obj;
    }

    public void Delete(String key) {
        var obj = _db.KeyValues.Find(key);
        if (obj == null) throw new Exception("Not Found");
        
        _db.KeyValues.Remove(obj);
        _db.SaveChanges();
    }

}