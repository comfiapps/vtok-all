namespace DefaultNamespace;

public interface IWhitelistService
{
    List<Whitelist> GetAll(int page, int itemsPerPage);
    void Add(string address);
}

public class WhitelistService : IWhitelistService
{
    private readonly IWhitelistRepository _repository;
    
    public WhitelistService(IWhitelistRepository repository)
    {
        _repository = repository;
    }

    public List<Whitelist> GetAll(int page, int itemsPerPage) {
        int _page = page < 1 ? 1 : page;
        int _itemsPerPage = itemsPerPage < 1 ? 10 : itemsPerPage > 100 ? 100 : itemsPerPage;
        return _repository.GetAll(_page, _itemsPerPage);
    }

    public void Add(string address) {
        _repository.Insert(address);
    }
    
}