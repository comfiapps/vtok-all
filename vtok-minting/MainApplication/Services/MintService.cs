using System.Text.Json;

namespace DefaultNamespace;

public interface IMintService
{
    Task CreateToken(String contract, NFTMeta data, int quantity);
    Boolean Mint(string address);
}

public class MintService : IMintService
{
    private readonly IKeyValueRepository _kvRepository;
    private readonly IWhitelistRepository _whitelistRepository;
    private readonly IContractRepository _contractRepository;
    private readonly ITokenRepository _tokenRepository;
    private readonly ICommonService _commonService;
    
    public MintService(
        IKeyValueRepository kvRepository,
        IWhitelistRepository whitelistRepository,
        IContractRepository contractRepository,
        ITokenRepository tokenRepository,
        ICommonService commonService
    ) {
        _kvRepository = kvRepository;
        _whitelistRepository = whitelistRepository;
        _contractRepository = contractRepository;
        _tokenRepository = tokenRepository;
        _commonService = commonService;
    }
    public async Task CreateToken(String contract, NFTMeta data, int quantity) {

        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");
        
        if (!_contractRepository.Exists(contract)) throw new Exception("Not Found");

        // create json file
        string jsonString = JsonSerializer.Serialize(data);

        // nft storage upload > return CID
        var finalResult = await new IPFSFunction().UploadToNFTStorage(jsonString);

        // Smart Contract mint(CID) > return tokenId
        string url = String.Format("https://{0}.ipfs.dweb.link", finalResult);
        
        for (int i = 0; i < quantity; i++)
        {
            var tokenId = await Web3Functions.MintERC721(contract, url);
            _tokenRepository.Insert(contract, (int) tokenId);
        }
    }

    public Boolean Mint(String address) {

        if (!_commonService.IsMintingStarted()) throw new Exception("Minting Not Started");
        if (_commonService.IsMintingEnded()) throw new Exception("Minting Ended");

        if (_kvRepository.Get("price") == null) throw new Exception("Price Not Set");

        var reserveList = _tokenRepository.Reserve(address);

        // 2. 'agent contract' --> addItems(...)
        // 3. if fails to addItem(...) then update token's receiver = null
        // 4. return success or fail
        return false;
    }

}