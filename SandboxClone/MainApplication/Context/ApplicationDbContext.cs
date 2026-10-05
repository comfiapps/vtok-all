using Microsoft.EntityFrameworkCore;

namespace DefaultNamespace;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<CartItem>().HasKey(table => new {table.CartOwner, table.Group});
        builder.Entity<NFTGroup>().HasIndex(table => new { table.Name }).IsUnique(true);
    }
    public DbSet<CartItem> CartItems {  get; set; }
    public DbSet<NFTGroup> NFTGroups {  get; set; }
    public DbSet<NFT> NFTs {  get; set; }
    public DbSet<User> Users {  get; set; }
    
}