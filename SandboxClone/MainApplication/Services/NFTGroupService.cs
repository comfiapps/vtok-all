namespace DefaultNamespace;

// https://exceptionnotfound.net/the-repository-service-pattern-with-dependency-injection-and-asp-net-core/
public interface INFTGroupService
{    
    NFTGroup Get(int groupId);
    NFTGroup Add(NFTGroupSub nftGroupSub);
}

public class NFTGroupService : INFTGroupService
{
    private readonly ApplicationDbContext db;
    
    public NFTGroupService(ApplicationDbContext _db)
    {
        db = _db;
    }

    public NFTGroup Get (int groupId) {
        var data = db.NFTGroups.Find(groupId);
        return data;
    }

    public NFTGroup Add(NFTGroupSub form) {
        if (form.UserId == null) throw new NullReferenceException("user id required");
        if (form.Name == null || form.Name.Length < 1) throw new NullReferenceException("name required");
        if (form.Description == null || form.Description.Length < 1) throw new NullReferenceException("description required");
        if (form.MintCount == null) throw new NullReferenceException("mint count required");

        if (form.MintCount < 1) throw new IndexOutOfRangeException("mint count must be greater than 0");

        var user = db.Users.FirstOrDefault(o => o.UserId == form.UserId);
        if (user == null) throw new FileNotFoundException("Object with userId cannot be found");

        // TODO file input
        
        var group = new NFTGroup {Name = form.Name, Creator = user, Description = form.Description};

        for (int i = 0; i < form.MintCount; i++) {
            var nft = new NFT {Group = group, Owner = user, OnSale = false};
            db.NFTs.Add(nft);
        }
        
        db.NFTGroups.Add(group);
        db.SaveChanges();

        return group;
        // TODO return error
    }

}