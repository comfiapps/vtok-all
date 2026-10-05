namespace DefaultNamespace;

public interface ICommonService
{
    Boolean IsMintingStarted();
    Boolean IsMintingEnded();
    long TokenAndQuantityOffset();
}

public class CommonService : ICommonService
{
    private readonly IWhitelistRepository _whitelistRepository;
    private readonly ITokenRepository _tokenRepository;
    private readonly IKeyValueRepository _keyValueRepository;

    public CommonService(
        IWhitelistRepository whitelistRepository,
        ITokenRepository tokenRepository,
        IKeyValueRepository keyValueRepository
    ) {
        _whitelistRepository = whitelistRepository;
        _tokenRepository = tokenRepository;
        _keyValueRepository = keyValueRepository;
    }

    public Boolean IsMintingStarted() {
        var time = _keyValueRepository.Get("start");
        return time != null && DateTime.Compare(DateTime.Parse(time.Value), DateTime.Now) <= 0;
    }

    public Boolean IsMintingEnded() {
        var time = _keyValueRepository.Get("end");
        return time != null && DateTime.Compare(DateTime.Parse(time.Value), DateTime.Now) < 0;
    }

    public long TokenAndQuantityOffset() {
        long numberOfToken = _tokenRepository.CountAll();
        long totalNumberOfQuantity = _whitelistRepository.QuantitySum();
        
        return numberOfToken - totalNumberOfQuantity;
    }

}