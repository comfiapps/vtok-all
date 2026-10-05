namespace DefaultNamespace;

public interface IControlService
{
    void Start(DateTime start, DateTime end, double price);
    void Pause();
    void Resume();
    void End();
}

public class ControlService : IControlService
{
    private readonly IKeyValueRepository _repository;
    private readonly ICommonService _commonService;
    
    public ControlService(
        IKeyValueRepository repository,
        ICommonService commonService
    ) {
        _repository = repository;
        _commonService = commonService;
    }

    public void Start(DateTime start, DateTime end, double price) {
        if (DateTime.Compare(start, DateTime.Now) <= 0) start = DateTime.Now;
        if (DateTime.Compare(start, end) >= 0) throw new Exception("End Less Than Start");

        if (_commonService.IsMintingStarted()) throw new Exception("Minting Started");

        _repository.Set("start", start.ToString());
        _repository.Set("end", end.ToString());
        _repository.Set("price", price.ToString());
    }

    public void Pause() {
        if (!_commonService.IsMintingStarted()) throw new Exception("Minting Not Started");
        if (_commonService.IsMintingEnded()) throw new Exception("Minting Ended");
        
        _repository.Set("pause", true.ToString());
    }

    public void Resume() {
        _repository.Delete("pause");
    }

    public void End() {
        if (!_commonService.IsMintingStarted()) throw new Exception("Minting Not Started");
        if (_commonService.IsMintingEnded()) throw new Exception("Minting Ended");

        _repository.Set("end", DateTime.Now.ToString());
    }
    
}