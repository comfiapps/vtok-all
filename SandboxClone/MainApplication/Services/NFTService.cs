namespace DefaultNamespace;

// https://exceptionnotfound.net/the-repository-service-pattern-with-dependency-injection-and-asp-net-core/
public interface INFTService
{    

}

public class NFTService : INFTService
{
    private readonly ApplicationDbContext db;
    
    public NFTService(ApplicationDbContext _db)
    {
        db = _db;
    }

}