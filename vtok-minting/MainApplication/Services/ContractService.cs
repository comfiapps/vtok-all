namespace DefaultNamespace;

public interface IContractService
{
    void Get(String address);
    List<Contract> GetAll();
    Task Add(string address);
    void Delete(string address);
}

public class ContractService : IContractService
{
    private readonly IContractRepository _repository;
    private readonly ICommonService _commonService;
    private readonly ITokenService _tokenService;
    private readonly ITokenRepository _tokenRepository;
    
    public ContractService(
        ICommonService commonService,
        IContractRepository repository,
        ITokenService tokenService,
        ITokenRepository tokenRepository
    ) {
        _repository = repository;
        _commonService = commonService;
        _tokenService = tokenService;
        _tokenRepository = tokenRepository;
    }

    public void Get(String address) {
        
    }

    public List<Contract> GetAll() {
        return _repository.GetAll();
    }
    
    public async Task Add(string address) {

        if (!Web3Functions.IsValidAddress(address)) throw new Exception("Invalid address");

        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");

        var owner = await Web3Functions.GetERC721ContractOwner(address);
        if (!owner.Equals(Constants.publicKey)) throw new Exception("Not Owner");

        // TODO: approve 'agent Contract' to this contract

        _repository.Insert(address);

        // auto add tokens within the contract
        int index = 1;
        while (true) {
            try {
                var tokenOwner = await Web3Functions.GetERC721OwnerOf(address, index);
                if (tokenOwner.Equals(Constants.publicKey)) _tokenRepository.Insert(address, index);
            } catch (Exception e) {
                if (e.ToString().Contains("nonexistent")) break;
            }
            index++;
        }
    }

    public void Delete(string address) {
        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        _repository.Delete(address);
    }

}