namespace DefaultNamespace;

public interface IWhitelistService
{
    List<Whitelist> GetAll();
    void Add(string address, int quantity);
    void Edit(string address, int quantity);
    void Delete(string address);
}

public class WhitelistService : IWhitelistService
{
    private readonly IWhitelistRepository _repository;
    private readonly IKeyValueRepository _keyValueRepository;
    private readonly ICommonService _commonService;

    public WhitelistService(
        IWhitelistRepository repository,
        IKeyValueRepository keyValueRepository,
        ICommonService commonService
    ) {
        _repository = repository;
        _keyValueRepository = keyValueRepository;
        _commonService = commonService;
    }

    public List<Whitelist> GetAll() {
        return _repository.GetAll();
    }

    public void Add(string address, int quantity) {
        if (!Web3Functions.IsValidAddress(address)) throw new Exception("Invalid address");

        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        if (_commonService.TokenAndQuantityOffset() > quantity) throw new Exception("Overflow Total Token");

        _repository.Insert(address, quantity);
    }

    public void Edit(string address, int quantity) {
        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        if (_commonService.TokenAndQuantityOffset() > quantity - _repository.Get(address).Quantity) throw new Exception("Overflow Total Token");
        
        _repository.Edit(address, quantity);
    }

    public void Delete(string address) {
        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        
        _repository.Delete(address);
    }

}