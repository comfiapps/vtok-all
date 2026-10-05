namespace DefaultNamespace;

public interface ITokenService
{
    List<Token> GetAll();
    Task Add(String contract, int tokenId);
    void Delete(String contract, int tokenId);
}

public class TokenService : ITokenService
{
    private readonly IKeyValueRepository _kvRepository;
    private readonly ITokenRepository _tokenRepository;
    private readonly IContractRepository _contractRepository;
    private readonly ICommonService _commonService;
    
    public TokenService(
        IKeyValueRepository kvRepository,
        ITokenRepository tokenRepository,
        IContractRepository contractRepository,
        ICommonService commonService
    ) {
        _kvRepository = kvRepository;
        _tokenRepository = tokenRepository;
        _contractRepository = contractRepository;
        _commonService = commonService;
    }
    
    public List<Token> GetAll() {
        return _tokenRepository.GetAll();
    }

    public async Task Add(String contract, int tokenId) {
        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        if (!_contractRepository.Exists(contract)) throw new Exception("Not Found");
        
        var owner = await Web3Functions.GetERC721OwnerOf(contract, tokenId);
        if (!owner.Equals(Constants.publicKey)) throw new Exception("Not Owner");
        else _tokenRepository.Insert(contract, tokenId);
    }
    
    public void Delete(String contract, int tokenId) {
        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        if (_commonService.TokenAndQuantityOffset() >= 0) throw new Exception("Overflow Total Token");
        _tokenRepository.Delete(contract, tokenId);
    }

}